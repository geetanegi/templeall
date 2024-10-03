import React, {  useEffect, useState } from 'react'
import Modal from '../ModalComponent'
import {  Instagram,  Music } from 'lucide-react'
import { BsFacebook } from 'react-icons/bs';

interface ShareVideoModalProps {
    isShareModalOpen: boolean;
    setIsShareModalOpen: (flag: boolean) => void;
    url: any;
}



const ShareVideoModal: React.FC<ShareVideoModalProps> = ({ isShareModalOpen, setIsShareModalOpen, url }) => {

    const [URLCopiedMessage,setURLCopiedMessage]=useState<boolean>(false);

    useEffect(
        ()=>{
            setURLCopiedMessage(false);
        },[isShareModalOpen]
    )

    

    const handleFacebookClick = () => {
        console.log(`Sharing to Facebook: ${url}`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    

    const handleInstagramClick = () => {
        
        
        // Instagram API integration can be added here
    };

    const handleTikTokClick = () => {
        
        
    };

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(url);
        setURLCopiedMessage(true);
    };




    return (
        <div className=' text-black'>
            <Modal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                title='Share Video'
            >
                <div className="w-[420px] h-[220px] mx-auto mt-[-40px]  p-4">

                    <div className="flex space-x-4 overflow-x-auto py-2">
                        

                        {/* Facebook */}
                        <div className="flex flex-col items-center">
                            <button className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700" onClick={handleFacebookClick}>
                                <BsFacebook className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">Facebook</span>
                        </div>

                        

                        {/* Instagram */}
                        <div className="flex flex-col items-center">
                            <button
                                className="p-3 bg-pink-600 rounded-full text-white hover:bg-pink-700"
                                onClick={handleInstagramClick}
                            >
                                <Instagram className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">Instagram</span>
                        </div>

                        {/* TikTok */}
                        <div className="flex flex-col items-center">
                            <button
                                className="p-3 bg-black rounded-full text-white hover:bg-gray-800"
                                onClick={handleTikTokClick}
                            >
                                <Music className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">TikTok</span>
                        </div>
                    </div>


                    {/* URL and Copy Button */}
                    <div className="flex items-center justify-between border p-3 rounded-lg mt-4">
                        <input
                            type="text"
                            value={url}
                            className="w-full text-sm bg-transparent outline-none"
                            readOnly
                        />
                        <button className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700" onClick={handleCopyUrl}>
                            Copy
                        </button>

                        
                    </div>
                    <span hidden={!URLCopiedMessage} className='text-sm text-green-700 m-1'>URL copied!</span>
                </div>
            </Modal >
        </div >
    );
}

export default ShareVideoModal;
