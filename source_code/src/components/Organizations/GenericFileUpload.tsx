import React, { useRef } from 'react';

import upload from '../../assets/img/UploadIcon.svg';

interface FileUploadProps {
    onFileChange?: (file: File) => void;
    onBase64Complete?: (base64: string) => void;
    accept?: string;
    label?: string; // New prop for custom label text
}

const GenericFileUpload: React.FC<FileUploadProps> = ({
    onFileChange,
    onBase64Complete,
    accept,
    label, // Default label text
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault(); // Prevent the default behavior of the button
        fileInputRef.current?.click();
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        event.preventDefault(); // Prevent the default behavior of the input
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        // Callback for file selection
        onFileChange?.(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            // Callback for when base64 conversion is complete
            onBase64Complete?.(base64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            {/* Hide the default input but make it accessible */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={accept}
                style={{ display: 'none' }}
                aria-label={label} // Ensure accessibility
            />
            {/* Custom button that triggers the hidden file input */}
            <button
                onClick={handleClick}
                className="btn-upload text-[#08627E] text-sm flex"
            >
                <img className="mx-2" src={upload} alt="upload" />
                {label}
            </button>
        </div>
    );
};

export default GenericFileUpload;
