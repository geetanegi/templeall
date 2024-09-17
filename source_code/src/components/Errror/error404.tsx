import React from 'react';
export default function Error404(): React.JSX.Element {
    return (
        <div
            className="h-[51.5rem] bg-[rgb(87,164,188)] bg-[radial-gradient(circle,_rgba(87,164,188,1)_0%,_rgba(35,85,100,1)_88%)]"
            data-testid="error-404-page"
        >
            <div className=" text-center font-['Lato'] text-[#CED2D2]">
                <div className="py-[15rem]">
                    <div className=" font-bold text-[4rem]">404</div>
                    <div className=" text-xl">
                        ERROR OCCURRED, PAGE NOT FOUND
                    </div>
                    <div className="text-md">
                        Sorry but the page you are looking for does not exist,
                        has been removed, name changed, or is temporarily
                        unavailable
                    </div>
                </div>
            </div>
        </div>
    );
}
