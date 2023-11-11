import React from 'react';
import { ITimerInfo, IWinnerTypes } from '../TicTacToeTable/types';

export interface ITimer {
  playerType: 1 | 2;
  timerInfo: ITimerInfo;
  setTimerInfo: React.Dispatch<React.SetStateAction<ITimerInfo>>;
  currentPlayer: number;
  winner: IWinnerTypes;
}
