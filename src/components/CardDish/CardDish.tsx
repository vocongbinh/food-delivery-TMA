import React from 'react';

interface Props {
}

const CardDish: React.FC<Props> = () => {
  return (
    <div className='flex flex-col gap-2 p-2 items-center'>
        <img src='/dish.jpg' alt="" className='rounded-2xl'/>
        <span className='lg:text-base text-xs'>Hamburger<span className='font-semibold text-sm lg:text-xl'>-$1.2</span></span>
        <button className='bg-yellow-500 text-white lg:text-base text-sm'>ADD</button>
    </div>
  );
}

export default CardDish;