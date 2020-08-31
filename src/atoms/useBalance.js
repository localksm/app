import React, { useState } from 'react';
import { setBalance } from '../utils/hooks';

const UseBalance = (props) => {
  const [free, setFreeBalance] = useState(0);
  const [total, setTotalBalance] = useState(0);
  const [averageCost, setAverageCost] = useState(0);
  const [show, showBalance] = useState(false);

  const handleApplyRecursive = () => {
    setTimeout(() => {
      set();
    }, 2700);
  };

  async function set() {
    try {
      setBalance(
        props.state,
        setFreeBalance,
        setTotalBalance,
        setAverageCost,
        showBalance,
        handleApplyRecursive,
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  return { free, total, averageCost, show, handleApplyRecursive, set };
};

export default UseBalance;
