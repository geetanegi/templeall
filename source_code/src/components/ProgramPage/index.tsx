import * as React from 'react';
import RenameProgram from './RenameProgram';
import EditProgram from './EditProgram';
import { useSelector } from 'react-redux';

export default function ProgramPage(): React.JSX.Element {
    const programBookData = useSelector(
        ({ saveProgramBookLibraryGridData }: any) =>
            saveProgramBookLibraryGridData?.value?.data
    );
    return (
        <div>
            {programBookData?.name ? '' : <RenameProgram />}
            {/* <RenameProgram /> */}
            <div className="w-1/2 bg-gradient-to-r from-[#48ABCA] mt-1 from-0% to-transparent h-[0.2rem] rounded-t-md"></div>
            <EditProgram />
        </div>
    );
}
