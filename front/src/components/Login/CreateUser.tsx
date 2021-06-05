import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

import rawTimezones from '../../timezone.json';

import { createUser } from '../../services/Api.Service';
import { UserContext } from '../../contexts/User.context';

const timezones = (rawTimezones as Timezone[]).sort((a, b) => a.offset - b.offset);

interface Timezone {
  value: string;
  abbr: string;
  offset: number;
  isdst: boolean;
  text: string;
  utc: string[];
};

export interface Props {
  onClose: () => void;
}

const getAllTimezones = () =>
  (timezones as Timezone[]).map((timezone, index) => (
    <option value={timezone.offset} key={index}>{timezone.text}</option>
  ));

export default function CreateUser({ onClose }: Props): JSX.Element {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [error, setError] = useState<{name: string | undefined; surname: string | undefined; email: string | undefined}>({name: undefined, surname: undefined, email: undefined});

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (validateName(name) || validateSurname(surname) || validateEmail(email) || !userContext.isAuth || !userContext.token)
      return;
    
    setLoading(true);
    try {
      await createUser(userContext.token, {
        name,
        surname,
        email,
        timeOffset: offset
      });
      onClose();
    } catch (err) {
      setLoading(false);
      console.log(err.response);
      if (err.response && err.response.status === 400 && err.response.data === 'Email already in use') {
        const newError = {...error};
        newError.email = 'Email deja utilisé';
        setError(newError);
        return;
      }
      console.error('Error creating user: ', err);
      alert('Ajout impossible');
    }
  };
  
  const handleName = (e:ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const validateName = (name: string): boolean => {
    const newError = {...error};
    if (!name)
      newError.name = 'Nom requis';
    else
      newError.name = '';
    setError(newError);
    return !!newError.name;
  };
  
  const handleSurname = (e:ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
    validateSurname(e.target.value);
  };

  const validateSurname = (surname: string): boolean => {
    const newError = {...error};
    if (!surname)
      newError.surname = 'Prenom requis';
    else
      newError.surname = '';
    setError(newError);
    return !!newError.surname;
  };
  
  const handleEmail = (e:ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    const newError = {...error};
    if (!email)
      newError.email = 'Email requise';
    else
      newError.email = '';
    setError(newError);
    return !!newError.email;
  };
  
  const handleTimezone = (e: ChangeEvent<HTMLInputElement>) => {
    setOffset(Number.parseFloat(e.target.value));
  };

  const isInvalid = !!error?.name || !!error?.surname || !!error?.email || !name || !surname || !email;

  return (
    <div>
      <h4>Ajoutez un utilisateur</h4>
      <Form>
        <Form.Group>
          <Form.Label>Prenom: </Form.Label>
          <Form.Control type="text" value={surname} onChange={handleSurname} isInvalid={!!error.surname} />
          <Form.Control.Feedback type="invalid">{error.surname}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Nom: </Form.Label>
          <Form.Control type="text" value={name} onChange={handleName} isInvalid={!!error.name} />
          <Form.Control.Feedback type="invalid">{error.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control type="text" value={email} onChange={handleEmail} isInvalid={!!error.email} />
          <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Décalage horraire: </Form.Label>
          <Form.Control as="select" value={offset} onChange={handleTimezone}>
            {getAllTimezones()}
          </Form.Control>
        </Form.Group>
        <div className='float-right'>
          <Button
            variant="success"
            className="mr-2"
            onClick={handleCreate}
            disabled={isInvalid}
            type="submit"
          >
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="sr-only">Chargement...</span>
              </>
            ) : (
              'Ajouter'
            )}
          </Button>
          <Button type="button" variant="outline-danger" onClick={onClose}>Annuler</Button>
        </div>
      </Form>
    </div>
  );
}
