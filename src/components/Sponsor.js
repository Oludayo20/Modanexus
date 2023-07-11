import React from 'react';
import Laptop from '../assets/laptop.jpg';

const Sponsor = () => {
  return (
    <div className="bg-white rounded-lg p-5 dark:bg-gray-800">
      <h2>Sponsor</h2>

      <img
        src="https://www.fotor.com/blog/wp-content/uploads/2019/07/3-solid-background.png"
        className="h-40 object-cover rounded-lg mt-2"
      />

      <p className="mt-2 font-bold">Laptop Scheme</p>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio eveniet
        dolore nisi dicta id explicabo facilis perspiciatis nostrum.
      </p>
    </div>
  );
};

export default Sponsor;
