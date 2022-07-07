import Image from 'next/image'
import { useState, useContext, useEffect } from 'react';
import Layout from '@/components/Layout';
import { walletContext } from '@/contexts/walletContext';
import Store from '@/utils/Store'
const ethers = require("ethers");

export default function Home() {
  
  useEffect(() => {
    const GetDetails = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(Store.address, Store.abi, signer)
      let transaction = await contract.getAllProducts()
      console.log("transaction",  transaction)
    }
    GetDetails()
  }, [])
  return (
    <Layout>
      
    </Layout>
    
  )
}
