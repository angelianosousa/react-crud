import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckBox] = useState(false);
  let history = useHistory();
  const postData = () => {
    axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, {
      firstName,
      lastName,
      checkbox
    }).then(() => {
      history.push('/read');
    })
  };

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' className='form-control' onChange={(e) => setFirstName(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' className='form-control' onChange={(e) => setLastName(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckBox(!checkbox)}/>
        </Form.Field>
        <Button onClick={postData} type='submit' className='btn btn-primary'>Enviar</Button>
        <Link to='/read' className='btn btn-secondary'>Voltar</Link>
      </Form>
    </div>
  )
}
