import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { useHistory } from 'react-router';
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

export default function Update() {
    const classes = useStyles();
    let history = useHistory();
    const [id, setID] = useState(null);
    const [title, setTitle] = useState('');
    const [prod_type, setProdType] = useState('');
    const [filename, setFileName] = useState('');
    const [description, setDescription] = useState('');
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [price, setPrice] = useState(null);
    const [rating, setRating] = useState(null);

    const handleChange = (event) => {
        setProdType(event.target.value);
    };

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setTitle(localStorage.getItem('Title'));
        setFileName(localStorage.getItem('FileName'));
        // setProdType(localStorage.getItem('ProdType'));
        setDescription(localStorage.getItem('Description'));
        setWidth(localStorage.getItem('Width'));
        setHeight(localStorage.getItem('Height'));
        setPrice(localStorage.getItem('Price'));
        setRating(localStorage.getItem('Rating'));
    }, []);

    const updateAPIData = () => {
        axios.put(`https://623a728bb5292b8bfcb55026.mockapi.io/Products/${id}`, {
            title,
            prod_type,
            description,
            filename,
            width,
            height,
            price,
            rating
        }).then(() => {
            history.push('/read')
        })
    }
    return (
      <div>
        <form className={classes.root} noValidate autocomplete='off'>
            <TextField id="outlined-basic" variant='outlined' label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Prod Type</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={prod_type}
                onChange={handleChange}
                label="Prod Type"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={'meat'}>Meat</MenuItem>
                    <MenuItem value={'vegan'}>Vegan</MenuItem>
                    <MenuItem value={'fruit'}>Fruit</MenuItem>
                    <MenuItem value={'bakery'}>Bakery</MenuItem>
                    <MenuItem value={'diary'}>Diary</MenuItem>
                    <MenuItem value={'vegetable'}>Vegetable</MenuItem>
                </Select>
            </FormControl>

            <TextField id="outlined-basic" variant='outlined' label="File Name" value={filename} onChange={(e) => setFileName(e.target.value)} />

            <TextField id="outlined-basic" variant='outlined' label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />

            <TextField id="outlined-basic" variant='outlined' label='Price' type='number' value={price} onChange={(e) => setPrice(e.target.value)} />

            <TextField id="outlined-basic" variant='outlined' label='Width' type='number' value={width} onChange={(e) => setWidth(e.target.value)} />

            <TextField id="outlined-basic" variant='outlined' label='Height' type='number' value={height} onChange={(e) => setHeight(e.target.value)} />

            <TextField id="outlined-basic" variant='outlined' label='Rating' type='number' value={rating} onChange={(e) => setRating(e.target.value)} />

            <br />
            <Link onClick={() => {updateAPIData()}} className="btn btn-primary">
            Salvar
            </Link>&nbsp;
            <Link to={"/read"} className="btn btn-secondary">
            Voltar
            </Link>

        </form>
      </div>
    )
}