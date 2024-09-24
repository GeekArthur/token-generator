import React, { useState } from 'react';
import './App.css';
import WalletConnection from './components/WalletConnection';
import TokenCreator from './components/TokenCreator';

function App() {
  const [provider, setProvider] = useState(null);

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERC-20 Token Generator</h1>
        <WalletConnection onProviderChange={handleProviderChange} />
        <TokenCreator provider={provider} />
      </header>
    </div>
  );
}

export default App;
