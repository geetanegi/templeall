import * as React from 'react';
import RenameTarget from './RenameTarget';
import EditTarget from './EditTarget';
import TargetMenuGraph from './TargetMenuGraph';
import { useSelector } from 'react-redux';

export default function SelectedTargetPage(): React.JSX.Element {
    const programBookLibrary = useSelector(
        ({ saveProgramBookLibraryDataByID }: any) =>
            saveProgramBookLibraryDataByID?.value?.data
    );
    return (
        <div className="pt-1 pl-3 sm:pl-4 md:pl-4 w-3/4 space-y-2">
            <RenameTarget />
            <div className="w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem] rounded-t-md"></div>
            <div className="space-y-8">
                <EditTarget />
                {!programBookLibrary && <TargetMenuGraph />}
            </div>
        </div>
    );
}
