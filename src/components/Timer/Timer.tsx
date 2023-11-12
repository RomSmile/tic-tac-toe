import { FC, useEffect } from 'react';
import { ITimer } from './types';
import { TimerContainer } from './styled';

const Timer: FC<ITimer> = ({ playerType, timerInfo, setTimerInfo, currentPlayer, winner }) => {
  useEffect(() => {
    if (currentPlayer === 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimerInfo((currentTimer) => ({
        ...currentTimer,
        ...(playerType === 1
          ? { firstPlayer: currentTimer.firstPlayer + 0.16 }
          : { secondPlayer: currentTimer.secondPlayer + 0.16 }),
      }));
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [winner, currentPlayer]);
  return <TimerContainer>{timerInfo[playerType === 1 ? 'firstPlayer' : 'secondPlayer'].toFixed(2)}</TimerContainer>;
};

export default Timer;
