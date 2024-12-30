// import React from 'react'
// import { fromNano } from "ton-core";
// import { useTonConnect } from '../../hooks/useTonConnect';

import { TonConnectButton } from "@tonconnect/ui-react";
import CardDish from "../../components/CardDish/CardDish";
import { useOrdersContext } from "../../context/orders-context";
import { DishType } from "../../types/dish";
import { MainButton, BottomBar } from "@twa-dev/sdk/react";

// import { useMainContract } from '../../hooks/useMainContract';
// import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from "react";
import { DishesApi } from "../../api/dishes";
import DishLoadingPlaceholder from "../../components/DishLoadingPlaceHolder/DishLoadingPlaceHolder";
// import { useTonConnect } from "../../hooks/useTonConnect";
// import { prepareJettonTransfer } from "../../contracts/Jetton";
const HomePage = () => {
  const navigate = useNavigate();
  const [dishTypes, setDishTypes] = useState<DishType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await DishesApi.getAllDishes();
      console.log(data)
      setDishTypes(data);
    }
    fetchData();
  }, [])
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
  const { orderItems } = useOrdersContext();
  // const {sender} = useTonConnect();
  const handleViewOrder = () => {
    console.log(orderItems);
    navigate('/order');
  }
  const renderPlaceHolder = () => {
    let i = 0;
    const arr: ReactNode[] = [];
    while (i < 12) {
        arr.push(<DishLoadingPlaceholder key={i} Imgstyle={{ width: '100%', aspectRatio: "1/1" }} inputStyle={{ width: '100%' }} />);
        i++;
    }
    return <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:gap-8 md:grid-cols-3 lg:grid-cols-3 xl:md:grid-cols-4">{arr}</div>
}
  return (
    <div className='h-full relative container'>
      <div className="flex flex-col gap-8 py-4">
        {/* <h2 onClick={() => {
          console.log("haha")
          const message = prepareJettonTransfer("EQBjQKLSlsfmpTou3c20a1-lL4H5rG6d2_ybIR_HyCMJsIdA","0QAY0-nximDrQIdBrH4r8RpJz9WtVANal49taOGX6u5LHXIH", 1 )
         sender.send(message)
        }
      }>hhihi</h2> */}
        {/* <h3 onClick={() =>  navigate('/order')}>hhhh</h3> */}
        <TonConnectButton className='self-end' />
        {dishTypes.length  > 0 ? dishTypes.map((dishType, index) => {
          return (
            <div key={index}>
              <h2 className="text-left text-lg font-semibold">{dishType.name}</h2>
              <div className="lg:px-6 grid lg:grid-cols-4 grid-cols-3">
                {dishType.dishes.map((dish, idx) => <CardDish dish={dish} key={idx} />)}
              </div>
            </div>
          )
        }): renderPlaceHolder() }

      </div>
      {orderItems.length > 0 && <div className="fixed bottom-0 left-0 w-full">
        {/* <button onClick={handleViewOrder}>đfsdfsf</button> */}

        <BottomBar>
          <MainButton text="VIEW ORDER" onClick={handleViewOrder} />
        </BottomBar>
      </div>}
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