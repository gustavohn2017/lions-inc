import React from 'react';

const Sobre = () => {
  return (
    <section className='mb-8 p-6 md:p-12 mx-4 md:mx-20 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg flex flex-col md:flex-row'>
      <div className='flex-1'>
        <h1 className='text-2xl font-bold mb-4 p-3'>
          Lorem ipsum
        </h1>
        <div className='text-lg text-gray-700 text-justify p-3 max-w-120'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
        </div>
      </div>
      <img
        src='https://placehold.co/280x300'
        alt='Placeholder'
        className='mt-4 md:mt-0 md:ml-4 rounded-lg shadow-lg w-full md:w-auto'
      />
    </section>
  );
};

export default Sobre;