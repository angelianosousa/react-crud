import React, { useState, useEffect } from 'react';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import axios from 'axios';

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
    let { id, title, prod_type, filename, description, width, height, price, rating, created_at } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('Title', title);
    localStorage.setItem('ProdType', prod_type);
    localStorage.setItem('FileName', filename);
    localStorage.setItem('Description', description);
    localStorage.setItem('Width', width);
    localStorage.setItem('Height', height);
    localStorage.setItem('Price', price);
    localStorage.setItem('Rating', rating);
    localStorage.setItem('CreatedAt', created_at);
    console.log(data);
  };

  const onDelete = (id) => {
    axios.delete(`https://623a728bb5292b8bfcb55026.mockapi.io/Products/${id}`)
      .then(() => {
        history.push('/read');
      });
  };

  return (
    <div>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableCell><strong>Titulo</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Rating</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
            <TableCell><strong>Created</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableHead>

          <TableBody>
            {APIData.map((data) => {
              return (
                <TableRow>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.prod_type}</TableCell>
                  <TableCell>{data.rating}</TableCell>
                  <TableCell>R$ {data.price}</TableCell>
                  <TableCell>{data.created_at}</TableCell>
                  <TableCell>
                    <Link to='/update'>
                      <Button variant='outlined' onClick={() => setData(data)}>Edit</Button>&nbsp;&nbsp;
                      <Button variant='outlined' onClick={() => onDelete(data.id)}>Delete</Button>
                    </Link>
                  </TableCell>
                </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer><br />
    </div>
  )
}