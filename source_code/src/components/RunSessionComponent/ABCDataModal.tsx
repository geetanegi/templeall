import React, { useState, useEffect } from 'react';
import Modal, {
    ModalBody,
    ABCDataModalFooter,
    ModalHeader,
} from '../Generics/Modal';
import Button from '../Generics/Button';
import { Plus, X } from 'lucide-react';
import sessionApis from '../../api/services/session.service';
import Select from 'react-tailwindcss-select';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../redux/slice/Notification/notifications';
const RowFields = ({
    antecedentDropdown,
    behaviorDropdown,
    consequenceDropdown,
    handleChange,
    index,
    values,
}: {
    index: number;
    antecedentDropdown: any;
    behaviorDropdown: any;
    consequenceDropdown: any;
    handleChange: any;
    values: any;
}): React.JSX.Element => {
    const getAntecedentValue = (): any => {
        return values.antecedent
            ? {
                  label: values.antecedent_text,
                  value: values.antecedent,
              }
            : null;
    };
    const getBehaviorValue = (): any => {
        return values.behaviour
            ? {
                  label: values.behavior_text,
                  value: values.behaviour,
              }
            : null;
    };
    const getConsequenceValue = (): any => {
        return values.consequence
            ? {
                  label: values.consequence_text,
                  value: values.consequence,
              }
            : null;
    };
    const getNote = (): any => {
        return values?.note || '';
    };
    const [antecedent, setAntecedent] = useState(getAntecedentValue());
    const [behavior, setBehavior] = useState(getBehaviorValue());
    const [consequence, setConsequence] = useState(getConsequenceValue());
    const [antecedentOtherText, setAntecedentOtherText] = useState('');
    const [behaviorOtherText, setBehaviorOtherText] = useState('');
    const [consequenceOtherText, setConsequenceOtherText] = useState('');
    const [note, setNote] = useState(getNote());
    useEffect(() => {
        if (!antecedent && !behavior && !consequence && !note) {
            setAntecedent(getAntecedentValue());
            setAntecedentOtherText(getAntecedentValue()?.value || '');
            setBehavior(getBehaviorValue());
            setBehaviorOtherText(getBehaviorValue()?.value || '');
            setConsequence(getConsequenceValue());
            setConsequenceOtherText(getConsequenceValue()?.value || '');
            setNote(getNote());
        }
    }, [values]);
    const handleSelectChange = (value: any, type: any): void => {
        if (type === 'antecedent') {
            setAntecedent(value);
        }
        if (type === 'behavior') {
            setBehavior(value);
        }
        if (type === 'consequence') {
            setConsequence(value);
        }
        if (type === 'note') {
            setNote(value);
        }
        handleChange(value, type, index);
    };
    const handleOtherTextChange = (value: any, type: any): void => {
        let valueString = '';
        if (type === 'antecedent') {
            setAntecedentOtherText(value);
            valueString = antecedent.value;
        }
        if (type === 'behavior') {
            setBehaviorOtherText(value);
            valueString = behavior.value;
        }
        if (type === 'consequence') {
            setConsequenceOtherText(value);
            valueString = consequence.value;
        }
        handleChange(
            {
                label: value,
                value: valueString,
            },
            type,
            index
        );
    };
    return (
        <div className="flex p-4">
            <div className="w-1/4 mr-2 relative">
                {antecedent?.label !== 'Other' ? (
                    <Select
                        options={antecedentDropdown}
                        value={antecedent}
                        onChange={(value: any) =>
                            handleSelectChange(value, 'antecedent')
                        }
                        primaryColor="text-gray-600"
                        placeholder="Select/Type"
                    />
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Other text"
                            value={antecedentOtherText}
                            onChange={(e: any) =>
                                handleOtherTextChange(
                                    e.target.value,
                                    'antecedent'
                                )
                            }
                            className="text-sm rounded border border-gray-400 w-full"
                        />
                        <X
                            className="absolute top-[6px] right-[10px] cursor-pointer"
                            onClick={() => setAntecedent(null)}
                        />
                    </>
                )}
            </div>
            <div className="w-1/4 mr-2 relative">
                {behavior?.label !== 'Other' ? (
                    <Select
                        options={behaviorDropdown}
                        value={behavior}
                        onChange={(value: any) =>
                            handleSelectChange(value, 'behavior')
                        }
                        primaryColor="text-gray-600"
                        placeholder="Select/Type"
                    />
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Other text"
                            value={behaviorOtherText}
                            onChange={(e: any) =>
                                handleOtherTextChange(
                                    e.target.value,
                                    'behavior'
                                )
                            }
                            className="text-sm rounded border border-gray-400 w-full"
                        />
                        <X
                            className="absolute top-[6px] right-[10px] cursor-pointer"
                            onClick={() => setBehavior(null)}
                        />
                    </>
                )}
            </div>
            <div className="w-1/4 mr-2 relative">
                {consequence?.label !== 'Other' ? (
                    <Select
                        options={consequenceDropdown}
                        value={consequence}
                        onChange={(value: any) =>
                            handleSelectChange(value, 'consequence')
                        }
                        primaryColor="text-gray-600"
                        placeholder="Select/Type"
                    />
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="Other text"
                            value={consequenceOtherText}
                            onChange={(e: any) =>
                                handleOtherTextChange(
                                    e.target.value,
                                    'consequence'
                                )
                            }
                            className="text-sm rounded border border-gray-400 w-full"
                        />
                        <X
                            className="absolute top-[6px] right-[10px] cursor-pointer"
                            onClick={() => setConsequence(null)}
                        />
                    </>
                )}
            </div>
            <div className="w-1/4 mr-2">
                <input
                    type="text"
                    placeholder="type here..."
                    value={note}
                    onChange={(e: any) =>
                        handleSelectChange(e.target.value, 'note')
                    }
                    className="text-sm rounded border border-gray-400 w-full"
                />
            </div>
        </div>
    );
};
export default function ABCDataModal({
    hideModal,
}: {
    hideModal: any;
}): React.JSX.Element {
    const newRow = {
        note: '',
        behaviour: '',
        behavior_text: '',
        antecedent: '',
        antecedent_text: '',
        consequence: '',
        consequence_text: '',
    };
    const getInitialData = (count: number): any => {
        const result = [];
        for (let index = 0; index < count; index++) {
            result.push({ ...newRow });
        }
        return result;
    };
    const [rowsData, setRowsData] = useState(getInitialData(5));
    const [antecedentDropdown, setAntecedentDropdown] = useState<any>([]);
    const [behaviorDropdown, setBehaviorDropdown] = useState<any>([]);
    const [consequenceDropdown, setConsequenceDropdown] = useState<any>([]);
    const [fieldTouched, setFieldTouched] = useState(true);
    const [rowCount, setRowCount] = useState(5);
    const [saveLoading, setSaveLoading] = useState(false);
    const runSession = useSelector((state: any) => state.runSession.value);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<any>();
    const handleChange = (value: any, type: string, index: number): void => {
        setFieldTouched(false);
        if (type === 'note') {
            setRowsData((prev: any) => {
                prev[index].note = value;
                return prev;
            });
        }
        if (type === 'antecedent') {
            setRowsData((prev: any) => {
                prev[index].antecedent = value.value;
                prev[index].antecedent_text = value.label;
                return prev;
            });
        }
        if (type === 'behavior') {
            setRowsData((prev: any) => {
                prev[index].behaviour = value.value;
                prev[index].behavior_text = value.label;
                return prev;
            });
        }
        if (type === 'consequence') {
            setRowsData((prev: any) => {
                prev[index].consequence = value.value;
                prev[index].consequence_text = value.label;
                return prev;
            });
        }
    };
    useEffect(() => {
        (async () => {
            try {
                if (antecedentDropdown.length === 0) {
                    const response = await sessionApis.getAllABCDropdownData();
                    const dropdowns = response.data.data;
                    setAntecedentDropdown([
                        ...(dropdowns?.['ANTECEDENT'].map((item: any) => {
                            return {
                                label: item.name,
                                value: item.id,
                            };
                        }) || []),
                    ]);
                    setBehaviorDropdown([
                        ...(dropdowns?.['BEHAVIOR'].map((item: any) => {
                            return {
                                label: item.name,
                                value: item.id,
                            };
                        }) || []),
                    ]);
                    setConsequenceDropdown([
                        ...(dropdowns?.['CONSEQUENCE'].map((item: any) => {
                            return {
                                label: item.name,
                                value: item.id,
                            };
                        }) || []),
                    ]);
                }
            } catch (error) {}
        })();
    }, []);
    const formatRowValues = (rows: any): any => {
        return rows.map((row: any) => ({
            id: row.id,
            behaviour: row?.behavior?.id || '',
            behavior_text: row.behaviorText || '',
            antecedent: row?.antecedent?.id || '',
            antecedent_text: row.antecedentText || '',
            consequence: row?.consequence?.id,
            consequence_text: row.consequenceText,
            note: row.note,
        }));
    };
    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await sessionApis.getABCSessionData(
                runSession?.sessionData?.id
            );
            if (response?.data?.data) {
                if (response?.data?.data?.length >= 5) {
                    setRowsData(formatRowValues(response.data.data));
                    setRowCount(response.data.data.length);
                } else {
                    const additionalFields = getInitialData(
                        5 - response?.data?.data?.length
                    );
                    const responseData = response?.data?.data || [];
                    const combinedData = [
                        ...responseData,
                        ...(additionalFields || []),
                    ];
                    setRowsData(formatRowValues(combinedData));
                    setRowCount(5);
                }
            }
            setLoading(false);
        })();
    }, [0]);
    const getRows = (): any => {
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
            rows.push(
                <RowFields
                    index={i}
                    key={i}
                    antecedentDropdown={antecedentDropdown}
                    behaviorDropdown={behaviorDropdown}
                    consequenceDropdown={consequenceDropdown}
                    handleChange={handleChange}
                    values={rowsData[i]}
                />
            );
        }
        return rows;
    };
    const handleAddNew = (): void => {
        setRowCount(rowCount + 1);
        setRowsData((prev: any) => [...prev, { ...newRow }]);
    };
    const handleSubmit = async (): Promise<void> => {
        try {
            setSaveLoading(true);
            const requestData = rowsData
                .filter((item: any) => {
                    return (
                        item?.note ||
                        item?.consequence ||
                        item?.antecedent ||
                        item?.behaviour
                    );
                })
                .map((row: any) => {
                    return {
                        id: '',
                        ...row,
                        programBookId:
                            runSession?.sessionData?.programBookId?.id,
                        clientId: runSession?.sessionData?.clientId?.id,
                        sessionId: runSession?.sessionData?.id,
                    };
                });
            const response = await sessionApis.saveABCSessionData(requestData);
            setSaveLoading(false);
            if (response.status === 200) {
                dispatch(
                    openNotification({
                        success: true,
                        title: 'ABC Data added successfully.',
                        description: '',
                    })
                );
                hideModal();
            }
        } catch (error) {
            setSaveLoading(false);
        }
    };
    return (
        <Modal open={true} id={'abc-data-session-modal'} expandModal={false}>
            <ModalHeader
                title={'ABC Data'}
                onExpand={undefined}
                icon={false}
                actions={
                    <Button
                        type={'primary'}
                        onClick={handleAddNew}
                        className={'w-40 flex justify-center !py-2 mb-4'}
                    >
                        <Plus />
                        Add new
                    </Button>
                }
            />
            <ModalBody expandModal={false}>
                {loading ? (
                    <div className="w-[80vw] h-[500px] flex justify-center items-center">
                        Loading...
                    </div>
                ) : (
                    <div className="w-[80vw] h-[500px]">
                        <div className="flex bg-primary-400 text-black p-4">
                            <div className="w-1/4">Antecedent</div>
                            <div className="w-1/4">Behavior</div>
                            <div className="w-1/4">Consequence</div>
                            <div className="w-1/4">Note</div>
                        </div>
                        {getRows()}
                    </div>
                )}
            </ModalBody>
            <ABCDataModalFooter
                saveDisabled={fieldTouched}
                onClose={hideModal}
                handleSubmit={handleSubmit}
                saveLoading={saveLoading}
            />
        </Modal>
    );
}
