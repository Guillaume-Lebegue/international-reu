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

const displayOffset = (offset: number): JSX.Element => {
  const hour = Math.floor(offset / 60);
  const minute = offset % 60;
  if (offset > 0) return <div className='text-center'>-{hour.toLocaleString(undefined, {minimumIntegerDigits: 2})}h{minute.toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>;
  else return <div className='text-center'>{hour.toLocaleString(undefined, {minimumIntegerDigits: 2})}h{minute.toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>;
};

export default function Clock({ user }: Props): JSX.Element {
  const [time, setTime] = useState<Date>(addOffset(getNowUTCDate(), user));

  console.log('user: ', user);

  useEffect(() => {
    const intervale = setInterval(() => {
      setTime(addOffset(getNowUTCDate(), user));
    }, 1000);

    return () => {
      clearInterval(intervale);
    };
  }, []);

  return (
    <div>
      <div className="text-center">{user.surname} {user.name}</div>
      {displayOffset(user.timeOffset)}
      <div className="d-flex justify-content-center">
        <ReactClock value={time} renderNumbers />
      </div>
    </div>
  );
}
