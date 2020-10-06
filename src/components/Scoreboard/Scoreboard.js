import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';
import styles from './Scoreboard.module.css';

const override = css`
  display: block;
  margin: 0 auto;
`;

const initialState = {
  balance: 0,
  last_bet: 0,
  rolls: [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
  uid: 0,
  win: 0,
};

axios.defaults.baseURL = 'https://game-server.kovalevskyi.net';

export default function Scoreboard() {
  const [state, setState] = useState(initialState);
  const [bets, setBets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData();
  }, []);

  const clickPlayHandler = () => {
    placeBet();
    setIsLoading(true);
  };

  const placeBet = async () => {
    const betUrl = `/spin?uid=103&bet=${state.last_bet}`;
    try {
      const response = await axios.get(betUrl);
      console.log('response-2: ', response.data);
      const win = response.data.hasOwnProperty('win') ? response.data.win : 0;
      setState(prev => ({ ...prev, ...response.data, win }));
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getData = async () => {
    const initUrl = `/init?uid=103`;
    try {
      const response = await axios.get(initUrl);
      console.log('response: ', response.data);
      setState(prev => ({ ...prev, ...response.data }));
      setBets(response.data.bets);
      // setState(prev => ({ ...prev, last_bet: response.data.last_bet, balance: response.data.balance }));
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsLoading(false);
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
      {isLoading && (
        <div className="sweet-loading" style={{ position: 'absolute' }}>
          <RingLoader
            css={override}
            size={220}
            color={'#ff6c00'}
            loading={isLoading}
          />
        </div>
      )}

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
