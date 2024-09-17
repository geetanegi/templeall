import React from 'react';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { toTitleCase } from '../../utils/toTitleCase';
export default function OverwriteModal({
    onSuccess,
    itemName,
    onCancel,
    itemType,
}: {
    itemName: string;
    onSuccess: any;
    onCancel: any;
    itemType?: string;
}): React.JSX.Element {
    return (
        <ConfirmationModal
            header={`A ${toTitleCase(itemType ?? '').toLowerCase() || 'target'} with name '${itemName}' already exists.`}
            title={`Do you want to overwrite the existing ${toTitleCase(itemType ?? '').toLowerCase() || 'target'}?`}
            open={true}
            onClose={onCancel}
            handleStop={onSuccess}
            yesButtonText="Overwrite"
            noButtonText="Cancel"
        />
    );
}
