import React, { ChangeEvent, useContext, useState } from 'react';
import './StrategyChilds.css';
import { Advertisement, StrategyChild, StrategyContext } from '../StrategyContext/StrategyContex';

function StrategyChilds() {
    const { state, dispatch } = useContext(StrategyContext);
    const [selectChild, setSelectChild] = useState<StrategyChild>(state.childs[0]);
    const [checkAll, setCheckAll] = useState(false);

    //add strategy
    const onClickAdd = () => {
        dispatch({ type: 'add-child' });
    }
    // edit stratege name, active
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const edit: StrategyChild = {
            ...selectChild, nameChild: e.target.value
        }
        setSelectChild(edit);
        dispatch({ type: 'update-child', child: edit })
    }

    const onChangeActive = (e: ChangeEvent<HTMLInputElement>) => {
        const edit: StrategyChild = {
            ...selectChild, active: e.target.checked
        }
        setSelectChild(edit);
        dispatch({ type: 'update-child', child: edit })
    }

    //add, edit, delete advertisment
    const onChangeNameAdv = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const edit: StrategyChild = {
            ...selectChild, advertisement: selectChild.advertisement.map(val => {
                if (val.id === id) return { ...val, nameAdvertisement: e.target.value }
                else return val
            })
        }
        setSelectChild(edit);
        dispatch({ type: 'update-child', child: edit })
    }

    const onChangeCountAdv = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const edit: StrategyChild = {
            ...selectChild, advertisement: selectChild.advertisement.map(val => {
                if (val.id === id) return { ...val, count: parseInt(e.target.value) }
                else return val
            })
        }
        setSelectChild(edit);
        dispatch({ type: 'update-child', child: edit })
    }

    const onDeleteAdv = (id: number) => {
        const edit: StrategyChild = {
            ...selectChild, advertisement: selectChild.advertisement.filter(val => val.id !== id)
        }
        setSelectChild(edit);
        dispatch({ type: 'update-child', child: edit })
    }

    const onAddAdv = () => {
        const num = selectChild.advertisement.length > 0 ? Math.max(...selectChild.advertisement.map(val => val.id)) + 1 : 1;
        const advNew: Advertisement = {
            id: num,
            count: 0,
            nameAdvertisement: `Quảng cáo ${num}`
        }
        selectChild.advertisement.push(advNew);
        const edit: StrategyChild = {
            ...selectChild
        }
        setSelectChild(edit);
        dispatch({ type: 'update-child', child: edit })
    }

    // Check or uncheck all
    const onChangeCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckAll(e.target.checked);
        const arr = selectChild.advertisement.map(val => {
            return {...val, check: e.target.checked}
        })
        const edit: StrategyChild = {
            ...selectChild, advertisement: arr
        }
        setSelectChild(edit);
    }

    // delete checks
    const onDeleteAll = () => {
        const arr = selectChild.advertisement.filter(val => val.check !== true);
        const edit: StrategyChild = {
            ...selectChild, advertisement: arr
        }
        setSelectChild(edit);
        dispatch({ type: 'update-child', child: edit })
    }

    return (
        <div style={{ padding: 16 }}>
            <div style={{ display: 'flex', marginRight: 16, overflow: 'auto' }}>
                <button className='btnAdd'><span className='spanStyle' onClick={onClickAdd}>
                    <svg className="svgStyle" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                </span></button>
                {state.childs.map(child => {
                    return (
                        <div className={`strategyItem ${child.id === selectChild.id ? 'strategyItemSelected' : ''}`} key={child.id} onClick={() => setSelectChild(child)}>
                            <div style={{ padding: '8px 8px 4px' }}>
                                <span className='childName'>
                                    {child.nameChild}
                                    <svg className={`svgIconActive ${child.active ? '' : 'svgIconDeactive'}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                                </span>
                            </div>
                            <div className='childName' style={{ padding: '0px 8px', textAlign: 'center' }}>
                                {child.advertisement.length}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 25 }}>
                <div style={{ flexBasis: '60%' }}>
                    <p>Tên chiến dịch con *</p>
                    <input style={{ width: '100%' }} type='text' value={selectChild.nameChild} onChange={onChangeName} />
                </div>
                <div style={{ display: 'flex', flexBasis: '40%', alignItems: 'center' }}>
                    <input type="checkbox" id='active' name='active' checked={selectChild.active} onChange={onChangeActive} />
                    <label style={{ marginLeft: 8 }}>Đang hoạt động</label>
                </div>
            </div>
            <label className='text-h6'>DANH SÁCH QUẢNG CÁO</label>
            <table className='table'>
                <thead>
                    <tr style={{ height: '57px' }}>
                        <th style={{ width: '60px' }}>
                            <input type='checkbox' checked={checkAll} onChange={onChangeCheckAll} />
                        </th>
                        {checkAll &&
                            <th style={{ cursor: 'pointer', width: '90%' }}>
                                <div style={{ cursor: 'pointer', textAlign: 'left' }} onClick={onDeleteAll} >
                                    <svg style={{ marginLeft: 16 }} className="svgIconDelete" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                </div>
                            </th>
                        }
                        {!checkAll &&
                            <>
                                <th className='text-table' style={{ textAlign: 'left', padding: 16 }}>Tên quảng cáo*</th>
                                <th className='text-table' style={{ width: '38%', textAlign: 'left', padding: 16 }}>Số lượng*</th>
                            </>
                        }
                        <th style={{ minWidth: '120px' }}>
                            <div className='btnAdv' style={{ cursor: 'pointer' }} onClick={onAddAdv}>
                                <span className='text-table'>
                                    <svg className="svgIconAdd" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                                    Thêm
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {selectChild.advertisement.length > 0 &&
                        selectChild.advertisement.map(val => {
                            return (
                                <tr key={val.id} style={{ height: '57px' }}>
                                    <th style={{ width: '60px' }}>
                                        <input type='checkbox' checked={val.check ?? false} onChange={(e: ChangeEvent<HTMLInputElement>) => val.check = e.target.checked} />
                                    </th>
                                    <th className='text-table' style={{ textAlign: 'left', padding: 16 }}>
                                        <input style={{ width: '100%' }} type='text' value={val.nameAdvertisement} onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeNameAdv(e, val.id)} />
                                    </th>
                                    <th className='text-table' style={{ width: '38%', textAlign: 'left', padding: 16 }}>
                                        <input style={{ width: '100%' }} type='number' value={val.count} onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeCountAdv(e, val.id)} />
                                    </th>
                                    <th style={{ width: '120px' }}>
                                        <div style={{ cursor: 'pointer' }} onClick={() => onDeleteAdv(val.id)}>
                                            <svg className="svgIconDelete" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                                        </div>
                                    </th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default StrategyChilds;