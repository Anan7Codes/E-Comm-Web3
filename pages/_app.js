import '../styles/globals.css'
import WalletProvider from '@/contexts/walletContext'

function MyApp({ Component, pageProps }) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  )
  
}

export default MyApp
