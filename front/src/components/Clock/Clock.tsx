import { useEffect, useState } from 'react';
import ReactClock from 'react-clock';
import 'react-clock/dist/Clock.css';

import { User } from '../../models/User.model';

export interface Props {
  user: User;
}

const getNowUTCDate = (): Date => {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
};

const addOffset = (date: Date, user: User): Date => {
  return new Date(date.getTime() - user.timeOffset * 60000);;
};

const displayOffset = (timezone: string, offset: number): JSX.Element => {
  const hour = Math.floor(offset / 60) * (offset < 0 ? -1 : 1);
  const minute = offset % 60 * (offset < 0 ? -1 : 1);
  return <div className='text-center'>{timezone} ({offset > 0 && '-'}{hour.toLocaleString(undefined, {minimumIntegerDigits: 2})}h{minute.toLocaleString(undefined, {minimumIntegerDigits: 2})})</div>;
};

export default function Clock({ user }: Props): JSX.Element {
  const [time, setTime] = useState<Date>(addOffset(getNowUTCDate(), user));

  useEffect(() => {
    const intervale = setInterval(() => {
      setTime(addOffset(getNowUTCDate(), user));
    }, 1000);

    return () => {
      clearInterval(intervale);
    };
  }, []);

  return (
    <div className="border rounded bg-light d-flex flex-column justify-content-center align-items-center" style={{ width: '300px', height: '300px'}}>
      <div className="text-center">{user.surname} {user.name}</div>
      {displayOffset(user.timezone, user.timeOffset)}
      <div className="d-flex justify-content-center">
        <ReactClock value={time} renderNumbers />
      </div>
    </div>
  );
}
