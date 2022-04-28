import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';

const UserList = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let moviesId = window.localStorage.movies
      ? window.localStorage.movies.split(',')
      : [];
    console.log(moviesId);

    for (let i = 0; i < moviesId.length; i++) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=fef9c652f293e7c7769d46c8b59efaa4&language=fr-FR`
        )
        .then((res) => setListData((listData) => [...listData, res.data]));
    }
  }, []);

  return (
    <div className='user-list-page'>
      <Header />
      <h2>
        Coup de coeur <span>❤</span>
      </h2>
      <div className='result'>
        {listData.length > 0 ? (
          listData.map((movie) => <Card movie={movie} key={movie.id} />)
        ) : (
          <h2>Aucoup coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
