import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Widget = () => {

    return (
        <div>

            <div className='flex items-center justify-center h-[100vh]'>
                <Link to="/form">
                <button className='bg-yellow-500 text-black p-2 rounded-md border-2 font-semibold border-black'>Click Me</button>
                </Link>
            </div>
        </div>
    );
};

export default Widget;
