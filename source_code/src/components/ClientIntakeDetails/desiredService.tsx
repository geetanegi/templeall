import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface Service {
    name: string;
}

interface Props {
    selectedServices: string[];
    setServices: (services: string[]) => void;
    setFullServices: React.Dispatch<React.SetStateAction<string[]>>;
    fieldName: string;
}

const serviceAbbreviations: Record<string, string> = {
    'Applied Behavior Therapy': 'ABA',
    'Speech Therapy': 'ST',
    'Occupational Therapy': 'OT',
    'Physical Therapy': 'PT',
    Counselling: 'Counselling',
};

const DesiredServicesForm: React.FC<Props> = ({
    selectedServices,
    setServices,
    setFullServices,
    fieldName,
}) => {
    const [checkedServices, setCheckedServices] =
        useState<string[]>(selectedServices);
    const servicesData = useSelector(
        ({ getAllClientInquiryDetailsCall }: any) =>
            getAllClientInquiryDetailsCall?.services?.data || []
    );
    const isSpecificViewPresent = window.location.href.includes('view');
    console.log(isSpecificViewPresent, 'isSpecificViewPresent');
    useEffect(() => {
        setCheckedServices(selectedServices);
    }, [selectedServices, fieldName]);

    const handleCheckboxChange = (service: string): void => {
        // Check if the service is already in the checkedServices state
        const serviceExists = checkedServices.includes(service);

        // Update the checkedServices state
        const updatedServices = serviceExists
            ? checkedServices.filter((item) => item !== service)
            : [...checkedServices, service];

        const filteredUpdatedServices = updatedServices.filter((item) =>
            servicesData.some((services: Service) => services.name === item)
        );

        // Update the state and props with the new list
        setCheckedServices(filteredUpdatedServices);
        setServices(filteredUpdatedServices);
        setFullServices(filteredUpdatedServices);
    };

    const getDisplayName = (serviceName: string): string => {
        return serviceAbbreviations[serviceName] || serviceName;
    };

    return (
        <form className="flex justify-between">
            <h2>Desired Services</h2>
            {servicesData.map((service: Service) => (
                <div
                    className={`flex items-center ${isSpecificViewPresent ? 'pointer-events-none opacity-45' : ''}`}
                    key={`${fieldName}-${service.name}`}
                >
                    <input
                        type="checkbox"
                        id={`${fieldName}-${service.name}`}
                        checked={checkedServices.includes(service.name)}
                        onChange={() => handleCheckboxChange(service.name)}
                        name={fieldName}
                    />
                    <label
                        htmlFor={`${fieldName}-${service.name}`}
                        className="ml-2"
                    >
                        {getDisplayName(service.name)}
                    </label>
                </div>
            ))}
        </form>
    );
};

export default DesiredServicesForm;
