// import React from 'react'
import { BackButton } from '@twa-dev/sdk/react';
import { useOrdersContext } from '../../context/orders-context';
import { useTonConnect } from '../../hooks/useTonConnect';
import WebApp from '@twa-dev/sdk';
import { Address, toNano } from 'ton-core';
const OrderPage = () => {
  const { orderItems } = useOrdersContext();
  const total = orderItems.reduce((total, item) => total + item.dish.price * item.quantity, 0)
  const {connected, sender} = useTonConnect()

  const handleOrder = () => {
    if(!connected) {
      WebApp.showAlert("Please connect to your wallet!")
      return;
    }
    sender.send({
      value: toNano(total) ,
      to: Address.parse("0QD0uqZiQwMt2SfZo5OPo5xxr5yJRaZICJg4dKMi3DKTyfne")
    })

  }
  return (
    <>
      <BackButton onClick={() => window.history.back()} />
      <div className='w-full h-screen bg-gray-100'>
        <div className='flex flex-col relative border-b bg-white border-[#ccc] px-8'>
          <div className='flex w-full justify-between items-center py-6'>
            <span className='text-base font-bold'>YOUR ORDER</span>
            <span className='text-base text-green-500'>Edit</span>
          </div>
          {orderItems.map((item, index) =>

            <div key={index} className='flex items-start justify-between mb-2'>
              <div className='flex gap-2'>
                <img src={item.dish.imageUrl} alt='' className='w-12 h-12 rounded-xl' />
                <div className='flex flex-col gap-0  items-start'>
                  <span className='font-bold'>{item.dish.name} <span className='text-yellow-500 font-bold'>{item.quantity}x</span></span>
                  <span className='text-gray-300 text-sm'>{item.dish.description}</span>
                </div>

              </div>
              <span>${item.dish.price * item.quantity}</span>
            </div>

          )}
        </div>
        <div className="fixed bottom-10 left-0 w-full">
          <button onClick={handleOrder} className="text-lg py-4 w-3/4 mx-auto bg-green-400 text-white font-semibold">PAY ${total} </button>
        </div>
      </div>

    </>

  )
}

export default OrderPage