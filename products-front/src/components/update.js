import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, MenuItem, Select, InputLabel, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
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
    const [created_at, setCreatedAt] = useState(null);

    const handleChangeProdType = (event) => {
        setProdType(event.target.value);
    };

    const handleChangeRating = (event) => {
        setRating(event.target.value);
    };

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setTitle(localStorage.getItem('Title'));
        setFileName(localStorage.getItem('FileName'));
        setDescription(localStorage.getItem('Description'));
        setWidth(localStorage.getItem('Width'));
        setHeight(localStorage.getItem('Height'));
        setPrice(localStorage.getItem('Price'));
        setRating(localStorage.getItem('Rating'));
        setCreatedAt(localStorage.getItem('CreatedAt'));
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
            rating,
            created_at
        }).then(() => {
            history.push('/read')
        })
    }
    return (
      <div>
        <form className={classes.root} noValidate autocomplete='off'>
            <TextField id="filled-basic" variant='filled' label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Prod Type</InputLabel>
                <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={prod_type}
                onChange={handleChangeProdType}
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

            <TextField id="filled-basic" variant='filled' label="File Name" value={filename} onChange={(e) => setFileName(e.target.value)} />

            <TextField id="filled-basic" variant='filled' label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />

            <TextField id="filled-basic" variant='filled' label='Price' type='number' value={price} onChange={(e) => setPrice(e.target.value)} />

            <TextField id="filled-basic" variant='filled' label='Width' type='number' value={width} onChange={(e) => setWidth(e.target.value)} />

            <TextField id="filled-basic" variant='filled' label='Height' type='number' value={height} onChange={(e) => setHeight(e.target.value)} />

            <div className='container'>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Rating</FormLabel>
                    <RadioGroup aria-label="rating" name="rating" id="filled-basic" variant='filled' value={rating} onChange={handleChangeRating}>
                        <div>
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>

            <br />
            <Link onClick={() => {updateAPIData()}} className="btn btn-primary">
                Salvar
            </Link>&nbsp;
            <Link to={"/read"} className="btn btn-secondary">
                Voltar
            </Link>
        </form><br />
      </div>
    )
}