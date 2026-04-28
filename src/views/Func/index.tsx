import { useEffect, useState } from 'react';
import { CurrentTime, getCurrentTime } from '@/utils/getTime';
import Hitokoto from '@/components/Hitokoto';

export default function Func() {
  const [currentTime, setCurrentTime] = useState<CurrentTime>(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row items-center h-41.25 justify-between w-full">
      <div className="flex-1 p-1 w-full h-full">
        <Hitokoto />
      </div>
      <div className="flex-1 p-1 max-w-[calc(50%-10px)] w-full h-full">
        <div className="w-full h-full cards p-5 flex flex-col items-center justify-between animate-fade">
          <div className="text-center text-[1.1rem] max-[1280px]:text-base max-[992px]:text-sm">
            <div className="text-ellipsis overflow-x-hidden whitespace-nowrap">
              <span>{currentTime.year}&nbsp;年&nbsp;</span>
              <span>{currentTime.month}&nbsp;月&nbsp;</span>
              <span>{currentTime.day}&nbsp;日&nbsp;</span>
              <span className="max-[910px]:hidden">{currentTime.weekday}</span>
            </div>
            <div className="mt-2.5 text-[3.25rem] tracking-[2px] max-[1280px]:text-[2.75rem] max-[992px]:text-[2.5rem]">
              <span> {currentTime.hour}:{currentTime.minute}:{currentTime.second}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}