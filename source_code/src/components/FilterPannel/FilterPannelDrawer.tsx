import React, { useState } from 'react'
import Drawer from '../GenericUIcomponents/DrawerComponent'
import FilterPannel from './FilterPannel';
import { Form, Formik } from 'formik';


interface filterListType {
    type: string
    filterName: string
    name: string
}

interface FilterPannelDrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (flag: boolean) => void;
    filterList: Array<filterListType>;
    filterHandler: (filter: any) => void
}

const FilterPannelDrawer: React.FC<FilterPannelDrawerProps> = ({
    isDrawerOpen,
    setIsDrawerOpen,
    filterList = [],
    filterHandler
}) => {

    const [refreshFilter, setRefreshFilter] = useState<boolean>(false)

    const handleSubmit = (
        values: any
    ) => {
        filterHandler(values)
        setIsDrawerOpen(false)
    }

    const handleClearAll = (resetForm: (nextState?: any) => void) => {
        const initialValues = filterList.reduce((acc: any, filter) => {
            acc[filter.filterName] = filter.type === 'multi-select' ? [] : ''; 
            return acc;
        }, {});

        resetForm({ values: initialValues });
        setRefreshFilter(true); 
        setTimeout(() => setRefreshFilter(false), 0);
    };

    return (
        <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            className='w-[30vw] h-full'
            title='Filter panel '
        >

            <Formik
                initialValues={{ courseFilter: '' }}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >

                {({ values, resetForm }) => {

                    return <Form>
                        <div className='flex'>
                            <button className='ml-auto mr-5 mt-5 text-[#4169E1]'
                                type='button'
                                onClick={() => handleClearAll(resetForm)}
                            >Clear All</button>
                        </div>
                        <div className='h-screen flex flex-col '>
                            <div className='p-5 flex flex-col gap-4'>
                                {
                                    !refreshFilter && filterList.map((filter: filterListType) => (
                                        <FilterPannel
                                            filterList={filter}
                                            disabled={!(values.courseFilter)}
                                            selectedCourse={values.courseFilter}
                                        />))
                                }
                            </div>

                            <div className='mt-auto absolute w-full gap-3 border-t py-3 bottom-11 flex'>
                                <button
                                    type="button"
                                    onClick={() => setIsDrawerOpen(false)}
                                    className='ml-auto w-32 rounded-md bg-[#7B7887] py-2 text-white'
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className='w-32 mr-5 rounded-md bg-primaryColor py-2 text-white'>
                                    Apply
                                </button>
                            </div>
                        </div>
                    </Form>
                }}
            </Formik>

        </Drawer>
    )
}

export default FilterPannelDrawer
