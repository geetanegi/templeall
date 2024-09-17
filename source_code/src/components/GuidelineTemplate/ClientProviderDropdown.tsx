import React, { useState, useEffect, useRef } from 'react';

export default function ClientProviderDropdown({
    item,
    addDynamicValue,
}: {
    item: any;
    addDynamicValue: any;
}): React.JSX.Element {
    const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
    const [openParentDropdowns, setOpenParentDropdowns] =
        useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpenParentDropdowns(false);
                setOpenDropdowns([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = (key: string): void => {
        if (openDropdowns.includes(key)) {
            setOpenDropdowns(
                openDropdowns.filter((openKey) => openKey !== key)
            );
        } else {
            setOpenDropdowns([...openDropdowns, key]);
        }
        setOpenParentDropdowns(true);
    };

    return (
        <div ref={dropdownRef} className="group inline-block relative">
            <button
                className="outline-none focus:outline-none px-3 py-1 flex items-center min-w-20"
                onClick={(e) => {
                    e.preventDefault();
                    toggleDropdown('dropdown');
                }}
            >
                <span className="pr-1 font-medium text-[#394148] flex-1">
                    {item.name}
                </span>
            </button>

            {openParentDropdowns && (
                <ul className="bg-white border rounded-sm absolute  w-[18rem] z-50">
                    {item?.value?.map((data: any) => {
                        // const isChildOpen = openDropdowns.includes(data.key);

                        return (
                            <li
                                key={data.key}
                                className="rounded-sm z-50 relative  text-black  "
                            >
                                <span
                                    className="w-full text-left  items-center outline-none focus:outline-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleDropdown(data.key);
                                        setOpenParentDropdowns(false);
                                        setOpenDropdowns([]);
                                    }}
                                >
                                    <span className="relative  flex-1 ">
                                        <div className="bg-[#D9D9D9] pl-6">
                                            <span className="pointer-events-none font-semibold ">
                                                {data.value}
                                            </span>
                                        </div>

                                        <ul className="bg-white ps-6 left-[1.5rem] flex flex-col justify-between space-y-2 pt-2">
                                            {data.child.map((child: any) => (
                                                <>
                                                    <li
                                                        key={child.key}
                                                        className=" text-[#394148] hover:bg-[#D9D9D9] w-50 hover:text-black flex flex-col cursor-pointer"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            addDynamicValue(
                                                                child.key,
                                                                item.name,
                                                                child.value
                                                            );
                                                            setOpenParentDropdowns(
                                                                false
                                                            );
                                                            setOpenDropdowns(
                                                                []
                                                            );
                                                        }}
                                                    >
                                                        {child.key}
                                                        <span className=" border-b-2 border-gray-300 w-50"></span>
                                                    </li>
                                                </>
                                            ))}
                                        </ul>
                                    </span>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
