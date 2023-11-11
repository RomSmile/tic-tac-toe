import React, { FC, useEffect, useState, useMemo } from 'react';
import { Table, TableItem } from './styled';
import { IScore, ITicTacToeTable, ITimerInfo, IWinnerTypes } from './types';
import { createFilledTable, findWinner } from './helpers';
import TicTacToeHeader from '../TicTacToeHeader';
import Timer from '../Timer';
import OutputPlayersInfo from './Componets/OutputPlayersInfo';

const TicTacToeTable: FC<ITicTacToeTable> = ({ rowAndColumnAmount, setTableSize }) => {
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [table, setTable] = useState<string[][]>(createFilledTable(rowAndColumnAmount));
  const [winner, setWinner] = useState<IWinnerTypes>(null);
  const [winnerInfo, setWinnerInfo] = useState<number[][] | null>(null);
  const [score, setScore] = useState<IScore>({
    firstPlayer: 0,
    secondPlayer: 0,
  });
  const [timerInfo, setTimerInfo] = useState<ITimerInfo>({
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
    setTimerInfo({
      firstPlayer: 0,
      secondPlayer: 0,
    });
  };

  useEffect(() => {
    if (currentPlayer === 1) {
      newGame();
    }
  }, [rowAndColumnAmount]);

  const outputTable = useMemo(() => {
    return table.map((array, firstIndex) => {
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
    });
  }, [winnerInfo, winner, table, currentPlayer]);

  return (
    <>
      <OutputPlayersInfo winner={winner} setWinner={setWinner} timerInfo={timerInfo} />
      <TicTacToeHeader setTableSize={setTableSize} currentPlayer={currentPlayer} newGame={newGame} score={score} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {currentPlayer % 2 === 0 && winner === null && currentPlayer !== 1 && (
          <Timer
            playerType={2}
            currentPlayer={currentPlayer}
            setTimerInfo={setTimerInfo}
            timerInfo={timerInfo}
            winner={winner}
          />
        )}
        <Table rowAndColumnAmount={rowAndColumnAmount}>{outputTable}</Table>
        {currentPlayer % 2 === 1 && winner === null && currentPlayer !== 1 && (
          <Timer
            playerType={1}
            currentPlayer={currentPlayer}
            setTimerInfo={setTimerInfo}
            timerInfo={timerInfo}
            winner={winner}
          />
        )}
      </div>
    </>
  );
};

export default TicTacToeTable;
