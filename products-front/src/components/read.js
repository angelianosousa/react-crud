import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router'

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  let history = useHistory();
  useEffect(() => {
    axios.get("https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData")
      .then(response => {
        setAPIData(response.data)
      })
  }, []);

  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('First Name', firstName);
    localStorage.setItem('Last Name', lastName);
    localStorage.setItem('Checkbox Value', checkbox);
  };

  const onDelete = (id) => {
    axios.delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`)
      .then(response => {
        history.push('/read');
      });
  };

  const getData = () => {
    axios.get("https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData")
      .then(responde => {
        setAPIData(getData.data);
      });
  };

  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Primeiro Nome</Table.HeaderCell>
            <Table.HeaderCell>Segundo Nome</Table.HeaderCell>
            <Table.HeaderCell>Premium Plan</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                <Link to='/update'>
                  <Table.Cell>
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                  </Table.Cell>
                </Link>
              </Table.Row>
          )})}
        </Table.Body>
      </Table>
    </div>
  )
}