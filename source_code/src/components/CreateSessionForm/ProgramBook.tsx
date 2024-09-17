import React, { useState } from 'react';
import Accordion from '../Accordion';
import DomainMenu from '../DomainMenu';

export default function ProgramBook({
    name,
    programBook,
    fromLibrary,
    open,
    setOverwriteData,
}: {
    name: string;
    programBook: any;
    fromLibrary?: boolean;
    open?: any;
    setOverwriteData?: any;
}): React.JSX.Element {
    const [openBook, setOpenBook] = useState(false);
    const handleToggle = (): void => {
        setOpenBook(!openBook);
    };
    return (
        <Accordion
            handleToggle={handleToggle}
            open={fromLibrary ? open : openBook}
            title={name}
            labelClass="flex justify-start"
            addRole={false}
        >
            <DomainMenu
                programBookUUID={programBook.programBookUUID}
                sessionPage
                fromLibrary={fromLibrary}
                setOverwriteData={setOverwriteData}
            />
        </Accordion>
    );
}
