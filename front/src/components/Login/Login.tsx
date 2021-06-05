import { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import { UserContext } from '../../contexts/User.context';

import Password from './Password';
import SelectUser from './SelectUser';
import CreateUser from './CreateUser';

export default function Login(): JSX.Element {
  const userContext = useContext(UserContext);
  const [creating, setCreating] = useState<boolean>(false);

  const handleOpenCreate = () => {
    setCreating(true);
  };

  const handleCloseCreate = () => {
    setCreating(false);
  };

  const getToAsk = () => {
    if (!userContext.isAuth) return <Password />;
    if (creating) return <CreateUser onClose={handleCloseCreate} />;
    if (userContext.loggedUser) return <Redirect to="/" />;
    return <SelectUser onCreate={handleOpenCreate} />;
  };

  return (
    <div className='d-flex flex-grow-1 flex-column justify-content-center'>
      <div className='d-flex justify-content-center'>
        <div className="border rounded bg-light p-4" style={{minWidth: '500px'}}>
          {getToAsk()}
        </div>
      </div>
    </div>
  );
}
