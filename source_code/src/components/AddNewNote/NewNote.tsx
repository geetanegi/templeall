import React from 'react';
import TemplateData from '../AddProgramModal/TemplateData';
import emptyState from '../../assets/img/Empty_state_diagram.svg';

// Define an interface for the template item structure
interface TemplateItem {
    name: string;
    label?: string;
    instructions?: string;
    validations?: {
        required?: boolean;
    };
    htmlType?: string;
    options?: any;
    type: string;
    id: string;
}

interface NewNoteProps {
    template: TemplateItem[];
    mode: string;
}

const NewNote: React.FC<NewNoteProps> = ({ template, mode }) => {
    return (
        <>
            {template?.length ? (
                <div>
                    {template.map((obj, index) => (
                        <TemplateData
                            preventSubmit={true}
                            key={index}
                            index={index}
                            name={obj.name}
                            label={obj.label}
                            instruction={obj.instructions}
                            isRequired={obj.validations?.required || false}
                            htmlType={obj.htmlType}
                            options={obj.options}
                            type={obj.type}
                            mode={mode}
                        />
                    ))}
                </div>
            ) : (
                <div className="items-center flex flex-col">
                    <img src={emptyState} alt="Empty State" />
                    <span className="text-lg font-light text-gray-400">
                        Session note doesn&apos;t exist for this Billing code.
                    </span>
                </div>
            )}
        </>
    );
};

export default NewNote;
