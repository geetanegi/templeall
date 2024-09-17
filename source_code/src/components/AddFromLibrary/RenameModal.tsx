import React from 'react';
import Modal, { CreateDomainModalActions, ModalBody } from '../Generics/Modal';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import Input from '../Generics/Inputs/Input';
import { toTitleCase } from '../../utils/toTitleCase';
import { nameValidation } from '../../constants/ValidationMessages';
export default function RenameModal({
    handleSubmitForm,
    handleClose,
    itemType,
    itemName,
}: {
    handleSubmitForm: any;
    handleClose: any;
    itemType?: string;
    itemName: string;
}): React.JSX.Element {
    const initialValues: any = {
        newName: `${itemName}-copy`,
    };
    const validationSchema = Yup.object().shape({
        newName: Yup.string()
            .matches(
                /^[a-zA-Z0-9\s.,\-_/!@#$%^&*()+=\[\]{};':"\\|<>?]*$/,
                nameValidation
            )
            .max(150, nameValidation),
    });
    return (
        <Modal
            open={true}
            id={'add-from-library-rename-modal'}
            expandModal={false}
        >
            <ModalBody expandModal={false}>
                <div>
                    <div className="mb-4 text-lg">
                        Provide a new name for the existing{' '}
                        {toTitleCase(itemType ?? '').toLowerCase() || 'target'}
                    </div>
                    <div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmitForm}
                            validationSchema={validationSchema}
                            validateOnChange
                        >
                            {(props: any) => {
                                const {
                                    values,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isValid,
                                } = props;
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <div className="overflow-y-auto w-[30rem]">
                                            <Field
                                                label="Name"
                                                id="name"
                                                name="name"
                                                component={Input}
                                                value={itemName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                readOnly
                                            />
                                        </div>
                                        <div className="overflow-y-auto w-[30rem]">
                                            <Field
                                                label="New Name"
                                                isRequired={true}
                                                id="newName"
                                                name="newName"
                                                component={Input}
                                                value={values.newName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="New Name"
                                                autoFocus={true}
                                            />
                                        </div>
                                        <CreateDomainModalActions
                                            onClose={handleClose}
                                            isSubmitting={isSubmitting}
                                            isValid={isValid}
                                            handleSubmit={handleSubmit}
                                            value={!values.newName?.length}
                                        />
                                    </form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
