import React, { FC } from 'react';
import { ModalBlock } from '../../styled';
import { IOutputPlayersInfo } from './types';

const OutputPlayersInfo: FC<IOutputPlayersInfo> = ({ winner, timerInfo, setWinner }) => {
  const writeModalInfo = () => {
    return (
      <>
        <p>{winner === 0 ? "Draw!!! Lest's try again" : winner === 1 ? 'Player 1 winner!!!' : 'Player 2 winner'}</p>
        {winner === 0
          ? `You lost ${Math.round(timerInfo.firstPlayer + timerInfo.secondPlayer)}`
          : winner === 1
          ? `Player 1 won after ${Math.round(timerInfo.firstPlayer)} seconds`
          : `Player 2 won after ${Math.round(timerInfo.secondPlayer)} seconds`}
      </>
    );
  };
  return (
    <ModalBlock title="" open={winner !== null} onOk={() => setWinner(null)} onCancel={() => setWinner(null)}>
      {writeModalInfo()}
    </ModalBlock>
  );
};

export default OutputPlayersInfo;
