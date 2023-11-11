import { FC, useState } from 'react';
import { ITicTacToeHeader } from './types';
import { CurrentMoveText, GameHeader, GameTitle } from './styled';
import { InputNumber, Button } from 'antd';
import { FormWrapper, Score } from '../TicTacToeTable/styled';

const TicTacToeHeader: FC<ITicTacToeHeader> = ({ setTableSize, currentPlayer, newGame, score }) => {
  const [holdTableSize, setHoldTableSize] = useState<number>(3);
  const changeTypeOfTable = (value: number | null) => {
    setHoldTableSize(value as number);
  };

  const startGame = () => {
    newGame();
    setTableSize(holdTableSize);
  };

  return (
    <GameHeader>
      <GameTitle>Tic-tac-toe</GameTitle>
      <CurrentMoveText>Move: Player {currentPlayer % 2 === 0 ? '2 (0)' : '1 (X)'}</CurrentMoveText>
      <FormWrapper>
        <InputNumber disabled={currentPlayer > 1} min={3} max={9} defaultValue={3} onChange={changeTypeOfTable} />
        <Button onClick={startGame}>New game</Button>
      </FormWrapper>
      <Score>
        <span>1-t Player: {score.firstPlayer}</span>
        <span>2-nd Player: {score.secondPlayer}</span>
      </Score>
    </GameHeader>
  );
};

export default TicTacToeHeader;
