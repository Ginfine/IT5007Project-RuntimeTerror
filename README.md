# IT5007Project-RuntimeTerror ipfs demo

**instructions**

install nvm to use the latest node and npm.
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 14.7.0
nvm use 14

```
**pull the code**
```
git init
git pull https://github.com/Ginfine/IT5007Project-RuntimeTerror.git ipfs
```
 
 **fill in the infura project id and project secret in file:src/App.js**
 ```
 const projectId = '';
const projectSecret = '';
```

**install packages and run the demo**
```
cd ipfs-example
rm -rf package-lock.json 
npm install
npm run
```

**upload demo**

![image](https://user-images.githubusercontent.com/39360847/194340003-043732df-5a0c-405c-be33-35facf31c1c5.png)
