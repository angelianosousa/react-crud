import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Grid, FormControl, TextField, MenuItem, Select, InputLabel, FormLabel, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router';
import FlashMessage from './FlashMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: '95%',
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
    const [description, setDescription] = useState('');
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const [price, setPrice] = useState(null);
    const [rating, setRating] = useState(null);

    const handleChangeProdType = (event) => {
        setProdType(event.target.value);
    };

    const handleChangeRating = (event) => {
        setRating(event.target.value);
    };

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setTitle(localStorage.getItem('Title'));
        setProdType(localStorage.getItem('ProdType'));
        setDescription(localStorage.getItem('Description'));
        setWidth(localStorage.getItem('Width'));
        setHeight(localStorage.getItem('Height'));
        setPrice(localStorage.getItem('Price'));
        setRating(localStorage.getItem('Rating'));
    }, []);

    const updateAPIData = () => {
        axios.patch(`https://ror-challenge-backend.herokuapp.com/products/${id}`, {
            title,
            prod_type,
            description,
            width,
            height,
            price,
            rating
        }, { headers: {
                "Authorization": "Bearer bf664015872f91c5982765bb412c1501",
                "Content-Type": "application/json"
            }
        }).then(response => {
            history.push('/read')
        }).catch(error => {
            console.log(error);
        })
    }

    return (
      <div class='create-form'>
        <form className={classes.root} noValidate autocomplete='off'>
            <Card>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField id="filled-basic" variant='filled' style={{width: '100%'}} label="Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="filled" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Prod Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={prod_type}
                                onChange={handleChangeProdType}
                                label="Prod Type"
                                required
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
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <TextField id="filled-basic" variant='filled' label='Price' type='number' required value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="filled-basic" variant='filled' label='Width' type='number' value={width} onChange={(e) => setWidth(e.target.value)} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="filled-basic" variant='filled' label='Height' type='number' value={height} onChange={(e) => setHeight(e.target.value)} />
                    </Grid>
                </Grid>

                <TextField id="outlined-multiline-static" multiline rows={5} style={{width: '98%'}} variant='filled' label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />

                <div className='container' style={{margin: '10px'}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Rating</FormLabel>
                        <RadioGroup aria-label="rating" name="rating" id="filled-basic" variant='filled' value={rating} onChange={handleChangeRating}>
                            <div className='container'>
                                <FormControlLabel value="1" control={<Radio />} label="1" />
                                <FormControlLabel value="2" control={<Radio />} label="2" />
                                <FormControlLabel value="3" control={<Radio />} label="3" />
                                <FormControlLabel value="4" control={<Radio />} label="4" />
                                <FormControlLabel value="5" control={<Radio />} label="5" />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
            </Card>

            <br /><br />
            <Button onClick={() => {updateAPIData()}} color='primary' variant='contained'>
                Salvar
            </Button>&nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="secondary" href="/read">
                Voltar
            </Button>
        </form>
      </div>
    )
}