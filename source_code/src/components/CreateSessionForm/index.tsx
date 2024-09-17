import React from 'react';
import { Field, useFormikContext } from 'formik';
import Input from '../Generics/Inputs/Input';
import { useSelector } from 'react-redux';
import CreatedFor from '../../assets/img/CreatedFor.svg';
import SessionNameIcon from '../../assets/img/SessionNameIcon.svg';
import { useParams } from 'react-router-dom';
import Select from '../Generics/Select';

export default function CreateSessionForm({
    formikRef,
    updateUserId,
}: {
    formikRef: any;
    updateUserId: any;
}): React.JSX.Element {
    const params = useParams();
    const users = useSelector((state: any) => state.users);

    const getUsers = (usersArr: any): any => {
        return usersArr.map((item: any) => ({
            label: `${item.firstName} ${item.lastName}`,
            value: item.id,
        }));
    };
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        touched,
        errors,
    }: {
        values: any;
        handleChange: any;
        handleBlur: any;
        handleSubmit: any;
        setFieldTouched: any;
        touched: any;
        errors: any;
        setFieldValue: any;
    } = useFormikContext();
    return (
        <form onSubmit={handleSubmit} className="flex" ref={formikRef}>
            <div className="overflow-y-auto ">
                <Field
                    icon={
                        <img
                            className="w-3 mr-2"
                            src={SessionNameIcon}
                            alt="SessionNameIcon"
                        />
                    }
                    label="Session Name"
                    isRequired={true}
                    id="sessionName"
                    name="sessionName"
                    component={Input}
                    data-testid="session-name-input"
                    value={values.sessionName}
                    onChange={(e: any) => {
                        handleChange(e);
                        setFieldTouched('sessionName', true, false);
                    }}
                    form={{
                        touched,
                        errors: !values?.sessionName
                            ? {
                                  sessionName: 'Required',
                              }
                            : errors,
                    }}
                    onBlur={handleBlur}
                    autoFocus={true}
                    placeholder="Mental Health Counselling Session"
                    className="border-b-2 border-[#A0A0A0] rounded-none border-x-0 border-t-0 pl-0 pb-1 outline-none"
                />
            </div>
            <div className="w-[25rem] ml-5">
                <Field
                    autoComplete="off"
                    isRequired={false}
                    name="createdFor"
                    id="createdFor"
                    value={values?.createdFor}
                    component={Select}
                    label="Created For"
                    showSearch={true}
                    icon={true}
                    iconSrc={CreatedFor}
                    onChange={(value: any) => {
                        if (value) {
                            setFieldValue('createdFor', value[0]);
                            updateUserId(value[0]);
                        }
                    }}
                    isDisabled={params.id ? true : false}
                    options={users?.value?.length ? getUsers(users.value) : []}
                    data-testid="created-for-input"
                ></Field>
            </div>
        </form>
    );
}
