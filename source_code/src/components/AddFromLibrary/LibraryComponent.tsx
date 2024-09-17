import React, { useState } from 'react';
import Accordion from '../Accordion';
import ProgramBook from '../CreateSessionForm/ProgramBook';
import Badge from '../Badge';
import { useDispatch } from 'react-redux';
import {
    removeFromArrayItem,
    removeItem,
} from '../../redux/slice/addFromLibrary/addFromLibrarySlice';
export default function LibraryComponent({
    library,
    addFromLibraryData,
    setOverwriteData,
    index,
}: {
    library: any;
    addFromLibraryData: any;
    index?: any;
    setOverwriteData?: any;
}): React.JSX.Element {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleRemoveFromLibrary = (data: any): void => {
        dispatch(removeItem(data));
        dispatch(removeFromArrayItem(data));
    };
    const handleCancel = (data: any, type: string): void => {
        handleRemoveFromLibrary({
            type,
            data: {
                id: data.id,
                domainId: data.domainId,
                programId: data.programId,
                programBookId: data.sourceId,
                name: data.name,
            },
        });
    };
    const getBackgroundColor = (): string => {
        if (open) {
            return '#8CCADE';
        }
        return index % 2 === 1 ? 'white' : '#F5F5F5';
    };
    const backgroundColor = getBackgroundColor();
    return (
        <Accordion
            title={
                <div className="flex justify-between items-center text-black text-[14px]">
                    <div className="flex w-full items-center">
                        <div className="flex flex-1 justify-start">
                            {library.name}
                        </div>
                        <div className="flex flex-1 justify-start">
                            {library.createdBy?.firstName +
                                ' ' +
                                library.createdBy.lastName}
                        </div>
                        <div className="flex flex-1 justify-start">
                            {library.createdDate}
                        </div>
                    </div>
                </div>
            }
            addRole={false}
            open={open}
            fromLibrary={true}
            handleToggle={() => setOpen((prev) => !prev)}
            headerClassName={`bg-[${backgroundColor}]`}
        >
            {open ? (
                <div className="flex">
                    <div
                        id="application-sidebar"
                        className={`z-auto hs-overlay rounded-md hs-overlay-open:translate-x-0 -translate-x-full  transition-all duration-300 transform top-0 start-0 bottom-0 z-[60] w-1/4 border border-gray-200 pb-10  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 `}
                    >
                        <div className="flex flex-col">
                            <ProgramBook
                                name={library.name}
                                programBook={{
                                    ...library,
                                    programBookUUID:
                                        library.programBookLibraryUUID,
                                }}
                                fromLibrary={true}
                                open={open}
                                setOverwriteData={setOverwriteData}
                            />
                        </div>
                    </div>
                    <div className="ml-10 mt-5">
                        {addFromLibraryData.domains.length ? (
                            <div>
                                <div className="text-md">Domains</div>
                                <div>
                                    {addFromLibraryData.domains.map(
                                        (domain: any) => {
                                            return (
                                                <Badge
                                                    key={domain.id}
                                                    title={domain.name}
                                                    handleCancel={() =>
                                                        handleCancel(
                                                            domain,
                                                            'domain'
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ) : null}
                        {addFromLibraryData.programs.length ? (
                            <div>
                                <div>Programs</div>
                                <div>
                                    {addFromLibraryData.programs.map(
                                        (program: any) => {
                                            return (
                                                <Badge
                                                    key={program.id}
                                                    title={program.name}
                                                    handleCancel={() =>
                                                        handleCancel(
                                                            program,
                                                            'program'
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ) : null}
                        {addFromLibraryData.targets.length ? (
                            <div>
                                <div>Targets</div>
                                <div>
                                    {addFromLibraryData.targets.map(
                                        (target: any) => {
                                            return (
                                                <Badge
                                                    key={target.id}
                                                    title={
                                                        target?.newName ||
                                                        target.name
                                                    }
                                                    handleCancel={() =>
                                                        handleCancel(
                                                            target,
                                                            'target'
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </Accordion>
    );
}
