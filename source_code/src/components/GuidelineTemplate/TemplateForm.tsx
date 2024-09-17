import * as React from 'react';
import { Field, FormikContextType, useFormikContext } from 'formik';
import Input from '../Generics/Inputs/Input';
import { useSelector, useDispatch } from 'react-redux';
import { clearingData } from '../../redux/slice/template/templateSlice';
import { useParams } from 'react-router-dom';
interface FormValues {
    description: string;
    name: string;
}
export default function TemplateForm({
    isErrorName,
    setIsErrorName,
}: {
    isErrorName: any;
    setIsErrorName: any;
}): React.JSX.Element {
    const template = useSelector((state: any) => state.template);
    const dispatch = useDispatch();
    const params = useParams();
    const {
        values,
        // isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldTouched,

        // isValid,
    }: FormikContextType<FormValues> = useFormikContext();
    React.useEffect(() => {
        values.name = '';
        values.description = '';
        if (template?.isEditing) {
            values.name = template?.name || template?.fullData?.template?.name;
            values.description =
                template?.description ||
                template?.fullData?.template?.description;
        }
    }, [template?.name, template?.fullData?.template?.name]);

    React.useEffect(() => {
        return () => {
            if (!params?.id && !template?.isEditing) {
                dispatch(clearingData());
            }
        };
    }, []);

    return (
        <div className="border-2 rounded border-gray-100 m-8">
            <form onSubmit={handleSubmit}>
                <div className="p-8 overflow-y-auto">
                    <div className="m-4">
                        <Field
                            label="Name"
                            autoComplete="off"
                            isRequired={true}
                            autoFocus={true}
                            id="name"
                            name="name"
                            component={Input}
                            value={values.name}
                            onChange={(e: any) => {
                                handleChange(e);
                                setIsErrorName(false);
                                setFieldTouched('name', true, false);
                            }}
                            onBlur={handleBlur}
                            placeholder="Please enter name of the template"
                        />
                        {isErrorName && (
                            <span className="text-[red] text-sm">
                                Name already exists, please try with another
                                Name.
                            </span>
                        )}
                    </div>

                    <div className="m-4">
                        <Field
                            label="Description"
                            autoComplete="off"
                            isRequired={false}
                            id="description"
                            name="description"
                            component={Input}
                            value={values.description}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                handleChange(e);
                                setFieldTouched('description', true, false);
                            }}
                            onBlur={handleBlur}
                            placeholder="Please enter description of the template"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
