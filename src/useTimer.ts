import React from 'react';
import { UseTimerProps } from './types';

const useTimerConfig = {
  step: 1,
  interval: 100,
};

type TimerState = {
  timer: number;
  startTime: number;
  ellapsedTime: number;
  status: 'RUNNING' | 'IDLE';
};

const initialTimerState: TimerState = {
  timer: 0,
  startTime: 0,
  ellapsedTime: 0,
  status: 'IDLE',
};

export const useTimer = (props?: UseTimerProps) => {
  const [timer, setTimer] = React.useState<TimerState>(initialTimerState);

  const handleStopTimer = () => {
    setTimer(initialTimerState);
  };

  const start = React.useCallback(
    (initialTime: number) => {
      if (initialTime && timer.status === 'IDLE') {
        const startTime = Date.now();
        setTimer({
          startTime,
          ellapsedTime: 0,
          timer: initialTime,
          status: 'RUNNING',
        });
      }
    },
    [timer.status]
  );

  React.useEffect(() => {
    if (timer.status === 'RUNNING')
      props?.onTimeTick?.(timer.timer - timer.ellapsedTime);

    if (timer.ellapsedTime >= timer.timer && timer.status === 'RUNNING') {
      handleStopTimer();
      props?.onTimeEnd?.();
    }
  }, [timer]);

  React.useEffect(() => {
    let interval: number | null = null;

    if (timer.status === 'RUNNING') {
      const { startTime, ...otherProps } = timer;
      // @ts-ignore
      interval = setInterval(() => {
        setTimer({
          ...otherProps,
          startTime,
          ellapsedTime: Date.now() - startTime,
        });
      }, useTimerConfig.interval);
    } else if (timer.status === 'IDLE' && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  return { start, stop: handleStopTimer };
};
