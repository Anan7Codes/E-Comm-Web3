import { createContext, useState } from 'react';

export const walletContext = createContext();

const WalletProvider = (props) => {
    const [isConnected, setIsConnected] = useState(false);

    return (
                // this is the provider providing state
        <walletContext.Provider value={[isConnected, setIsConnected]}>
            {props.children}
        </walletContext.Provider>
    );
};

export default WalletProvider;