import { useContext } from 'react';
import { UserContext } from '../../contexts/User.context';
import IndiClock from '../Clock/Clock';

export default function Home(): JSX.Element {
  const userContext = useContext(UserContext);

  if (!userContext.isAuth || !userContext.loggedUser) return <div className=''></div>;

  return (
    <div>
      Home
      <IndiClock user={userContext.loggedUser} />
    </div>
  );
}
