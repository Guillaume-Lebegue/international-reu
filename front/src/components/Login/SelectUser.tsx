import { useContext, useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { CheckCircle, Trash } from 'react-bootstrap-icons';

import './SelectUser.css';

import { UserContext } from '../../contexts/User.context';
import { User } from '../../models/User.model';

import { getAllUsers, deleteUser } from '../../services/Api.Service';

export interface Props {
  onCreate: () => void;
}

export default function SelectUser({ onCreate }: Props): JSX.Element {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      if (!userContext.isAuth || !userContext.token) return;
      try {
        const resAll = await getAllUsers(userContext.token);
        setUsers(resAll.data.users);
        setLoading(false);
      } catch (err) {
        console.error('Error loading all users: ', err);
        alert('Recuperation des utilisateurs impossible');
      }
    })();
  }, [userContext.isAuth, userContext.token]);

  const handleSelect = (user: User) => () => {
    userContext.setUser(user);
  };

  const handleDelete = (user: User) => async () => {
    if (!userContext.isAuth || !userContext.token || !user._id) return;
    try {
      await deleteUser(userContext.token, user._id);
      const newList = users.filter((u) => u._id != user._id);
      setUsers(newList);
    } catch (err) {
      console.error(`Error deleting user: ${user._id}: `, err);
      alert('suppression de l\'utilisateur impossible');
    }
  };

  const displayUsers = () => {
    if (loading)
      return (
        <div className=''>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          <span className="sr-only">Chargement...</span>
        </div>
      );
    if (!users.length)
      return (
        <div className='border rounded border-warning bg-white p-2'>
          Aucun utilisateur enregistré
        </div>
      );
    return users.map((user) => (
      <div className='row border rounded bg-white mt-2' key={user._id}>
        <Button
          variant="outline-success"
          className='col-1 border-left-only p-0 d-flex justify-content-center align-items-center'
          onClick={handleSelect(user)}
        >
          <CheckCircle />
        </Button>
        <div className='col p-2'>
          {user.name} {user.surname} - {user.email}
        </div>
        <Button
          variant="outline-danger"
          className='col-1 border-right-only p-0 d-flex justify-content-center align-items-center'
          onClick={handleDelete(user)}
        >
          <Trash />
        </Button>
      </div>
    ));
  };

  return (
    <div>
      <h4 className="mb-4">Choisis un utilisateur</h4>
      <div className=''>
        {displayUsers()}
      </div>
      <Button variant="outline-secondary" className="mt-4 float-right" onClick={onCreate}>Ajouter</Button>
    </div>
  );
}
