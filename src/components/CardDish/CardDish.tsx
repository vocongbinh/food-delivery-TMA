import React from 'react';
import { useNavigate } from 'react-router-dom';
import dishImg from '../../assets/dish.jpg';
import WebApp from '@twa-dev/sdk';

interface Props {
}

const CardDish: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    WebApp.HapticFeedback.impactOccurred('light');
    navigate('/order');
  };

  return (
    <div className='flex flex-col gap-2 p-2 items-center'>
      <img src={dishImg} alt="" className='rounded-2xl'/>
      <span className='lg:text-base text-xs'>Hamburger<span className='font-semibold text-sm lg:text-xl'>-$1.2</span></span>
      <button 
        onClick={handleAddClick} 
        className='bg-yellow-500 text-white lg:text-base text-sm'
      >
        ADD
      </button>
    </div>
  );
}

export default CardDish;