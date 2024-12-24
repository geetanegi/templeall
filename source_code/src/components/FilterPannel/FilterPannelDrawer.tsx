import React from 'react'
import Drawer from '../GenericUIcomponents/DrawerComponent'

interface FilterPannelDrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (flag: boolean) => void

}

const FilterPannelDrawer: React.FC<FilterPannelDrawerProps> = ({
    isDrawerOpen,
    setIsDrawerOpen
}) => {
    return (
        <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            className='w-[30vw] h-full'
            title='Filter Pannel '
        >
            <div  className='h-full flex flex-col'>
                <div className='mt-auto absolute w-full gap-3 border-t py-3 bottom-11 flex'>
                    <button className='ml-auto w-32 rounded-md bg-[#7B7887] py-2 text-white'>
                        Cancel
                    </button>
                    <button className='w-32 mr-5 rounded-md bg-primaryColor py-2 text-white'>
                        Apply
                    </button>
                </div>
            </div>
        </Drawer>
    )
}

export default FilterPannelDrawer
