import React, { FC, useEffect, useState } from 'react';
import { ModalBlock, Table, TableItem } from './styled';
import { IScore, ITicTacToeTable, IWinnerTypes } from './types';
import { createFilledTable, findWinner } from './helpers';
import TicTacToeHeader from '../TicTacToeHeader';

const TicTacToeTable: FC<ITicTacToeTable> = ({ rowAndColumnAmount, setTableSize }) => {
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [table, setTable] = useState<string[][]>(createFilledTable(rowAndColumnAmount));
  const [winner, setWinner] = useState<IWinnerTypes>(null);
  const [winnerInfo, setWinnerInfo] = useState<number[][] | null>(null);
  const [score, setScore] = useState<IScore>({
    firstPlayer: 0,
    secondPlayer: 0,
  });

  const makeMove = (indexOfArray: number, indexOfItem: number) => {
    if (table[indexOfArray][indexOfItem] !== ' ' || winner !== null || winnerInfo?.length) {
      return;
    }

    const newTable = [...table];

    if (currentPlayer % 2 === 0) {
      newTable[indexOfArray][indexOfItem] = '0';
    } else {
      newTable[indexOfArray][indexOfItem] = 'x';
    }

    const whoIsWinner = findWinner(newTable);

    setTable(newTable);
    if (whoIsWinner.winner === null) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      if (whoIsWinner.winner === 1) {
        setScore((state) => ({
          ...state,
          firstPlayer: state.firstPlayer + 1,
        }));
      } else if (whoIsWinner.winner === 2) {
        setScore((state) => ({
          ...state,
          secondPlayer: state.secondPlayer + 1,
        }));
      }
      setCurrentPlayer(1);
      setWinner(whoIsWinner.winner);
      setWinnerInfo(whoIsWinner.coordinates);
    }
  };

  const newGame = () => {
    setTable(createFilledTable(rowAndColumnAmount));
    setWinner(null);
    setCurrentPlayer(1);
    setWinnerInfo(null);
  };

  useEffect(() => {
    if (currentPlayer === 1) {
      newGame();
    }
  }, [rowAndColumnAmount]);

  const writeModalInfo = () => {
    return winner === 0 ? "Draw!!! Lest's try again" : winner === 1 ? 'Player 1 winner!!!' : 'Player 2 winner';
  };

  return (
    <>
      <ModalBlock title="" open={winner !== null} onOk={() => setWinner(null)} onCancel={() => setWinner(null)}>
        <p>{writeModalInfo()}</p>
      </ModalBlock>
      <TicTacToeHeader setTableSize={setTableSize} currentPlayer={currentPlayer} newGame={newGame} score={score} />
      <Table rowAndColumnAmount={rowAndColumnAmount}>
        {table.map((array, firstIndex) => {
          return array.map((value, secondIndex) => {
            const isWinCoordinate =
              winnerInfo !== null && winnerInfo.some((item) => item[0] === firstIndex && item[1] === secondIndex);
            return (
              <TableItem
                key={`${firstIndex}_${secondIndex}`}
                rowAndColumnAmount={rowAndColumnAmount}
                onClick={() => {
                  makeMove(firstIndex, secondIndex);
                }}
                isWin={isWinCoordinate}
              >
                {value}
              </TableItem>
            );
          });
        })}
      </Table>
    </>
  );
};

export default TicTacToeTable;
