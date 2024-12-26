import React from 'react'
import Drawer from '../GenericUIcomponents/DrawerComponent'
import FilterPannel from './FilterPannel';
import { Formik } from 'formik';


interface filterListType {
    type: string
    filterName: string
}

interface FilterPannelDrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (flag: boolean) => void;
    filterList: filterListType | any;
}

const FilterPannelDrawer: React.FC<FilterPannelDrawerProps> = ({
    isDrawerOpen,
    setIsDrawerOpen,
    filterList,
}) => {

    const handleSubmit = (
        values: any
    ) => {
        console.log(values, "values")
    }

    return (
        <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            className='w-[30vw] h-full'
            title='Filter Pannel '
        >
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                <div className='h-screen flex flex-col'>
                    <div className='p-5'>
                        <FilterPannel filterList={filterList}  />
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
            </Formik>
        </Drawer>
    )
}

export default FilterPannelDrawer
