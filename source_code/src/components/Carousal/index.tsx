import * as React from 'react';
import Img1 from '../../assets/img/Carousal/Graphic-1.png';
import Img2 from '../../assets/img/Carousal/Graphic-2.png';
import Img3 from '../../assets/img/Carousal/Graphic-3.png';
import Img4 from '../../assets/img/Carousal/Graphic-4.png';

interface Slide {
    label1: string;
    label2: string;
    imageUrl: string;
    alt: string;
}

export default function Carousal(): React.JSX.Element {
    const [currentSlide, setCurrentSlide] = React.useState<number>(0);
    const slides: Slide[] = [
        {
            label1: 'Real-time Data Tracking',
            label2: 'Instantly capture and access therapy data with auto-save and real-time insights.',
            imageUrl: Img1,
            alt: 'Slide 1',
        },
        {
            label1: 'Easy Session Management',
            label2: 'Simplify your workflow with user-friendly tools that reduce administrative tasks.',
            imageUrl: Img2,
            alt: 'Slide 2',
        },
        {
            label1: 'Keep Everyone in the Loop',
            label2: 'Improve family engagement with secure, built-in messaging and updates.',
            imageUrl: Img3,
            alt: 'Slide 3',
        },
        {
            label1: 'Customizable Clinical Tools',
            label2: 'Tailor your practice with flexible tools that adapt to your therapy needs.',
            imageUrl: Img4,
            alt: 'Slide 4',
        },
    ];

    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    const goToNextSlide = (): void => {
        setCurrentSlide((prevSlide) =>
            prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
    };

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            goToNextSlide();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentSlide]);

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col justify-center items-center mb-10">
            <div className="relative overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-full flex-shrink-0 items-center p-4"
                        >
                            <img
                                src={slide.imageUrl}
                                alt={slide.alt}
                                width="600"
                                height="600"
                            />
                            <h2 className="font-semibold text-xl mt-4">
                                {slide.label1}
                            </h2>
                            <p className="text-md text-gray-600 mt-2 text-center">
                                {slide.label2}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* Indicators */}
            <div className="flex space-x-2 mt-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-4 h-4 rounded-full ${currentSlide === index ? 'bg-[#9758F5]' : 'bg-white'} border border-[#9758F5]`}
                    ></button>
                ))}
            </div>
        </div>
    );
}
