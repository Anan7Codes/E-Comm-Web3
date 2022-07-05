import Image from 'next/image'
import { useState } from 'react';
import { uploadFileToIPFS } from '@/utils/pinata'
import Layout from '@/components/Layout';

export default function Home() {
  const [file, setFile] = useState(null)

  function showPreview(event){
    if(event.target.files.length > 0){
      var src = URL.createObjectURL(event.target.files[0]);
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = src;
      preview.style.display = "block";
    }
    setFile(event.target.files[0])
  }

  const UploadFile = async () => {
    const { success, pinataURL, message } = await uploadFileToIPFS(file)
    console.log(success, pinataURL, message)
    if(!success) {
      alert("Error: " + message)
    }
    console.log(pinataURL)
  }

  return (
    <Layout>
      <div className="center">
        <div className="form-input">
          <div className="preview">
            <img id="file-ip-1-preview"/>
          </div>  
          <label htmlFor="file-ip-1">Upload Image</label>
          <input type="file" id="file-ip-1" accept="image/*" onChange={( e => showPreview(e))}></input>  
          <button onClick={UploadFile}>Upload</button>
        </div>
      </div> 
    </Layout>
    
  )
}
