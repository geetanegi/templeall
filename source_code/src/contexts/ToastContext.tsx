import React, { createContext, useMemo, useState } from 'react';
import Toast from '../components/Toast';

export const ToastContext = createContext<any>({});

export const ToastContextProvider = ({
    children,
}: {
    children: any;
}): React.JSX.Element => {
    const [toastList, setToastList] = useState<any>([]);
    const removeToast = (index: number): void => {
        const list = [...toastList];
        list.splice(index, 1);
        setToastList(list);
    };
    const addToast = ({
        message,
        type = 'info',
    }: {
        message: string;
        type?: string;
    }): void => {
        setToastList((prev: any) => [
            ...prev,
            {
                message,
                type,
            },
        ]);
    };
    const provideValue = useMemo(
        () => ({
            data: toastList,
            addToast,
            removeToast,
        }),
        [toastList]
    );
    return (
        <ToastContext.Provider value={provideValue}>
            <div className="absolute top-4 z-[9999] right-4 space-y-4">
                {toastList.map((toast: any, index: number) => {
                    return (
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            key={toast.message}
                            index={index}
                            removeToast={removeToast}
                        />
                    );
                })}
            </div>
            {children}
        </ToastContext.Provider>
    );
};
