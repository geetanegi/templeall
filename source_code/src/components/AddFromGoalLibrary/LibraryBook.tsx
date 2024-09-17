import React, { useEffect } from 'react';
import Accordion from '../Accordion';
import Tree from '../GoalLibrary/Tree/Tree';
import { useDispatch } from 'react-redux';
import {
    getAllGoalLibraryDomainByGoalLibraryId,
    getGoalLibraryById,
} from '../../redux/slice/GoalLibrary/GoalLibraryData';

export default function LibraryBook({
    name,
    library,
    fromLibrary,
    open,
    setOverwriteData,
}: {
    name: string;
    library: any;
    fromLibrary?: boolean;
    open?: any;
    setOverwriteData?: any;
}): React.JSX.Element {
    const [openBook, setOpenBook] = React.useState(false);
    const dispatch = useDispatch<any>();
    const handleToggle = (): void => {
        setOpenBook(!openBook);
    };
    useEffect(() => {
        dispatch(getGoalLibraryById({ id: library?.id }));
        dispatch(
            getAllGoalLibraryDomainByGoalLibraryId({
                id: library?.id,
            })
        );
    }, [library]);
    return (
        <Accordion
            handleToggle={handleToggle}
            open={fromLibrary ? open : openBook}
            title={name}
            labelClass="flex justify-start"
            addRole={false}
        >
            <Tree
                libraryId={library?.id}
                disableLinks
                addToLibrary
                setOverwriteData={setOverwriteData}
            />
        </Accordion>
    );
}
