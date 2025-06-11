import React from 'react';
import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { Providers } from '../app/providers'; // Import the providers



  return (
    <div className="flex flex-col items-center space-y-4">
   

     

{/* Disconnect Button */}
<button
  onClick={() => disconnect()}
  className="w-[10rem] bg-teal-900/90 hover:bg-teal-600/90 text-white font-bold py-2 px-4 rounded-lg transition-colors text-lg"
>
  Disconnect
</button>

    </div>
  );
};

// Main App Component with Providers
const App: React.FC = () => {
  return (
    <Providers>
     
      
         
          <MetaMaskWallet />
        

    </Providers>
  );
};

export default App;