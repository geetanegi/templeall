import React, {  useEffect, useState } from 'react'
import Modal from '../ModalComponent'
import {  Instagram,  Music } from 'lucide-react'
import { BsFacebook } from 'react-icons/bs';
// import { RiKakaoTalkFill } from 'react-icons/ri';

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

    // Click handlers for each button
    // const handleEmbedClick = () => {
    //     console.log("Embed button clicked");
    // };

    // const handleWhatsappClick = () => {
    //     console.log(`Sharing to WhatsApp: ${url}`);
    //     // You can add a URL that triggers WhatsApp share
    //     window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
    // };

    const handleFacebookClick = () => {
        console.log(`Sharing to Facebook: ${url}`);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    // const handleTwitterClick = () => {
    //     console.log(`Sharing to Twitter (X): ${url}`);
    //     window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank');
    // };

    // const handleEmailClick = () => {
    //     console.log(`Sharing via Email: ${url}`);
    //     window.open(`mailto:?subject=Check this out&body=${encodeURIComponent(url)}`, '_self');
    // };

    // const handleKakaoTalkClick = () => {
    //     console.log(`Sharing to KakaoTalk: ${url}`);
    //     // You may need to integrate KakaoTalk's specific API here
    //     alert("KakaoTalk sharing integration required");
    // };

    const handleInstagramClick = () => {
        console.log(`Sharing to Instagram: ${url}`);
        //alert("Instagram sharing integration required");
        // Instagram API integration can be added here
    };

    const handleTikTokClick = () => {
        console.log(`Sharing to TikTok: ${url}`);
        //alert("TikTok sharing integration required");
        // TikTok API integration can be added here
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
                        {/* Embed */}
                        {/* <div className="flex flex-col items-center">
                            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200" onClick={handleEmbedClick}>
                                <Code className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">Embed</span>
                        </div> */}

                        {/* WhatsApp */}
                        {/* <div className="flex flex-col items-center">
                            <button className="p-3 bg-green-500 rounded-full text-white hover:bg-green-600" onClick={handleWhatsappClick}>
                                <BsWhatsapp className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">WhatsApp</span>
                        </div> */}

                        {/* Facebook */}
                        <div className="flex flex-col items-center">
                            <button className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700" onClick={handleFacebookClick}>
                                <BsFacebook className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">Facebook</span>
                        </div>

                        {/* X (Twitter) */}
                        {/* <div className="flex flex-col items-center">
                            <button className="p-3 bg-black rounded-full text-white hover:bg-gray-800" onClick={handleTwitterClick}>
                                <BsTwitterX className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">X</span>
                        </div> */}

                        {/* Email */}
                        {/* <div className="flex flex-col items-center">
                            <button className="p-3 bg-gray-100 rounded-full hover:bg-gray-200" onClick={handleEmailClick}>
                                <Mail className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">Email</span>
                        </div> */}

                        {/* KakaoTalk */}
                        {/* <div className="flex flex-col items-center">
                            <button className="p-3 bg-yellow-400 rounded-full hover:bg-yellow-500" onClick={handleKakaoTalkClick}>
                                <RiKakaoTalkFill className="text-2xl" />
                            </button>
                            <span className="mt-2 text-xs text-gray-600">KakaoTalk</span>
                        </div> */}

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
