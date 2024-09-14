// import React from 'react'
// import { fromNano } from "ton-core";
// import { useTonConnect } from '../../hooks/useTonConnect';
import { TonConnectButton } from "@tonconnect/ui-react";
import CardDish from "../../components/CardDish/CardDish";
// import { useMainContract } from '../../hooks/useMainContract';
// import WebApp from '@twa-dev/sdk';
// import { useNavigate } from 'react-router-dom';
const HomePage = () => {
    // const navigate = useNavigate();
    // const {
    //     contract_address,
    //     counter_value,
    //     // recent_sender,
    //     // owner_address,
    //     contract_balance,
    //     sendIncrement,
    //     sendDeposit
    //   } = useMainContract();
    //   const { connected } = useTonConnect();
    //   const showAlert = () => {
    //     WebApp.showAlert("Hey there!");
    //   };
  return (
    <div className='container'>
      <div className='fixed top-5 right-5'>
      <TonConnectButton />
    </div>
    <div className="py-8 px-6">
      <CardDish/>
    </div>

    </div>
    
  )
}

export default HomePage

{/* <div className=''>
    <div className='fixed r-0'>
      <TonConnectButton />
    </div>
    <div>
      <div className="Card">
        <b>{WebApp.platform}</b>
        <b>Our contract Address</b>
        <div className="Hint">{contract_address?.slice(0, 30) + "..."}</div>
        <b>Our contract Balance</b>
        {contract_balance && (
          <div className="Hint">{fromNano(contract_balance)}</div>
        )}
      </div>
      <a
        onClick={() => {
          showAlert();
          navigate("/order")

        }}
      >
        Show Alert
      </a>

      <div className="Card">
        <b>Counter Value</b>
        <div>{counter_value ?? "Loading..."}</div>
      </div>
      {connected && (
        <a
          onClick={() => {
            sendIncrement();
          }}
        >Increment by 5</a>
      )}
      {connected && (
        <a
          onClick={() => {
            sendDeposit();
          }}
        >Increment by 5</a>
      )}
    </div>
  </div> */}