import * as React from 'react';
import Modal, {
    ModalBody,
    ModalHeader,
    CreateClientModalActions,
} from '../../Generics/Modal';
// import Input from '../../Generics/Inputs/Input';
import { Formik, Field } from 'formik';
import { useSelector } from 'react-redux';
import Accordion from '../../Accordion';
interface AddShortTermGoalModalProps {
    open: boolean;
    onClose: () => void;
}
export default function AddShortTermGoalModal({
    open,
    onClose,
}: AddShortTermGoalModalProps): React.JSX.Element {
    const [openAccordion, setOpenAccordion] = React.useState<number | null>(
        null
    );
    const toggleAccordion = async (id: number): Promise<any> => {
        setOpenAccordion(openAccordion === id ? null : id);
    };
    const accordionHeading = useSelector(
        ({ DomainsByUserType }: any) => DomainsByUserType?.domain
    );

    interface Values {
        name: string;
    }
    const initialValues: Values = {
        name: '',
    };
    const handleSubmitForm = async (): Promise<any> => {};

    return (
        <>
            <Modal open={open} id={'add-shortTermGoal'} expandModal={false}>
                <ModalHeader
                    title={'Add Short Term Goal'}
                    onExpand={undefined}
                    icon={false}
                />
                <ModalBody expandModal={false}>
                    <div className="w-[40rem] my-1">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmitForm}
                            validateOnChange
                            enableReinitialize={true}
                        >
                            {(props: any) => {
                                const { values, handleChange, handleSubmit } =
                                    props;
                                return (
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <div className="h-[20rem] overflow-scroll">
                                                {accordionHeading?.map(
                                                    ({
                                                        name,
                                                        id,
                                                    }: {
                                                        name: any;
                                                        id: any;
                                                    }) => (
                                                        <div
                                                            key={id}
                                                            className="mx-7 py-[.1rem] w-[20rem]"
                                                        >
                                                            <Accordion
                                                                handleToggle={() =>
                                                                    toggleAccordion(
                                                                        id
                                                                    )
                                                                }
                                                                open={
                                                                    openAccordion ===
                                                                    id
                                                                }
                                                                title={name}
                                                                addRole={true}
                                                                labelClass="flex justify-start"
                                                                headerClassName={`
                                                                    ${id % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-[#E0E0E0]'} 
                                                                    p-4
                                                                `}
                                                            >
                                                                <div className="flex">
                                                                    <div className="flex mx-4 items-center mt-2 h-8 focus:outline-none">
                                                                        <Field
                                                                            className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)] focus:ring-transparent"
                                                                            type="checkbox"
                                                                            autoComplete="off"
                                                                            id="checkBoxValue"
                                                                            name="checkBoxValue"
                                                                            value={
                                                                                values.checkBoxValue
                                                                            }
                                                                            checked={
                                                                                values.checkBoxValue
                                                                            }
                                                                            onChange={(
                                                                                e: any
                                                                            ) => {
                                                                                handleChange(
                                                                                    e
                                                                                );
                                                                            }}
                                                                        />
                                                                        <label
                                                                            className="text-sm mx-2 mt-1"
                                                                            htmlFor="all"
                                                                        >
                                                                            All
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </Accordion>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <CreateClientModalActions
                                                onClose={onClose}
                                                isDisabled={false}
                                                handleSubmit={handleSubmit}
                                            />
                                        </form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
