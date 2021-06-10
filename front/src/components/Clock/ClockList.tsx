import { User } from '../../models/User.model';
import Clock from './Clock';

export interface Props {
  users: User[];
}

export default function ClockList({ users }: Props): JSX.Element {

  const clocks = users.map((user) => (
    <div className='m-4' key={user._id}>
      <Clock user={user} />
    </div>
  ));

  return (
    <div className="d-flex justify-content-center">
      {clocks}
    </div>
  );
}
