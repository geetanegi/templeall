import * as React from 'react';
interface ModalProps {
    open: any;
    id: string;
}
const OpModal = ({ open, id = 'modal' }: ModalProps): React.JSX.Element => {
    return (
        <div
            id={id}
            className={
                open
                    ? `opacity-100 duration-500 rounded-md w-full fixed top-0 h-full bg-opacity-50 start-0 z-[60] overflow-x-hidden transition-all disabled:pointer-events-none backdrop-blur-0  bg-gray-600 overflow-y-hidden flex items-center justify-center`
                    : 'hidden'
            }
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                width={200}
                height={200}
                xmlnsXlink="http://www.w3.org/1999/xlink"
                style={{
                    shapeRendering: 'auto',
                    display: 'block',
                    backgroundPositionX: '0%',
                    backgroundPositionY: '0%',
                    backgroundSize: 'auto',
                    backgroundOrigin: 'padding-box',
                    backgroundClip: 'border-box',
                    background: 'scroll rgba(0, 0, 0, 0) none  repeat',
                    width: 200,
                    height: 200,
                    animation: 'none',
                }}
            >
                <g>
                    <circle
                        strokeDasharray="164.93361431346415 56.97787143782138"
                        r={35}
                        strokeWidth={10}
                        stroke="#48abca"
                        fill="none"
                        cy={50}
                        cx={50}
                        transform="matrix(1,0,0,1,0,0)"
                        style={{
                            fill: 'none',
                            stroke: 'rgb(72, 171, 202)',
                            transform: 'matrix(1, 0, 0, 1, 0, 0)',
                            animation: 'none',
                        }}
                    />
                    <g />
                </g>
            </svg>
        </div>
    );
};
export default OpModal;
