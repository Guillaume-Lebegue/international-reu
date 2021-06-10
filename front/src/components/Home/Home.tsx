import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User.context';
import { User } from '../../models/User.model';
import { getAllUsers } from '../../services/Api.Service';
import ClockList from '../Clock/ClockList';

export default function Home(): JSX.Element {
  const userContext = useContext(UserContext);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {    
    (async () => {
      try {
        if (!userContext.isAuth || !userContext.token) return;

        const res = await getAllUsers(userContext.token);
        setUsers(res.data.users);
      } catch (err) {
        console.error('Error getting all users: ', err);
        alert('Récuperation des utilisateurs impossible');
      }
    })();
  }, [userContext]);

  return (
    <div>
      <div className='' style={{ height: '10vh' }}></div>
      <ClockList users={users} />
    </div>
  );
}
