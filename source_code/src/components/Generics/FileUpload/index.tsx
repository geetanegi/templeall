import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';

interface FileUploadProps {
    handleDelete: () => void;
    handleChange: (name: string, file: any) => void;
    files: any;
    name: string;
}

const FileUploadComponent: React.FC<FileUploadProps> = ({
    handleDelete,
    handleChange,
    files,
    name,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Handle file selection
    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            handleChange(file.name, file);
        }
    };

    // Handle file removal
    const handleRemoveFile = (): void => {
        setSelectedFile(null);
        handleDelete();
    };
    useEffect(() => {
        setSelectedFile(files);
    }, [files]);

    return (
        <div className="flex flex-col items-start">
            {!selectedFile ? (
                <>
                    {/* Hidden file input */}
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        name={name}
                        onChange={handleFileChange}
                    />
                    {/* Custom link to trigger the file input */}
                    <label
                        htmlFor="file-upload"
                        className="text-primary-600 hover:underline cursor-pointer"
                    >
                        Select a file
                    </label>
                </>
            ) : (
                <div className="flex items-center">
                    {/* Display selected file name */}
                    <span className="mr-4 text-gray-500 mt-2 max-w-32 break-words">
                        {selectedFile.name}
                    </span>
                    {/* Delete button */}
                    <button
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:underline cursor-pointer mt-2"
                    >
                        <Trash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FileUploadComponent;
