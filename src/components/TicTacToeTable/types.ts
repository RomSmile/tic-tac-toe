import React from 'react';

export type IWinnerTypes = 0 | 1 | 2 | null;
export interface ITicTacToeTable {
  rowAndColumnAmount: number;
  setTableSize: React.Dispatch<React.SetStateAction<number>>;
}

export type ITicTacToeTableInfo = Omit<ITicTacToeTable, 'setTableSize'>;

export interface ITableItem extends ITicTacToeTableInfo {
  isWin?: boolean;
}

export interface IFindWinnerInfo {
  winner: IWinnerTypes;
  coordinates: number[][] | null;
}

export interface IScore {
  firstPlayer: number;
  secondPlayer: number;
}
