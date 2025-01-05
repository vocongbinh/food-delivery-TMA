import React, { useState } from 'react';
import { useHapticFeedback } from '../../hooks/useHapticFeedback';
import { Dish } from '../../types/dish';
import { useOrdersContext } from '../../context/orders-context';
import { getTONPrice } from '../../utils';
interface Props {
  dish: Dish
}

const CardDish: React.FC<Props> = ({ dish }) => {
  const { orderItems, setOrderItems } = useOrdersContext();
  const initialCount = orderItems.find(item => item.dish.name === dish.name)?.quantity || 0;
  const [count, setCount] = useState<number>(initialCount);
  const triggerHapticFeedback = useHapticFeedback();
  const isItemExist = () => {
    return orderItems.map(item => item.dish.name).includes(dish.name)
  }
  const handleAdd = () => {
    triggerHapticFeedback();
    setCount(prev => prev += 1);
    setOrderItems((prev) => {
      return !isItemExist() ?
        [...prev, {
          dish,
          quantity: count + 1
        }] : prev.map(item => {
          if (item.dish.name === dish.name) {
            return {
              ...item,
              quantity: count + 1
            }
          }
          return item;
        })
    })
  }
  const handleRemove = () => {
    triggerHapticFeedback();
    setCount(prev => prev -= 1);
    setOrderItems((prev) => {
      return count == 1 ? prev.filter(item => item.dish.name !== dish.name)
        : prev.map(item => {
          if (item.dish.name === dish.name) {
            return {
              ...item,
              quantity: count - 1
            }
          }
          return item;
        })
    })
  }
  const handleAddClick = () => {
    triggerHapticFeedback();
    handleAdd();
  };

  return (
    <div className='flex flex-col gap-2 p-2 items-center'>
      <div className='relative'>
        <img src={dish.imageUrl.split(", ")[0]} alt="" className='rounded-2xl w-full aspect-square object-cover' />
        {count > 0 && <div className='rounded-full font-bold absolute top-0 flex items-center justify-center
         translate-x-1/2 -translate-y-1/2 right-0 w-8 h-8 text-white bg-yellow-500'>{count}</div>}
      </div>
      <span className='lg:text-base text-sm line-clamp-2'>{dish.name}<br></br><span className='font-semibold text-base lg:text-xl'>{getTONPrice(dish.price)} TON</span></span>

      {count > 0 ? <div className='w-full justify-between gap-2 flex'>
        <button className='bg-red-500 flex-1 py-2 flex justify-center items-center text-white font-extrabold' onClick={handleRemove}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 12h12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
        <button className='bg-yellow-500 flex-1 flex justify-center items-center' onClick={handleAdd}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 12h12M12 18V6" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </button>
      </div> : <button
        onClick={handleAddClick}
        className='w-full py-2 bg-yellow-500 font-bold text-white lg:text-base text-sm'
      >
        ADD
      </button>}
    </div>
  );
}

export default CardDish;