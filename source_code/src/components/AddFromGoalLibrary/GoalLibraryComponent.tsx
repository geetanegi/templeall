import React, { useState } from 'react';
import Accordion from '../Accordion';
import LibraryBook from './LibraryBook';
import Badge from '../Badge';
import { useDispatch } from 'react-redux';
import { removeItemFromConfiguration } from '../../redux/slice/addFromGoalLibrary/addFromGoalLibrarySlice';

export default function GoalLibraryComponent({
    library,
    addFromLibraryData,
    index,
    setOverwriteData,
}: {
    library: any;
    addFromLibraryData: any;
    index?: any;
    setOverwriteData?: any;
}): React.JSX.Element {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const handleRemove = (type: string, item: any): void => {
        dispatch(removeItemFromConfiguration({ type, data: item }));
    };
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
            headerClassName={`${index % 2 === 1 ? (open ? 'bg-[#8CCADE]' : 'bg-white') : open ? 'bg-[#8CCADE]' : 'bg-[#F5F5F5]'}`}
        >
            {open ? (
                <div className="flex">
                    <div
                        id="application-sidebar"
                        className={`z-auto hs-overlay rounded-md hs-overlay-open:translate-x-0 -translate-x-full  transition-all duration-300 transform top-0 start-0 bottom-0 z-[60] w-1/4 border border-gray-200 pb-10  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 `}
                    >
                        <div className="flex flex-col">
                            <LibraryBook
                                name={library.name}
                                library={library}
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
                                                    key={domain.domainId}
                                                    title={domain.name}
                                                    handleCancel={() =>
                                                        handleRemove(
                                                            'domain',
                                                            domain
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ) : null}
                        {addFromLibraryData.longTermGoal.length ? (
                            <div>
                                <div>Long Term Goals</div>
                                <div>
                                    {addFromLibraryData.longTermGoal.map(
                                        (program: any) => {
                                            return (
                                                <Badge
                                                    key={program.longTermGoalIs}
                                                    title={program.name}
                                                    handleCancel={() =>
                                                        handleRemove(
                                                            'longTermGoal',
                                                            program
                                                        )
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        ) : null}
                        {addFromLibraryData.shortTermGoal.length ? (
                            <div>
                                <div>Short Term Goals</div>
                                <div>
                                    {addFromLibraryData.shortTermGoal.map(
                                        (target: any) => {
                                            return (
                                                <Badge
                                                    key={target.shortTermGoalId}
                                                    title={
                                                        target?.newName ||
                                                        target.name
                                                    }
                                                    handleCancel={() =>
                                                        handleRemove(
                                                            'shortTermGoal',
                                                            target
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
