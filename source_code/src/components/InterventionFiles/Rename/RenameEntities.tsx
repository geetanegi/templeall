import React, { useContext, useState } from 'react';
import RenameEntitiesInterventionApi from '../../../api/services/Intervention/RenameEntities';
import cancel from '../../../assets/img/close.svg';
import save from '../../../assets/img/Tick.svg';
import { openNotification } from '../../../redux/slice/Notification/notifications';
import { useDispatch } from 'react-redux';
import Button from '../../Generics/Button';
import { ToastContext } from '../../../contexts/ToastContext';
import SmallLoaderComponent from '../../LoaderComponent/smallLoader';
import { nameValidation } from '../../../constants/ValidationMessages';
interface RenameComponentProps {
    onCancel: () => void;
    nameValue: string;
    type: 'INTERVENTION' | 'DOMAIN' | 'LONG_TERM_GOAL' | 'SHORT_TERM_GOAL';
    id: number | any;
    interventionPlanId?: number | any;
    interventionPlanDomainId?: number | any;
    interventionPlanLongTermGoalId?: number | any;
    onRenameFromTree?: any;
}

const RenameComponent: React.FC<RenameComponentProps> = ({
    onCancel,
    nameValue,
    type,
    id,
    interventionPlanId,
    interventionPlanDomainId,
    interventionPlanLongTermGoalId,
    onRenameFromTree,
}) => {
    const dispatch = useDispatch<any>();
    const [errorView, setErrorView] = useState<boolean>(false);
    const { addToast } = useContext(ToastContext);
    const [newName, setNewName] = useState<string>(nameValue);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const showDuplicateErrorMsg = (typeName: any): any => {
        addToast({
            type: 'error',
            message: `Please provide an unique ${typeName} name`,
        });
    };

    const handleRename = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const data = {
                type,
                id,
                name: newName.trim(),
                interventionPlanId,
                interventionPlanDomainId,
                interventionPlanLongTermGoalId,
            };

            const response =
                await RenameEntitiesInterventionApi.RenameEntitiesIntervention(
                    data
                );
            let forMsg = '';
            if (!response?.data?.error) {
                switch (type) {
                    case 'INTERVENTION':
                        forMsg = 'Intervention';
                        break;

                    case 'DOMAIN':
                        forMsg = 'Domain';
                        break;
                    case 'LONG_TERM_GOAL':
                        forMsg = 'Long term goal';
                        break;
                    case 'SHORT_TERM_GOAL':
                        forMsg = 'Short term goal';
                        break;
                    default:
                        break;
                }
                setErrorMessage('');
                setErrorView(false);
                dispatch(
                    openNotification({
                        success: true,
                        title: `${forMsg} renamed successfully!`,
                        description: '',
                    })
                );
                onCancel();
            } else if (response?.data?.error) {
                if (onRenameFromTree) {
                    switch (type) {
                        case 'INTERVENTION':
                            forMsg = 'Intervention';
                            break;

                        case 'DOMAIN':
                            forMsg = 'Domain';
                            break;
                        case 'LONG_TERM_GOAL':
                            forMsg = 'Long term goal';
                            break;
                        case 'SHORT_TERM_GOAL':
                            forMsg = 'Short term goal';
                            break;
                        default:
                            break;
                    }
                    showDuplicateErrorMsg(forMsg);
                } else {
                    setErrorMessage(response?.data?.description);
                    setErrorView(true);
                }
            } else {
                if (onRenameFromTree) {
                    showDuplicateErrorMsg(type?.toLowerCase());
                } else {
                    setErrorView(true);
                    setErrorMessage('Please provide a unique name.');
                }
            }
        } catch (error) {
            setErrorView(true);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex p-0">
            <div className="inp flex flex-col p-0">
                <input
                    className={`${onRenameFromTree ? 'text-sm' : ''} border-b-2 p-0 bg-transparent focus:ring-0 active:ring-0 active:outline-0 focus:outline-0 w-full outline-0 border-transparent border-b-gray-700`}
                    type="text"
                    value={newName}
                    onChange={(e) => {
                        const value = e.target.value;
                        setNewName(value);
                        if (value.length > 150) {
                            setErrorView(true);
                            setErrorMessage(nameValidation);
                        } else {
                            setErrorView(false);
                            setErrorMessage('');
                        }
                    }}
                    placeholder={`Enter new ${type.toLowerCase()} name`}
                />

                {errorView ? (
                    <span className="text-red-700 text-xs">{errorMessage}</span>
                ) : (
                    ''
                )}
            </div>
            {isLoading ? (
                <SmallLoaderComponent />
            ) : (
                <>
                    <Button
                        data-testid="saveBtn"
                        type={''}
                        className={'ps-3 rounded-full'}
                        onClick={() => handleRename()}
                        disabled={errorMessage ? true : false}
                    >
                        <img
                            className={`${onRenameFromTree ? 'ml-2 h-[1rem]' : 'ml-5'}`}
                            src={save}
                            alt="save"
                        />
                    </Button>
                    <Button
                        data-testid="cancelBtn"
                        type={''}
                        className={'ps-3 rounded-full'}
                        onClick={() => onCancel()}
                    >
                        <img
                            className={`${onRenameFromTree ? 'h-[1.1rem] rounded-full hover:bg-white' : 'ml-2'}`}
                            src={cancel}
                            alt="cancel"
                        />
                    </Button>
                </>
            )}
        </div>
    );
};

export default RenameComponent;
