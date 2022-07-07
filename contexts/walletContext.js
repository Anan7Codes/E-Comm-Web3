import { createContext, useState } from 'react';

export const WalletContext = createContext();

const WalletProvider = (props) => {
    const [isConnected, setIsConnected] = useState(false);

    return (
                // this is the provider providing state
        <WalletContext.Provider value={[isConnected, setIsConnected]}>
            {props.children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;