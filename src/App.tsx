import React, { useContext, useState } from 'react';
import './App.css';
import StrategyInfor from './StrategyInfor/StrategyInfor';
import StrategyChilds from './StrategyChilds/StrategyChilds';
import { StrategyContext } from './StrategyContext/StrategyContex';

function App() {
  const { state } = useContext(StrategyContext);
  const [tab, setTab] = useState(0);

  const onsubmit = () => {
    let check = true;
    if (!state.name) {
      window.alert('Vui lòng điền đúng và đầy đủ thông tin');
      check = false;
      return;
    }
    state.childs.every(val => {
      if (!val.nameChild) {
        window.alert('Vui lòng điền đúng và đầy đủ thông tin');
        check = false;
        return;
      }
      val.advertisement.every(adv => {
        if (!adv.nameAdvertisement || isNaN(adv.count)) {
          window.alert('Vui lòng điền đúng và đầy đủ thông tin');
          check = false;
          return;
        }
      })
    })
    if (check) window.alert(`Thêm thành công chiến dịch ${JSON.stringify(state)}`);
  }

  return (
    <>
      <div className="header">
        <button className='btnSubmit' onClick={onsubmit}>Submit</button>
      </div>
      <div className='content'>
        <div className='tabs'>
          <div className='tabHeader'>
            <button className={`${tab === 0 ? 'tabActive' : 'tabNormal'}`} onClick={() => setTab(0)}>Thông tin</button>
            <button className={`${tab === 1 ? 'tabActive' : 'tabNormal'}`} onClick={() => setTab(1)}>Chiến dịch con</button>
          </div>
          {tab === 0 && <StrategyInfor />}
          {tab === 1 && <StrategyChilds />}
        </div>
      </div>
    </>

  );
}

export default App;
