import Image from 'next/image'
import { useState, useContext, useEffect } from 'react';
import Layout from '@/components/Layout';
import { walletContext } from '@/contexts/walletContext';
import Store from '@/utils/Store'
const ethers = require("ethers");

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const GetDetails = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(Store.address, Store.abi, signer)
      let transaction = await contract.getAllProducts()
      setProducts(transaction)
    }
    GetDetails()
  }, [])
  return (
    <Layout>
      <div className='mx-24 mt-24 grid grid-cols-4 gap-x-4'>
        {
          products?.map((product, index) => {
            return (
              <div key={index} className="flex flex-col items-center border border-[#836953] rounded-md">
                <img src={product.image ? product.image : "https://www.instandngs4p.eu/wp-content/themes/fox/images/placeholder.jpg"} className="h-[200px] w-[200px] mt-4" />
                <h1 className='text-3xl mt-4 text-[#836953] uppercase font-extrabold'>{product.title}</h1>
                <p className='mt-2'>{product.desc}</p>
                <span className='text-2xl'>{(product.price) / 10**18} ether</span>
              </div>
            )
          })
        }
      </div>
    </Layout>
    
  )
}
