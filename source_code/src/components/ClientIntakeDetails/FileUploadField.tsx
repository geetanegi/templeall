/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';
import Button from '../Generics/Button';
import redIcon from '../../assets/img/redIicon.svg';
import document from '../../assets/img/tempFolder.svg';
import upload from '../../assets/img/uploadDoc.svg';
import deleteicon from '../../assets/img/GridIcons/delete.svg';
interface FileUploadFieldProps {
    setFilesToDelete?: any;
    isRequired: boolean;
    name: string;
    label: string;
    files?: { [key: string]: File | null }; // Store files in an object by field name
    onFilesChange: (name: string, file: File | null) => void;
    onError?: (name: string, error: boolean) => void;
    filesToDelete?: any;
    customRenderer?: any;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
    setFilesToDelete,
    isRequired,
    name,
    label,
    files,
    onFilesChange,
    onError,
    filesToDelete,
    customRenderer,
}) => {
    console.log(customRenderer);
    const [error, setError] = useState(false);
    const isSpecificViewPresent = window.location.href.includes('view');
    console.log(isSpecificViewPresent, 'isSpecificViewPresent');
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        const maxSizeInBytes = 15 * 1024 * 1024; // 15 MB in bytes

        if (selectedFile && selectedFile.size > maxSizeInBytes) {
            setError(true);
            if (onError) onError(name, true);
            e.target.value = ''; // Reset the file input
        } else if (selectedFile) {
            setError(false);
            if (filesToDelete?.includes(name)) {
                setFilesToDelete((prevFiles: any) =>
                    prevFiles.filter((file: any) => file !== name)
                );
            }
            onFilesChange(name, selectedFile); // Update the specific file for this input
            if (onError) onError(name, false);
        }
    };

    const handleRemoveFile = () => {
        setFilesToDelete((prevFiles: any) => [...prevFiles, name]);
        onFilesChange(name, null); // Remove the file for this input
    };

    return (
        <div
            className={`col-span-1 ${isSpecificViewPresent ? 'pointer-events-none opacity-50' : ''}`}
        >
            {label && (
                <>
                    <span>
                        {label}
                        {isRequired ? (
                            <span className="text-red-500 ml-1">*</span>
                        ) : null}
                    </span>
                    <div className="mb-6 w-full bg-gradient-to-r from-[#48ABCA] from-0% to-transparent h-[0.2rem]" />
                </>
            )}

            <div className="box1 border-dashed border-2 border-gray-400 flex flex-col justify-center items-center w-full h-32">
                {files?.[name] ? (
                    <div className="flex items-center space-x-3">
                        <img
                            src={document}
                            className="w-[30px]"
                            alt="Document Icon"
                        />
                        <span className="max-w-32 word-wrap break-all">
                            {files?.[name]?.name}
                        </span>
                        <Button
                            type="button"
                            onClick={handleRemoveFile}
                            className={''}
                        >
                            <img src={deleteicon} alt="Delete Icon" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center space-x-3">
                        <input
                            onChange={handleFileChange}
                            type="file"
                            id={name}
                            className="hidden"
                            accept=".pdf,.docx,.xlsx,.png,.jpg,.txt"
                        />
                        <label
                            htmlFor={name}
                            className="flex flex-col items-center cursor-pointer"
                        >
                            <span className="flex">
                                <img
                                    className="mr-2"
                                    src={upload}
                                    alt="Upload"
                                />
                                Upload your document here
                            </span>
                            <span className="text-xs">
                                {error ? (
                                    <span className="mt-2 flex text-xs text-red-500">
                                        <img
                                            className="mr-2"
                                            src={redIcon}
                                            alt="Error Icon"
                                        />
                                        File size exceeds the maximum limit of
                                        15 MB.
                                    </span>
                                ) : (
                                    'File must be under 15 MB.'
                                )}
                            </span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUploadField;
