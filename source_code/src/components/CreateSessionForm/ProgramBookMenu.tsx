/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import ProgramBook from './ProgramBook';
import programBookApis from '../../api/services/programbook.service';

export default function ProgramBookMenu({
    userId,
}: {
    userId: string;
}): React.JSX.Element {
    const [programBooks, setProgramBooks] = useState([]);
    useEffect(() => {
        (async () => {
            if (userId) {
                const response = await programBookApis.getProgramBooksForUser({
                    userChildId: userId,
                    programBookByUserId: false,
                });
                setProgramBooks(response.data.data);
            }
        })();
    }, [userId]);

    return (
        <div
            id="application-sidebar"
            className={`z-auto hs-overlay mt-8 rounded-md hs-overlay-open:translate-x-0 -translate-x-full  transition-all duration-300 transform top-0 start-0 bottom-0 z-[60] w-80 border border-gray-200 pb-10  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 `}
        >
            <div className="h-[70vh] overflow-y-scroll flex flex-col">
                {programBooks.map((programBook: any) => {
                    return (
                        <ProgramBook
                            name={programBook.name}
                            key={programBook.programBookUUID}
                            programBook={programBook}
                        />
                    );
                })}
            </div>
        </div>
    );
}
