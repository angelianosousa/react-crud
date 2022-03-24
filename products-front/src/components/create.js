import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
      '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Create() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [prod_type, setProdType] = useState('');
  const [filename, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);
  let history = useHistory();
  const postData = () => {
    axios.post(`https://623a728bb5292b8bfcb55026.mockapi.io/Products`, {
      title,
      prod_type,
      description,
      filename,
      width,
      height,
      price,
      rating
    }).then(() => {
      history.push('/read');
    })
  };

  return (
    <div>
      <form className={classes.root} noValidate autocomplete='off'>

        <TextField id="outlined-basic" variant='outlined' label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <TextField id="outlined-basic" variant='outlined' label="File Name" value={filename} onChange={(e) => setFileName(e.target.value)} />

        <TextField id="outlined-basic" variant='outlined' label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />

        <TextField id="outlined-basic" variant='outlined' label='Price' type='number' value={price} onChange={(e) => setPrice(e.target.value)} />

        <TextField id="outlined-basic" variant='outlined' label='Width' type='number' value={width} onChange={(e) => setWidth(e.target.value)} />

        <TextField id="outlined-basic" variant='outlined' label='Height' type='number' value={height} onChange={(e) => setHeight(e.target.value)} />
        
        <TextField id="outlined-basic" variant='outlined' label='Rating' type='number' value={rating} onChange={(e) => setRating(e.target.value)} />
        
        <br />
        <Link onClick={() => {postData()}} className="btn btn-primary">
          Salvar
        </Link>&nbsp;
        <Link to={"/read"} className="btn btn-secondary">
          Voltar
        </Link>
      </form>
    </div>
  );
}
