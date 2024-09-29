// import React from 'react'
// import { fromNano } from "ton-core";
// import { useTonConnect } from '../../hooks/useTonConnect';

import CardDish from "../../components/CardDish/CardDish";
import { useOrdersContext } from "../../context/orders-context";
import { Dish } from "../../types/dish";
import dishImg from '../../assets/dish.jpg';
// import { useMainContract } from '../../hooks/useMainContract';
// import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom'; 
const HomePage = () => {
   const navigate = useNavigate();
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
  const dishes: Dish[] = [
    {
      name: "Hamburger",
      description: "Delicious",
      id: 0,
      price:1.2,
      imageUrl: dishImg,
    },
    {
      name: "Pizza",
      description: "Delicious",
      id: 1,
      price: 2,
      imageUrl: dishImg,
    },
    {
      name: "HotDog",
      description: "Delicious",
      id: 3,
      price: 1,
      imageUrl: dishImg,
    },
     {
      name: "Milk",
      description: "Delicious",
      id: 4,
      price: 1.5,
      imageUrl: dishImg,
    },
  ]
  const {orderItems} = useOrdersContext();
  const handleViewOrder = () => {
    console.log(orderItems);
    navigate('/order');
  }
  return (
    <div className='h-full relative'>
      <div className="flex flex-col gap-8 py-4">
        <div className="lg:px-6 grid lg:grid-cols-4 grid-cols-3">
          {dishes.map((dish, index) => <CardDish dish={dish} key={index}/>)}
        </div>
      </div>
      {orderItems.length > 0 && <div className="fixed bottom-0 left-0 w-full">
        <button onClick={handleViewOrder} className="text-base py-4 w-3/4 mx-auto bg-green-400 text-white font-semibold">VIEW ORDER</button>
      </div> } 
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