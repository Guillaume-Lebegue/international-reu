import { useContext } from 'react';
import { UserContext } from '../../contexts/User.context';
import Password from './Password';

export default function Login(): JSX.Element {
  const userContext = useContext(UserContext);

  const toAsk = !userContext.isAuth ?
    <Password />
    : '';

  return (
    <div className='d-flex flex-grow-1 flex-column justify-content-center'>
      <div className='d-flex justify-content-center'>
        <div className="border rounded bg-light p-4" style={{minWidth: '500px'}}>
          {toAsk}
        </div>
      </div>
    </div>
  );
}
