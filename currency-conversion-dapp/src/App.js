import React, { useState } from "react";
import { ethers } from 'ethers';
import "./App.css";
import contractAbi from "./contracts/DataConsumerV3.json";

function App() {
  const [conversion, setConversion] = useState(0);
  const [selectedPair, setSelectedPair] = useState(0);
  const [loading, setLoading] = useState(false);

  const contractAddress = "0x5b1526842B8f44B5A03f605824361D52654c4ac4"; 
  const abi = contractAbi.abi;
  const API_URL = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/c2DYgfQ4CQKqOlc5M7G7Un9EQ9z4b_L7");
  const PRIVATE_KEY = "0x8b0273ab2127d4c5b31ec202230bde68d7a025b4404edbfbe880b4c19e37f7d7";
  const signer = new ethers.Wallet(PRIVATE_KEY, API_URL); 
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const handlePairChange = (pair) => {
    setSelectedPair(pair);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await contract.getChainLinkDataFeedLatestAnswer(selectedPair);
      await new Promise((resolve) => setTimeout(resolve, 30000));
      await contract.waitForDeployment();
      const result = await contract.getStoredConversion();
      if (selectedPair === 3) {
        setConversion(Number(result)/Math.pow(10, 18));
      } else {
        setConversion(Number(result)/Math.pow(10, 8));
      }
      
    } catch (error) {
      console.error("Error retrieving conversion:", error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="App">
      <h1>Chainlink Pair Conversion</h1>
      <input type="radio" id="BTC_USD" name="age" value="0" onChange={() => handlePairChange(0)}/>
      <label for="BTC_USD">BTC/USD</label><br/>
      <input type="radio" id="ETH_USD" name="age" value="1" onChange={() => handlePairChange(1)}/>
      <label for="ETH_USD">ETH/USD</label><br/>
      <input type="radio" id="LINK_USD" name="age" value="2" onChange={() => handlePairChange(2)}/>
      <label for="LINK_USD">LINK/USD</label><br/>
      <input type="radio" id="BTC_ETH" name="age" value="3" onChange={() => handlePairChange(3)}/>
      <label for="BTC_ETH">BTC/ETH</label><br/>


      <button onClick={handleSubmit}>Submit</button>

      <div>
        <label htmlFor="result">Conversion Result:</label>
        {loading ? (
          <input type="text" id="result" value="Loading..." readOnly />
        ) : (
          <>
            <input type="text" id="result" value={conversion} readOnly />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
