import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearInterventionData,
    setPhaseType,
} from '../../../redux/slice/InterventionAll/InterventionSlice';
import { Link, useParams } from 'react-router-dom';
import Button from '../../Generics/Button';
export default function TabsForIntervention(): React.JSX.Element {
    const dispatch = useDispatch<any>();
    const params = useParams();
    const phaseType = useSelector(
        ({ interventionSlice }: any) => interventionSlice?.phaseType
    );
    const tabs: Array<string> = ['Current', 'Mastered', 'Discontinued'];
    const handleOnClick = (tab: any): any => {
        dispatch(setPhaseType(tab.toUpperCase()));
        dispatch(clearInterventionData());
    };
    const handleRedirection = (tab: any): any => {
        if (tab === 'CURRENT') {
            return `/interventionLanding/${params?.id ?? params.interventionId}`;
        } else if (tab === 'DISCONTINUED') {
            return `/interventionLanding/${params?.id ?? params.interventionId}/${tab}`;
        } else {
            return `/interventionLanding/${params?.id ?? params.interventionId}/${tab}`;
        }
    };
    return (
        <div>
            {tabs.map((tab, index) => {
                return (
                    <Button
                        key={index}
                        className={
                            tab.toUpperCase() === phaseType
                                ? 'text-primary-800 cursor-pointer font-semibold'
                                : 'cursor-pointer'
                        }
                        type={''}
                        onClick={() => handleOnClick(tab)}
                    >
                        <Link to={handleRedirection(tab?.toUpperCase())}>
                            {tab}
                            {index !== tabs.length - 1 ? (
                                <span>&nbsp;|&nbsp;</span>
                            ) : (
                                ''
                            )}
                        </Link>
                    </Button>
                );
            })}
        </div>
    );
}
