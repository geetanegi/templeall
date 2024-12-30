import React, { useEffect, useState } from 'react'

import CustomDatePicker from '../../Formik/components/DatePickerContestUi';
import MUISelect from '../../Formik/components/MUISelect';
import { getFilters } from '../../utils/genericApiCalls';
import { API_URL } from '../../services/enums';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { decryptData, secretKey } from '../../utils/encrypt';
import apiService from '../../services/apiService';
import { useFormikContext } from 'formik';
import { MultiSelectDropdown } from '../GenericUIcomponents/MultiSelectComponent';




interface filterListType {
  type: string
  filterName: string
  name: string
}

interface FilterPannelProps {
  filterList: filterListType
  disabled: boolean;
  selectedCourse: string | number | null
}

const FilterPannel: React.FC<FilterPannelProps> = ({ filterList, disabled, selectedCourse }) => {

   const { setFieldValue} = useFormikContext<{
      selectedHoles: Array<any>
    }>();
  const userPermissionAvailable = useSelector(
    (state: RootState) => state?.auth?.userPermissions,
  );
  const userPermisions =
    userPermissionAvailable &&
    JSON.parse(decryptData(userPermissionAvailable, secretKey));

  const isCourseAdmin = userPermisions?.permission?.["is_course_admin"];

  const [filterDropdown, setFilterDropdown] = useState<any>([])
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const getFilterOptions = () =>{
      setFilterDropdown(
        [
          {id: true, displayName: "Active"},
          {id: false, displayName: "Inactive"}
        ]
      )
  }

  const fetchCourseList = async () => {
    try {
      let endPoint = API_URL.getCourseList
      if (isCourseAdmin) {
        endPoint = API_URL.getCourseFilterForCA
      }
      const res = await apiService.post<any>(
        endPoint,
        {
          data: {},
        },
      );
      if (res.status === 200 && !res.data.error) {
        const filterData = res?.data?.data?.map((item:any)=>{ return{id:item.id, displayName: item.courseName}})
        setFilterDropdown(filterData)
      } else if (res.data.error) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHoleList = async () => {
    try {
      const res = await apiService.post<any>(
        API_URL.getHoleByCourseId,
        {
          data: {
            courseId: selectedCourse,
          },
        },
      );
      if (res.status === 200 && !res.data.error) {
        setFilterDropdown(res.data);
      } else if (res.data.error) {
      }
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if(filterList.filterName === 'contestStatus'){
      getFilterOptions()
    }else if(filterList.filterName === 'courseFilter'){
      fetchCourseList()
    }else if(filterList.filterName  === 'holesFilter'){
      fetchHoleList()
    } else if (filterList.filterName) {
      getFilters(filterList.filterName, setFilterDropdown)
    }
  }, [])


  useEffect(()=>{
    if(filterList.filterName  === 'holesFilter'){
      fetchHoleList()
    }
    if(!selectedCourse){
      setSelectedOptions([])
    }
  },[selectedCourse])



  const renderFilterType = () => {

    switch (filterList.type) {
      case 'dropdown':
        return <MUISelect
          options={filterDropdown.map((item: any) => {
            const filterObj = { key: item.displayName, value: item.id }
            return filterObj
          })}
          label={filterList.name}
          name={filterList.filterName}
        />
      case 'dateRage':
        return <div className="grid grid-cols-1 gap-x-5 gap-y-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
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
      case 'multi-select': 
          return <MultiSelectDropdown
          label={'Filter by Holes'}
          options={filterDropdown?.data?.map((hole:any) => ({
            id: hole.holeNumber.toString(),
            name: hole ? `Hole #${hole.holeNumber} - Par ${hole.par || ""}` : '',
          })) || []}
          labelKey="name"
          valueKey="id"
          disabled={disabled}
          selectedValues={selectedOptions}
          onChange={(selected) =>{
            debugger
            setFieldValue('holesFilter', selected)
            setSelectedOptions(selected)}}
        />
      default:
        break;
    }

  }


  return (

    <div className='flex flex-col gap-4'>
      {renderFilterType()}
    </div>
  )
}

export default FilterPannel
