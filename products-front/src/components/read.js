import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      },
  },
}));

export default function Read() {
  const classes = useStyles();
  const [APIData, setAPIData] = useState([]);
  let history = useHistory();
  
  useEffect(() => {
    axios.get("https://623a728bb5292b8bfcb55026.mockapi.io/Products")
      .then(response => {
        setAPIData(response.data)
      })
  }, []);

  const setData = (data) => {
    let { id, title, prod_type, filename, description, width, height, price, rating } = data;
    localStorage.setItem('ID', id);
    localStorage.getItem('Title', title);
    localStorage.getItem('ProdType', prod_type);
    localStorage.getItem('FileName', filename);
    localStorage.getItem('Description', description);
    localStorage.getItem('Width', width);
    localStorage.getItem('Height', height);
    localStorage.getItem('Price', price);
    localStorage.getItem('Rating', rating);
  };

  const onDelete = (id) => {
    axios.delete(`https://623a728bb5292b8bfcb55026.mockapi.io/Products/${id}`)
      .then(() => {
        history.push('/read');
      });
  };

  const getData = () => {
    axios.get("https://623a728bb5292b8bfcb55026.mockapi.io/Products")
      .then(() => {
        setAPIData(getData.data);
      });
  };

  return (
    <div>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
              <TableCell>Nome do arquivo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {APIData.map((data) => {
              return (
                <TableRow>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.filename}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <Link to='/update'>
                    <TableCell>
                      <Button variant='contained' color='dark' onClick={() => setData(data)}>Update</Button>
                    </TableCell>
                    <TableCell>
                      <Button variant='contained' color='danger' onClick={() => onDelete(data.id)}>Delete</Button>
                    </TableCell>
                  </Link>
                </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}