import React, { useState, useContext } from 'react'
import Image from 'next/image'
import { WalletContext } from '@/contexts/walletContext';
const ethers = require("ethers");

const Navbar = () => {
    const [isConnected, setIsConnected] = useContext(WalletContext);
    const [currAddress, updateAddress] = useState('0x');

    async function getAddress() {        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        updateAddress(addr);
    }

    async function connectWallet() {
        if(typeof window.ethereum !== "undefined") {
            try {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                if(chainId !== '0x5') {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x5' }],
                    })
                }  
                await window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => {
                    setIsConnected(true);
                    getAddress()
                });
            }
            catch(e) {
                alert("Error", e)
            }
        }
    }

    return (
        <div className='flex items-center justify-center px-12 py-8 w-full '>
            <div className='flex-1'>
                <div className='relative h-[40px] w-[180px]'>
                    <Image src="/ctech.png" layout='fill' alt="Logo" />
                </div>
            </div>
            
            {   isConnected ?
                <div className='flex items-center justify-center rounded-full border-2 border-[#836953] hover:cursor-pointer' onClick={connectWallet}>
                    <h3 className='mx-4 text-lg'>Connected Wallet: </h3>
                    <p className='bg-[#836953] text-white rounded-full px-4 py-2 text-xs'>{currAddress}</p>           
                </div>                
                :
                <div className='flex items-center justify-center rounded-full border-2 border-[#836953] hover:cursor-pointer' onClick={connectWallet}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-3 text-[#836953]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <h5 className='bg-[#836953] text-white hover:text-[#836953] hover:bg-transparent text-lg rounded-r-full pl-2 pr-4 py-2'>Connect Wallet</h5>                
                </div>
            }
        </div>
    )
}

export default Navbar