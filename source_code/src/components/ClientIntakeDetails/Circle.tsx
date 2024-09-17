import React from 'react';

interface CircleProps {
    number: number;
}

const Circle: React.FC<CircleProps> = ({ number }) => {
    return (
        <div className="flex items-center justify-center w-10 h-10 bg-white shadow-[0_2px_7px_rgb(0,0,0,0.2)] text-black  text-2xl font-bold rounded-full">
            {number}
        </div>
    );
};

export default Circle;
