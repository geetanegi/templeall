// FileInput.tsx
import React from 'react';
import { FileInputProps } from '../../types/SentForInfo.types';

const FileInput: React.FC<FileInputProps> = ({
    fileState,
    onChange,
    errorState,
    uploadText,
    documentIcon,
    uploadIcon,
    redIcon,
}) => {
    const fileName = fileState?.file ? fileState?.file.name : ''; // Ensure fileName is safely accessed

    return (
        <div className="col-span-1">
            <div className="box1 border-dashed border-2 border-gray-400 flex justify-center items-center w-full h-32">
                <label className="text-xl font-light text-gray-700">
                    {fileName ? (
                        <div className="flex space-x-3 items-end">
                            <img
                                src={documentIcon}
                                className="w-[30px] mr-2"
                                alt="document"
                            />
                            {fileName}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center space-x-3">
                            <input
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => onChange(e)}
                                type="file"
                                className="hidden ml-2"
                                accept=".pdf,.docx,.xlsx,.png,.jpg,.txt"
                            />
                            <span className="flex flex-col items-center">
                                <span className="flex">
                                    <img
                                        className="mr-2"
                                        src={uploadIcon}
                                        alt="upload"
                                    />
                                    {uploadText}
                                </span>
                                <span className="text-xs cursor-pointer">
                                    {errorState ? (
                                        <span className="mt-2 flex text-xs text-red-500">
                                            <img
                                                className="mr-2"
                                                src={redIcon}
                                                alt="error"
                                            />
                                            File size exceeds the maximum limit
                                            of 15 MB.
                                        </span>
                                    ) : (
                                        'File must be under 15 MB.'
                                    )}
                                </span>
                            </span>
                        </div>
                    )}
                </label>
            </div>
        </div>
    );
};

export default FileInput;
