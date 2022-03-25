import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
      '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '10ch',
      },
  },
}));

const dataAtualFormatada = (date) => {
  let data = new Date(date),
      dia  = data.getDate().toString().padStart(2, '0'),
      mes  = (data.getMonth()+1).toString().padStart(2, '0'),
      ano  = data.getFullYear();
  return dia+"/"+mes+"/"+ano;
}

export default function Read() {
  const classes = useStyles();
  const [APIData, setAPIData] = useState([]);
  let history = useHistory();
  
  useEffect(() => {
    axios.get("https://ror-challenge-backend.herokuapp.com/products")
      .then(response => {
        setAPIData(response.data)
      })
  }, []);

  const setData = (data) => {
    let { id, title, prod_type, description, width, height, price, rating } = data;
    localStorage.setItem('ID', id);
    localStorage.setItem('Title', title);
    localStorage.setItem('ProdType', prod_type);
    localStorage.setItem('Description', description);
    localStorage.setItem('Width', width);
    localStorage.setItem('Height', height);
    localStorage.setItem('Price', price);
    localStorage.setItem('Rating', rating);
    console.log(data);
  };

  const onDelete = (id) => {
    axios.delete(`https://ror-challenge-backend.herokuapp.com/products/${id}`)
      .then(() => {
        history.push('/read');
      });
  };

  return (
    <div>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Rating</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
            <TableCell><strong>Created</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {APIData.map((data) => {
            return (
              <TableRow>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.prod_type}</TableCell>
                <TableCell>{data.rating}</TableCell>
                <TableCell>R$ {data.price}</TableCell>
                <TableCell>{dataAtualFormatada(data.created_at)}</TableCell>
                <TableCell colSpan={2}>
                    <Link to='/update' onClick={() => setData(data)}>Edit</Link>&nbsp;&nbsp;
                    <Link to='/update' onClick={() => onDelete(data.id)}>Delete</Link>
                </TableCell>
              </TableRow>
          )})}
        </TableBody>
      </Table>
    </div>
  )
}