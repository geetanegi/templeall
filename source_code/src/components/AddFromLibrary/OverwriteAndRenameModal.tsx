import React from 'react';
import ConfirmationModal from '../Generics/ConfirmationModal';
import { toTitleCase } from '../../utils/toTitleCase';

export default function OverwriteAndRenameModal({
    onSuccess,
    itemName,
    onCancel,
    itemType,
    onSecondaryClick,
}: {
    itemName: string;
    onSuccess: any;
    onCancel: any;
    itemType?: string;
    onSecondaryClick?: any;
}): React.JSX.Element {
    return (
        <ConfirmationModal
            header={`A ${toTitleCase(itemType || '').toLowerCase() || 'target'} with name '${itemName}' already exists.`}
            title={'Do you want to override or rename the existing item?'}
            open={true}
            onClose={onCancel}
            onSecondaryClick={onSecondaryClick}
            handleStop={onSuccess}
            yesButtonText="Override"
            noButtonText="Rename"
            isNoButtonPrimary={true}
            showCancelIcon
        />
    );
}
