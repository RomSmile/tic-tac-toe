import React from 'react';
import { IScore } from '../TicTacToeTable/types';

export interface ITicTacToeHeader {
  setTableSize: React.Dispatch<React.SetStateAction<number>>;
  currentPlayer: number;
  newGame: () => void;
  score: IScore;
}
