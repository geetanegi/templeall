import * as React from 'react';
import add from '../../assets/img/addLocation.svg';
export default function AddChildButton({
    values,
    push,
    handleSubmit,
    setFocus,
}: {
    values: any;
    push: any;
    handleSubmit: any;
    setFocus: any;
}): React.JSX.Element {
    const handleAddChild = (): void => {
        setFocus();
        push({
            therapyData: null,
            childFirstName: '',
            childLastName: '',
            childGender: '',
            childDateOfBirth: '',
            referringProvider: '',
            referringProviderCellPhone: '',
            referringProviderFaxNumber: '',
            edited: false,
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            {values.userChildren.length < 5 && (
                <button
                    className="flex my-7"
                    onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                        e.preventDefault();
                        handleAddChild();
                    }}
                    disabled={values.userChildren.length >= 5}
                >
                    <img src={add} alt="" className="h-[1.5rem] w-[1.5rem]" />
                    <h1 className="text-md ml-2 text-[#08627E]">Add Child</h1>
                </button>
            )}
        </form>
    );
}
