import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';


const projectId = '2FkyHPh8Mb5heUcZyZZUxSWAd3f';
const projectSecret = '7c5e1528bce5c9df3162634db67dedb7';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});

function App() {
  const [fileUrl, updateFileUrl] = useState(``)
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(file)
      const url = `https://infura-ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input
        type="file"
        onChange={onChange}
      />
      {
        fileUrl && (
          <img src={fileUrl} width="600px" />
          
        )
      }
      <p>{fileUrl}</p>
    </div>
  );
}

export default App