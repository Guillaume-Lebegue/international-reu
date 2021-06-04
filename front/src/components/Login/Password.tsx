import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { UserContext } from '../../contexts/User.context';

import { login } from '../../services/Api.Service';

export default function Password(): JSX.Element {
  const userContext = useContext(UserContext);
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await login(password);
      userContext.login(token.data);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        setError('Mot de passe invalide');
        return;
      }
      console.error('error login: ', err);
      alert('Connexion impossible');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (!e.target.value)
      setError('Mot de passe requis');
    else  
      setError(undefined);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" value={password} onChange={handleChange} isInvalid={!!error} />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="float-right">
        {loading ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            <span className="sr-only">Chargement...</span>
          </>
        ) : (
          'Connexion'
        )}
      </Button>
    </Form>
  );
}
