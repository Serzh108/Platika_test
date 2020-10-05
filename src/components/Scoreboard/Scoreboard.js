import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './Scoreboard.module.css';

const initialState = {
  balance: 0,
  // bets: [],
  last_bet: 0,
  rolls: [[0], [0], [0]],
  uid: 0,
  win: 0,
};

export default function Scoreboard() {
  const [state, setState] = useState(initialState);
  const [bets, setBets] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const clickPlayHandler = () => {
    console.log('Buttom clicked!!!');
    placeBet();
  };

  const placeBet = async () => {
    const betUrl = `https://game-server.kovalevskyi.net/spin?uid=102&bet=${state.last_bet}`;
    try {
      const response = await Axios.get(betUrl);
      console.log('response-2: ', response.data);
      const win = response.data.hasOwnProperty('win') ? response.data.win : 0;
      setState(prev => ({ ...prev, ...response.data, win }));
      // setState(prev => ({ ...prev, last_bet: response.data.last_bet, balance: response.data.balance }));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const getData = async () => {
    const initUrl = 'https://game-server.kovalevskyi.net/init?uid=102';
    try {
      const response = await Axios.get(initUrl);
      console.log('response: ', response.data);
      setState(prev => ({ ...prev, ...response.data }));
      setBets(response.data.bets);
      // setState(prev => ({ ...prev, last_bet: response.data.last_bet, balance: response.data.balance }));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const clickBetsHandler = e => {
    if (e.target.nodeName !== 'SPAN') return;
    if (!e.target.id) return;
    const id = Number(e.target.id);
    setState(prev => ({ ...prev, last_bet: bets[id] }));
  };

  return (
    <>
      <div className={styles.container}>
        <p>win: {state.win}</p>
        <p>balance: {state.balance}</p>
      </div>

      <div className={styles.container}>
        {state.rolls.map((item, idx) => (
          <div key={idx} className={styles.scoreItem}>
            {item.map((res, indx) => (
              <div key={indx + 3} className={styles.itemDigit}>
                {res}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.container}>
        <p>bet: {state.last_bet}</p>
        <div onClick={clickBetsHandler}>
          {bets.map((bet, index) => (
            <span id={index} className={styles.bets} key={index}>
              {bet}
            </span>
          ))}
        </div>
      </div>

      <button className={styles.playBtn} onClick={clickPlayHandler}>
        play
      </button>
    </>
  );
}
