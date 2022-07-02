import Head from 'next/head'
import Image from 'next/image'
import { uploadFileToIPFS, uploadJSONToIPFS } from '@/utils/pinata'

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
