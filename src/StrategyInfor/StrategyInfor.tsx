import React, { ChangeEvent, useContext } from 'react';
import './StrategyInfor.css';
import { StrategyContext } from '../StrategyContext/StrategyContex';

function StrategyInfor() {
    const { state, dispatch } = useContext(StrategyContext);

    // change name or description
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'name', name: e.target.value })
    }
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'description', description: e.target.value })
    }

    return (
        <div className='strategyInfor'>
            <p>Tên chiến dịch *</p>
            <input className={`${!state.name ? 'errorInput' : ''}`} style={{width: '100%'}} type='text' value={state.name} onChange={onChangeName} />
            {!state.name && 
            <p className='textError'>Vui lòng nhập tên chiến dịch</p>}
            <p>Mô tả</p>
            <input style={{width: '100%'}} type='text' value={state.description} onChange={onChangeDescription}></input>
        </div>
    );
}

export default StrategyInfor;