import React from 'react';
import dishImg from '../../assets/dish.jpg'
import { useNavigate } from 'react-router-dom';
interface Props {
}

const CardDish: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-2 p-2 items-center'>
        <img src={dishImg} alt="" className='rounded-2xl'/>
        <span className='lg:text-base text-xs'>Hamburger<span className='font-semibold text-sm lg:text-xl'>-$1.2</span></span>
        <button onClick={() => navigate('/order')} className='bg-yellow-500 text-white lg:text-base text-sm'>ADD</button>
    </div>
  );
}

export default CardDish;