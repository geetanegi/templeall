import React from 'react'

import CustomDatePicker from '../../Formik/components/DatePickerContestUi';
import MUISelect from '../../Formik/components/MUISelect';


interface filterListType {
  type: string
  filterName: string
}

interface FilterPannelProps {
  filterList: filterListType
}

const FilterPannel: React.FC<FilterPannelProps> = ({ }) => {


  return (

    <div className='flex flex-col gap-4'>
      {/* <SelectComponent label={"test"} options={[]} onChange={(e) => { console.log(e) }} /> */}
      <MUISelect 
        options={[]}
        label='test'
        name='test'
      />
      <div className="grid grid-cols-1 gap-x-5 gap-y-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <CustomDatePicker
          name="startDate"
          label="Start Date"
          required={true}
        />
        <CustomDatePicker
          name="endDate"
          label="End Date"
          required={true}
        />
      </div>
    </div>
  )
}

export default FilterPannel
