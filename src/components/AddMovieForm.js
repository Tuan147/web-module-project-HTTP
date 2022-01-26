import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

import axios from 'axios';

const AddMovieForm = (props) => {
    const { push } = useHistory();
    const { id } = useParams();

    const [movie, setMovie] = useState({
        title: "",
        director: "",
        genre: "",
        metascore: 0,
        description: ""
    });

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        axios.post(`http://localhost:9000/api/movies/${id}`, movie)
            .then(res => {
                props.setMovies(res.data);
                push('/movies')
            })
            .catch(err => console.log(err))
    }

    const { title, director, genre, metascore, description } = movie;

    return (
        <div className="add-movies">
            <div className="form-submit">
                <form onSubmit={handleSubmit}>
                    <div className="add-header">
                        <h4 className="add-title">Adding <strong>{movie.title}</strong></h4>
                    </div>
                    <div className="add-body">
                        <label>Title</label>
                        <input 
                            value={title}
                            onChange={handleChange}
                            name='title'
                            type='text'
                            className='form-control'
                        />
                        <label>Director</label>
                        <input 
                            value={director}
                            onChange={handleChange}
                            name='director'
                            type='text'
                            className='form-control'
                        />
                        <label>Genre</label>
                        <input 
                            value={genre}
                            onChange={handleChange}
                            name='genre'
                            type='text'
                            className='form-control'
                        />
                        <label>Metascore</label>
                        <input 
                            value={metascore}
                            onChange={handleChange}
                            name='metascore'
                            type='number'
                            className='form-control'
                        />
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={handleChange}
                            name='description'
                            type='text'
                            className='form-control'
                        >
                        </textarea> 
                    </div>
                    <div className="add-footer">
                        <input type='submit' className="btn btn-info" value='Save'/>
                        <Link to={'/movies/'}>
                            <input 
                                type='button'
                                className="btn btn-default"
                                value='Cancel'
                            />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddMovieForm;