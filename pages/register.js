import React, { useContext, useState } from 'react'
import Layout from '@/components/Layout'
import { WalletContext } from '@/contexts/walletContext'
import Store from '@/utils/Store'
import { uploadFileToIPFS } from '@/utils/pinata'
const ethers = require("ethers");

const Register = () => {
    const [isConnected] = useContext(WalletContext)
    const [file, setFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState()

    const UploadFile = async () => {
        const { success, pinataURL, message } = await uploadFileToIPFS(file, fileName)
        if(!success) {
            alert("Error: " + message)
        }
        return pinataURL
    }

    function handleChange(e) {
        setFileName(e.target.files[0].name)
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
    }

    const RegisterProduct = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(Store.address, Store.abi, signer)
        const image = await UploadFile()
        let transaction = await contract.registerProduct(title, desc, price, image)
        
    }

    return (
        <Layout>
            { isConnected ? 
                <div className='flex items-center justify-center mx-72 mt-20 pt-4 border-2 border-[#836853] p-12'>
                    <div className='flex flex-col items-center'>
                        <img src={previewImage ? previewImage : "https://www.instandngs4p.eu/wp-content/themes/fox/images/placeholder.jpg"} width={150} height={150}/>
                        <div className="form-input">
                            <label htmlFor="file-ip-1">Upload Image</label>
                            <input type="file" id="file-ip-1" accept="image/*" onChange={( e => handleChange(e))}></input>  
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <input className='rounded-md py-2 px-4 w-[300px]' name="title" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}/>
                        <textarea className='rounded-md my-2 py-2 px-4 w-[300px]' name="desc" placeholder='Description' value={desc} onChange={e => setDesc(e.target.value)}/>
                        <input className='rounded-md py-2 px-4 w-[300px]' name="price" type="number" placeholder='Price' value={price} onChange={e => setPrice(e.target.value)}/>
                        <button className='mt-24 bg-[#836953] text-white text-xl px-4 py-2 rounded-lg w-[300px]' onClick={RegisterProduct}>Register Product</button>
                    </div>
                </div>
                : 
                <p className='text-3xl text-center text-[#836953] w-full mt-54'>You need to <span className='text-4xl text-white bg-[#836953] px-4'>connect your wallet</span> to register a product.</p> 
            }
        </Layout>
    )
}

export default Register