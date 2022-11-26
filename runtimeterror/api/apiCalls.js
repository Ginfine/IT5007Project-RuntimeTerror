import sanityClient from "./client.js"
import { createReadStream,readFile } from "fs";
import { basename } from "path";
import { nanoid } from "nanoid";
import ipfsClient  from 'ipfs-http-client';
import { Buffer } from 'buffer';

const functions = {}
const projectId = '2FkyHPh8Mb5heUcZyZZUxSWAd3f';
const projectSecret = '7c5e1528bce5c9df3162634db67dedb7';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = ipfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

functions.createUser = (firstName,lastName,username,password) =>{
    console.log(password);
    console.log(username);

    return sanityClient.create(
        {
            _type:"user",
            first_name:firstName,
            last_name:lastName,
            username:username,
            password:password,
            created_at:new Date(),
        }
    );
};

functions.getProfile = (user) => {
    return sanityClient.fetch(
      `*[_type == "user" && username == $username]{
        ...,
        "following": count(following),
        "followers": *[_type == "user" && references(^._id)],
        photo{
          asset->{
            _id,
            url
          }
        }
      }`,
      { username: user }
    );
  };


functions.getUserId = (user) => {
  return sanityClient.fetch(
    `*[_type == "user" && username == $username]{
    _id
  }`,
    { username: user }
  );
};

functions.createPost = (user, caption, image) => {
  let ipfs_url='';
  return sanityClient.assets
    .upload("image", createReadStream(image.path), {
      filename: basename(image.path),
    })
    .then(client.add(createReadStream(image.path)).then((res) => {
        console.log(res);
        ipfs_url = res;
    }))
    .then((data) =>
      functions.getUserId(user).then((ids) => {
        console.log(ipfs_url);
        const id = ids[0]._id;
        return sanityClient.create({
          _type: "post",
          author: { _ref: id },
          photo: { asset: { _ref: data._id } },
          description: caption,
          IPFS:'https://runtimeterror.infura-ipfs.io/ipfs/'+ipfs_url.path,
          created_at: new Date(),
        });
      })
    );
};

functions.getAllPosts = () => {
    return sanityClient.fetch(`*[_type == "post"]{
      ...,
      "username": author->username,
      photo{
        asset->{
          _id,
          url
        }
      }
    }`);
  };




functions.getPostsOfFollowing = (username) => {
  return sanityClient.fetch(
    `*[_type == "user" && username == $username]{
    following[]->{
      "posts": *[_type == "post" && references(^._id)]{
        ...,
        "username": author->username,
        photo{
          asset->{
            _id,
            url,
            
          }
        }
      }
    }
  }`,
    { username }
  );
};

functions.searchForUsername = (text) => {
    return sanityClient.fetch(
      `*[_type == "user" && username match "${text}*"]{
        ...,
        "followers": count(*[_type == "user" && references(^._id)]),
        photo{
            asset->{
            _id,
            url
          }
        }
      }`
    );
  };
  
functions.getPosts = (username) => {
  return sanityClient.fetch(
    `*[_type == "post" && author->username == $username]{
    ...,
    "username": author->username,
    photo{
      asset->{
        _id,
        url
      }
    }
  }`,
    { username }
  );
};

functions.updateProfile = (user, first_name, last_name, bio, image) => {
  if (image) {
    return sanityClient.assets
      .upload("image", createReadStream(image.path), {
        filename: basename(image.path),
      })
      .then((data) =>
        functions.getUserId(user).then((ids) =>
          sanityClient
            .patch(ids[0]._id)
            .set({
              first_name,
              last_name,
              bio,
              photo: { asset: { _ref: data._id } },
            })
            .commit()
        )
      );
  } else {
    return functions.getUserId(user).then((ids) =>
      sanityClient
        .patch(ids[0]._id)
        .set({
          first_name,
          last_name,
          bio,
        })
        .commit()
    );
  }
};

functions.addFollower = (user, followingId) => {
  return functions.getUserId(user).then((ids) =>
    sanityClient
      .patch(ids[0]._id)
      .setIfMissing({ following: [] })
      .insert("after", "following[-1]", [
        { _ref: followingId, _key: nanoid(), _type: "reference" },
      ])
      .commit()
  );
};

functions.removeFollower = (user, followingId) => {
  return functions.getUserId(user).then((ids) =>
    sanityClient
      .patch(ids[0]._id)
      .unset([`following[_ref=="${followingId}"]`])
      .commit()
  );
};


export default functions;