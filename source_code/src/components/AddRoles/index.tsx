/* eslint-disable max-lines */
import * as React from 'react';
import * as Yup from 'yup';
import Input from '../Generics/Inputs/Input';
import { Field, Formik, FormikErrors } from 'formik';
import Accordion from '../Accordion';
import { EmployeeOnboardingFormActionModal } from '../Generics/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../constants';
import {
    getAllPermissionCall,
    getUserPermissionCall,
} from '../../redux/slice/getUserPermission/getUserPermissionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../redux/slice/Notification/notifications';
import CreateRoleApi from '../../api/services/RoleAndPermissions/createRole.service';
import {
    clearRoleById,
    EditRoleCall,
    viewOnlyData,
} from '../../redux/slice/EditRole/getRoleById';
import {
    descriptionValidation,
    nameValidation,
} from '../../constants/ValidationMessages';
import { useEffect } from 'react';
import { AppDispatch } from '../../redux/store';

export default function AddRoles(): React.JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const formikRef = React.useRef<any>(null);
    const dispatch = useDispatch<AppDispatch>();
    const userPermission = useSelector(
        ({ getUserPermission }: any) => getUserPermission
    );
    const getMineData = useSelector(
        ({ getMine }: any) => getMine?.value?.data?.content
    );
    const editRole = useSelector(({ EditRole }: any) => EditRole);
    const getCheckedValues = editRole?.value?.permissions?.map(
        (data: any) => data?.value
    );

    React.useEffect(() => {
        dispatch(getAllPermissionCall());
    }, [dispatch]);

    const [openAccordion, setOpenAccordion] = React.useState<number | null>(
        null
    );
    const getInitialCheckboxValues = (permissions: any): any => {
        return (
            permissions?.reduce((acc: any, permission: any) => {
                acc[permission?.code] = permission?.value;
                return acc;
            }, {}) || {}
        );
    };
    const initialValues: any = {
        name: editRole?.value?.role?.name || '',
        description: editRole?.value?.role?.description || '',
        ...getInitialCheckboxValues(editRole?.value?.permissions),
    };
    interface Values {
        name: string;
        description: string;
        [key: string]: any;
    }
    const uniqueCategories: string[] = Array.from(
        new Set(
            userPermission?.permissions?.data?.map(
                (item: any) => item.permissionCategory
            )
        )
    );

    const isNameUnique = (name: string): boolean => {
        const mineData = Array.isArray(getMineData) ? getMineData : [];
        return !mineData.some(
            (role: any) => role.name.toLowerCase() === name.toLowerCase()
        );
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(
                /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,150}$/,
                nameValidation
            )

            .test(
                'is-unique',
                'Name already exists. Please choose another name.',
                (value: any) => {
                    if (
                        editRole?.value?.role &&
                        value === editRole?.value?.role?.name
                    ) {
                        return true;
                    }
                    return isNameUnique(value || '');
                }
            ),
        description: Yup.string().matches(
            /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/,
            descriptionValidation
        ),
    });
    const isAnyCheckboxChecked = (values: Values): boolean => {
        return Object.values(values).some((value) => value === true);
    };
    const isSubmitDisabled = (values: Values): boolean => {
        return (
            !values?.name.trim() ||
            !values?.description.trim() ||
            editRole?.viewOnly === true ||
            !isAnyCheckboxChecked(values)
        );
    };
    const onClose = async (): Promise<any> => {
        dispatch(viewOnlyData(false));
        dispatch(clearRoleById());
        setTimeout(() => {
            navigate(ROUTES.RolesGrid);
        }, 1000);
    };
    const handleSubmitForm = async (values: Values): Promise<any> => {
        const selectedPermissions = Object.keys(values)?.filter(
            (key) => values[key] === true
        );
        const permissionIds = userPermission?.permissions?.data
            ?.filter((item: any) => selectedPermissions?.includes(item.code))
            ?.map((item: any) => ({
                id: item?.id,
            }));

        const payload = {
            ...values,
            roleId: editRole?.value?.role?.id || '',
            type: 'system',
            createdBy: userPermission?.userRoles?.data?.orgId || '1',
            permissions: permissionIds,
        };
        if (editRole?.value?.role) {
            dispatch(
                openNotification({
                    success: true,
                    title: ' Role details edited successfully',
                    description: '',
                })
            );
        } else {
            dispatch(
                openNotification({
                    success: true,
                    title: 'Role added successfully.',
                    description: '',
                })
            );
        }

        const res = await CreateRoleApi.CreateRole(payload);
        if (!res?.data?.error) {
            dispatch(clearRoleById());
            setTimeout(() => {
                navigate(ROUTES.RolesGrid);
                dispatch(getUserPermissionCall());
            }, 2000);
        } else {
            return res;
        }
    };
    const toggleAccordion = async (index: number): Promise<any> => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const handleCheckAll = (e: any, category: string): void => {
        userPermission?.permissions?.data?.forEach((item: any) => {
            if (item.permissionCategory === category && formikRef) {
                formikRef?.current?.setFieldValue(item.code, e.target.checked);
            }
        });
    };

    const handleChangeForAllBox = (e: any, category: string): void => {
        const permissionsToCheck = userPermission?.permissions?.data?.filter(
            (item: any) => item?.permissionCategory === category
        );
        let count = 0;
        permissionsToCheck?.forEach((item: any) => {
            if (
                formikRef?.current?.values?.[item.code] ||
                (e?.target?.name === item?.code && e?.target?.checked)
            ) {
                count++;
            }
        });
        formikRef?.current?.setFieldValue(
            `${category}-all`,
            count === permissionsToCheck?.length
        );
    };

    const handleChangeForAllBoxForEdit = (
        e: any,
        category: string,
        permissions: any
    ): void => {
        const permissionsToCheck = userPermission?.permissions?.data?.filter(
            (item: any) => item?.permissionCategory === category
        );
        let count = 0;
        permissionsToCheck?.forEach((item: any) => {
            if (
                permissions?.find((it: any) => it?.code === item?.code)?.value
            ) {
                count++;
            }
        });
        formikRef?.current?.setFieldValue(
            `${category}-all`,
            count === permissionsToCheck?.length
        );
    };

    React.useEffect(() => {
        if (editRole?.value?.permissions) {
            editRole?.value?.permissions?.forEach((item: any) => {
                handleChangeForAllBoxForEdit(
                    {
                        target: {
                            name: '',
                            checked: false,
                        },
                    },
                    item?.permissionCategory,
                    editRole?.value?.permissions
                );
            });
        }
    }, [editRole?.value]);
    useEffect(() => {
        const data = {
            roleId: params?.id,
        };
        if (params?.id) {
            dispatch(EditRoleCall(data));
        }
    }, [dispatch]);

    return (
        <div className="bg-[#f9f9f9] h-screen" data-testid="add-roles-page">
            <div className="mx-8 py-5">
                <h1 className="font-[lato] text-lg font-semibold ">
                    {editRole?.value?.role ? 'Edit Role' : 'Add New Role'}
                </h1>
                <div className=" bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>
                <Formik
                    onSubmit={handleSubmitForm}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    innerRef={formikRef}
                    enableReinitialize={true}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {(props: any) => {
                        const {
                            handleSubmit,
                            values,
                            handleChange,
                            setFieldValue,
                            setFieldTouched,
                            errors,
                        } = props;
                        function hasErrors(
                            errorVal: FormikErrors<Values>
                        ): boolean {
                            return Object.values(errorVal).some(
                                (error) =>
                                    typeof error === 'string' &&
                                    error.length > 0
                            );
                        }
                        const shouldDisable = hasErrors(errors);

                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="flex my-5 ">
                                    <div className="w-[20rem]">
                                        <Field
                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent bg-transparent"
                                            label="Name"
                                            autoComplete="off"
                                            isRequired={true}
                                            id="name"
                                            name="name"
                                            component={Input}
                                            value={values.name}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'name',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Role Name"
                                            disabled={editRole?.viewOnly}
                                            autoFocus={true}
                                            data-testid="role-name-input"
                                        />
                                    </div>
                                    <div className="ml-7 w-[20rem]">
                                        <Field
                                            className=" border-neutral-400 border-x-0 border-t-0 border-b-1 outline-0 h-5 rounded-none focus:ring-transparent bg-transparent"
                                            label="Description"
                                            autoComplete="off"
                                            isRequired={true}
                                            id="description"
                                            name="description"
                                            component={Input}
                                            value={values.description}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                handleChange(e);
                                                setFieldTouched(
                                                    'description',
                                                    true,
                                                    false
                                                );
                                            }}
                                            placeholder="Description of role"
                                            disabled={editRole?.viewOnly}
                                            data-testid="role-description-input"
                                        />
                                    </div>
                                </div>
                                <div className="permission h-[27rem] overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 bg-white shadow-[0_3px_9px_rgb(0,0,0,0.2)] rounded-lg my-4 ">
                                    <h1 className="font-[lato] text-md mx-8 pt-6 font-semibold">
                                        Permissions
                                    </h1>
                                    <div className="bg-gradient-to-r w-[75rem] mx-8 from-[#48ABCA] from-0% to-transparent h-[0.2rem]"></div>

                                    {uniqueCategories?.map((name, index) => (
                                        <div key={index} className="mx-7 py-1">
                                            <Accordion
                                                handleToggle={() =>
                                                    toggleAccordion(index)
                                                }
                                                open={openAccordion === index}
                                                title={name}
                                                addRole={true}
                                                labelClass="flex justify-start"
                                                headerClassName={`
                                                    ${index % 2 === 1 ? 'bg-white' : 'bg-[#F5F5F5]'}
                                                    ${openAccordion === index ? 'bg-[#F5F5F5]' : ''}
                                                `}
                                            >
                                                <div className="flex">
                                                    {userPermission?.permissions?.data
                                                        ?.filter(
                                                            (permission: any) =>
                                                                permission.permissionCategory ===
                                                                name
                                                        )
                                                        ?.map(
                                                            (
                                                                permission: any,
                                                                i: any
                                                            ) => (
                                                                <div
                                                                    key={i}
                                                                    className="flex mx-4 items-center mt-2 focus:outline-none"
                                                                >
                                                                    <Field
                                                                        className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)]"
                                                                        type="checkbox"
                                                                        disabled={
                                                                            editRole?.viewOnly
                                                                        }
                                                                        autoComplete="off"
                                                                        id={
                                                                            permission?.code
                                                                        }
                                                                        name={
                                                                            permission?.code
                                                                        }
                                                                        value={
                                                                            values[
                                                                                permission
                                                                                    ?.code
                                                                            ]
                                                                        }
                                                                        checked={
                                                                            editRole
                                                                                ?.value
                                                                                ?.length
                                                                                ? getCheckedValues
                                                                                : !!values[
                                                                                      permission
                                                                                          ?.code
                                                                                  ]
                                                                        }
                                                                        onChange={(
                                                                            e: any
                                                                        ) => {
                                                                            handleChange(
                                                                                e,
                                                                                index,
                                                                                i
                                                                            );
                                                                            handleChangeForAllBox(
                                                                                e,
                                                                                name
                                                                            );
                                                                            if (
                                                                                !e
                                                                                    .target
                                                                                    .checked
                                                                            ) {
                                                                                setFieldValue(
                                                                                    `${name}-all`,
                                                                                    false
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                    <label
                                                                        className="text-sm mx-2 mt-1 capitalize"
                                                                        htmlFor={
                                                                            permission?.code
                                                                        }
                                                                    >
                                                                        {
                                                                            permission.description
                                                                        }
                                                                    </label>
                                                                </div>
                                                            )
                                                        )}
                                                    <div className="flex mx-4 items-center mt-2 h-8 focus:outline-none">
                                                        <Field
                                                            className="w-[1.2rem] h-[1.2rem] border-none focus:border-none rounded-sm border-None shadow-[0_2px_7px_rgb(0,0,0,0.2)]"
                                                            type="checkbox"
                                                            disabled={
                                                                editRole?.viewOnly
                                                            }
                                                            autoComplete="off"
                                                            id={`${name}-all`}
                                                            name={`${name}-all`}
                                                            value={
                                                                values[
                                                                    `${name}-all`
                                                                ]
                                                            }
                                                            checked={
                                                                editRole?.value
                                                                    ?.length
                                                                    ? getCheckedValues
                                                                    : !!values[
                                                                          `${name}-all`
                                                                      ]
                                                            }
                                                            onChange={(
                                                                e: any
                                                            ) => {
                                                                handleChange(e);
                                                                handleCheckAll(
                                                                    e,
                                                                    name
                                                                );
                                                            }}
                                                            data-testid="all-checkbox"
                                                        />
                                                        <label
                                                            className="text-sm mx-1 mt-1"
                                                            htmlFor={`${name}-all`}
                                                        >
                                                            {' All'}
                                                        </label>
                                                    </div>
                                                </div>
                                            </Accordion>
                                        </div>
                                    ))}
                                </div>
                                <div className="buttons py-3 float-right ">
                                    <EmployeeOnboardingFormActionModal
                                        handleSubmit={handleSubmit}
                                        onClose={onClose}
                                        isDisabled={
                                            isSubmitDisabled(values) ||
                                            shouldDisable
                                        }
                                    />
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}
