import { ITimerInfo, IWinnerTypes } from '../../types';
import React from 'react';

export interface IOutputPlayersInfo {
  winner: IWinnerTypes;
  setWinner: React.Dispatch<React.SetStateAction<IWinnerTypes>>;
  timerInfo: ITimerInfo;
}
