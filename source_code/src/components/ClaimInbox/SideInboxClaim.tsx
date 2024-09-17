import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getClaimByIdCall } from '../../redux/slice/MergeClaims/mergeClaims';
import { AppDispatch } from '../../redux/store';
export default function SideInboxClaim({
    activeButton,
    setActiveButton,
}: {
    activeButton: string;
    setActiveButton: any;
}): React.JSX.Element {
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const buttons = ['Provider', 'Patients', 'Claim', 'Services'];
    const handleOnClick = (item: string): any => {
        setActiveButton(item);
    };
    React.useEffect(() => {
        const payload = { id: params?.id };
        dispatch(getClaimByIdCall(payload));
    }, []);
    return (
        <div className="w-1/5 h-[50rem] mt-5 min-w-[200px] bg-white rounded-2xl shadow-lg px-12 py-10 mt-2 drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
            <div className="flex flex-col space-y-8 mt-4">
                {buttons?.map((item, index) => {
                    return (
                        <button
                            key={index}
                            onClick={(e) => {
                                handleOnClick(item);
                                e?.preventDefault();
                            }}
                            className={`${activeButton === item ? 'bg-primary-700 text-white' : 'bg-white text-secondary-700 border'}  cursor-pointer hover:bg-primary-700 hover:text-white hover:-translate-y-1 hover:duration-500 hover:transition text-sm font-[Lato] py-3 px-3 rounded-md shadow-lg`}
                        >
                            {item.toUpperCase()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
