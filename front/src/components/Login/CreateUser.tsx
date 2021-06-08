import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import moment from 'moment-timezone';

import { createUser } from '../../services/Api.Service';
import { UserContext } from '../../contexts/User.context';

export interface Props {
  onClose: () => void;
}

const getAllTimezones = () =>
  moment.tz.names().map((timezone, index) => (
    <option value={timezone} key={index}>{timezone}</option>
  ));

export default function CreateUser({ onClose }: Props): JSX.Element {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [offset, setOffset] = useState<string>('');
  const [error, setError] = useState<{name: string | undefined; surname: string | undefined; email: string | undefined; offset: string | undefined}>({name: undefined, surname: undefined, email: undefined, offset: undefined});

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (validateName(name) || validateSurname(surname) || validateEmail(email) || validateTimezone(offset) || !userContext.isAuth || !userContext.token)
      return;
    
    setLoading(true);
    try {
      const numOffset = moment.tz.zone(offset)?.utcOffset(Date.now());
      if (!numOffset) {
        const newError = {...error};
        newError.offset = 'Invalid timezone';
        setError(newError);
        return;
      }

      await createUser(userContext.token, {
        name,
        surname,
        email,
        timeOffset: numOffset,
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
    setOffset(e.target.value);
    validateTimezone(e.target.value);
  };

  const validateTimezone = (timezone: string) => {
    const newError = {...error};
    if (!timezone)
      newError.offset = 'Décallage requis';
    else
      newError.offset = '';
    setError(newError);
    return !!newError.offset;
  };

  const isInvalid = !!error.name || !!error.surname || !!error.email || !!error.offset || !name || !surname || !email || !offset;

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
          <Form.Control as="select" value={offset} onChange={handleTimezone} isInvalid={!!error.offset}>
            <option value=''>Choisir une zone</option>
            {getAllTimezones()}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{error.offset}</Form.Control.Feedback>
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
