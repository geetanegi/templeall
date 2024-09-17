import React from 'react';
export default function NavigationBar(): React.JSX.Element {
    const [activeSection, setActiveSection] = React.useState('billing');
    const steps = [
        { name: 'Billing', count: 0, sectionId: 'billing' },
        {
            name: 'Provider/Supplier',
            count: 0,
            sectionId: 'provider',
        },
        { name: 'Facility', count: 0, sectionId: 'facility' },
        {
            name: 'Supervising',
            count: 0,
            sectionId: 'supervising',
        },
    ];
    const handleScroll = (sectionId: string | number | any): any => {
        const section = document.getElementById(sectionId);
        setActiveSection(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    React.useEffect(() => {
        handleScroll('billing');
    }, []);
    return (
        <div className="flex justify-center items-center space-x-6 px-8 pt-6 pb-4 font-[Lato]">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    {/* Circle with step number */}
                    <div
                        className={`w-11 h-11 font-semibold text-base flex hover:-translate-y-1 hover:duration-500 hover:transition items-center border-2 hover:border-primary-700 bg-white justify-center rounded-full shadow-lg cursor-pointer ${
                            activeSection === step.sectionId ||
                            steps.findIndex(
                                (s) => s.sectionId === activeSection
                            ) >= index
                                ? 'border-primary-700 text-green-500'
                                : 'text-secondary-600'
                        }`}
                        onClick={() => handleScroll(step.sectionId)}
                    >
                        {step.count}
                    </div>
                    {/* Step Name */}
                    <div
                        className={`ml-2 cursor-pointer  font-medium text-base  ${
                            activeSection === step.sectionId ||
                            steps.findIndex(
                                (s) => s.sectionId === activeSection
                            ) >= index
                                ? 'text-black'
                                : 'text-gray-500'
                        }`}
                        onClick={() => handleScroll(step.sectionId)}
                    >
                        {step.name}
                    </div>
                    {/* Line between steps */}
                    {index < steps.length - 1 && (
                        <div
                            className={`w-28 ml-2 border-t-4 ${activeSection === step.sectionId || steps.findIndex((s) => s.sectionId === activeSection) >= index ? 'border-primary-700' : 'border-dashed'}`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
}
