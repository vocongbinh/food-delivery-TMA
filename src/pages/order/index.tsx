// import React from 'react'
import { BackButton } from '@twa-dev/sdk/react';
import { useOrdersContext } from '../../context/orders-context';
import { MainButton, BottomBar } from "@twa-dev/sdk/react";
import { useNavigate } from 'react-router-dom';
import { getTONPrice } from '../../utils';

const OrderPage = () => {
  const navigate = useNavigate();
  const { orderItems } = useOrdersContext();
  const total = orderItems.reduce((total, item) => total + getTONPrice(item.dish.price) * item.quantity, 0)
  const handleOrder = async () => {
    navigate('/checkout');
    // if (!connected) {
    //   WebApp.showAlert("Please connect to your wallet!")
    //   return;
    // }
    // sender.send({
    //   value: toNano(total),
    //   to: Address.parse("0QD0uqZiQwMt2SfZo5OPo5xxr5yJRaZICJg4dKMi3DKTyfne")
    // })

    // const data: MetaData = {
    //   image: orderItems[0].dish.imageUrl,
    //   orderItems
    // }
    // console.log(data)
    // await deployNFT(data)

  
  }

  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className='w-full h-screen container flex flex-col gap-8 bg-gray-100 py-4'>
        <div className='flex flex-col relative bg-white  px-8 rounded-2xl'>
          <div className='flex w-full justify-between border-b border-[#ccc] items-center py-4 mb-4'>
            <span className='text-base font-bold'>YOUR ORDER</span>
            <span className='text-base text-green-500'>Edit</span>
          </div>
          {orderItems.map((item, index) =>

            <div key={index} className='flex items-start gap-4 justify-between mb-2'>
              <div className='flex gap-2'>
                <img src={item.dish.imageUrl.split(", ")[0]} alt='' className='w-12 h-12 rounded-xl' />
                <div className='flex flex-col gap-0 items-start'>
                  <h2 className='font-bold text-left'>{item.dish.name}</h2>
                  <span className='text-yellow-500 font-bold'>{item.quantity}x</span>
                </div>

              </div>
              <span>{getTONPrice(item.dish.price) * item.quantity} TON</span>
            </div>
           
          )}
          
          
        </div>
        {/* <Section header="Payment Information" /> */}
        {/* <button onClick={handleOrder}>đfsdfsf</button> */}
        <BottomBar>
          <MainButton text={`PAY $${total}` } onClick={handleOrder} />
        </BottomBar>
      </div>

    </>
  )
}

export default OrderPage