import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './animation.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FilmManager } from './FilmLibrary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FilmModal } from './FilmForm'
import { Film, FilmLibrary } from './Film.js'
import { useState } from 'react';
import PageNotFound from './PageNotFound';


// Creating some film entries
const f1 = new Film(1, "Pulp Fiction", true, "2022-03-10", 5);
const f2 = new Film(2, "21 Grams", true, "2022-03-17", 4);
const f3 = new Film(3, "Star Wars", false);
const f4 = new Film(4, "Matrix", false);
const f5 = new Film(5, "Shrek", false, "2022-04-01", 3);

// Creating the film library
const library = new FilmLibrary();

// Adding the films to the FilmLibrary
library.addNewFilm(f1);
library.addNewFilm(f2);
library.addNewFilm(f3);
library.addNewFilm(f4);
library.addNewFilm(f5);

// Adding the list of filter aviable
const filterList = ["All", "Favorite", "Best Rated", "Seen Last Month", "Unseen"];


function App() {
  const [filmList, setFilmList] = useState(library.list);
  const [activedFilter, setActivedFilter] = useState(0)

  function updateFilm2List(film) {
    setFilmList(oldList => {
      return oldList.map((item) => {
        if (`${item.id}` === `${film.id}`) {
          let max = 0;
          for (const element of filmList) {
            if (element.id > max)
              max = element.id
          }
          film.id = max + 1;
          return film;
        }
        return item;
      })
    })
  }

  function deleteFilm2List(film) {
    setFilmList(() => (filmList.filter((element) => element.id !== film.id)))
  }


  function addFilm2List(film, isUpdate = false) {

    //  Check: if is NOT an unpdate add it to the list
    if (!isUpdate) {
      //  Generate a new key ID
      let max = 0;
      for (const element of filmList) {
        if (element.id > max)
          max = element.id
      }
      //  max + 1 for unique ID
      film.id = max + 1;
      setFilmList((oldList) => oldList.concat(film));
    }
    //  else update the list
    else {
      updateFilm2List(new Film(film.id, film.title, film.favorite, film.watchDate, film.rating));
    }
  }

  return (
    <Router>
      <Routes>

        <Route path='/' element={<FilmManager
          filmList={filmList}
          setFilmList={setFilmList}
          filterList={filterList}
          activedFilter={activedFilter}
          setActivedFilter={setActivedFilter}
          deleteFilm2List={deleteFilm2List}
          updateFilm2List={updateFilm2List}
        />}
        >
          <Route path='/add' element={<FilmModal
            film={{ id: 0, title: '', favorite: false, watchDate: '', rating: 0 }}
            filmList={filmList}
            addFilm2List={addFilm2List}
            openFilter={filterList[activedFilter]}
          />}
          />
          
          <Route
            path='/edit/:id'
            element={<FilmModal
              filmList={filmList}
              addFilm2List={addFilm2List}
              isUpdate={true}
              updateFilm2List={updateFilm2List}
              openFilter={filterList[activedFilter]}
            />}
            
          />
        </Route>
        <Route path='/all' element={<FilmManager
          filmList={filmList}
          setFilmList={setFilmList}
          filterList={filterList}
          activedFilter={0}
          setActivedFilter={setActivedFilter}
          deleteFilm2List={deleteFilm2List}
          updateFilm2List={updateFilm2List}
        />}
        />
        <Route path='/favorite' element={<FilmManager
          filmList={filmList}
          setFilmList={setFilmList}
          filterList={filterList}
          activedFilter={1}
          setActivedFilter={setActivedFilter}
          deleteFilm2List={deleteFilm2List}
          updateFilm2List={updateFilm2List}
        />}
        />
        <Route path='/best_rated' element={<FilmManager
          filmList={filmList}
          setFilmList={setFilmList}
          filterList={filterList}
          activedFilter={2}
          setActivedFilter={setActivedFilter}
          deleteFilm2List={deleteFilm2List}
          updateFilm2List={updateFilm2List}
        />}
        />
        <Route path='/seen_last_month' element={<FilmManager
          filmList={filmList}
          setFilmList={setFilmList}
          filterList={filterList}
          activedFilter={3}
          setActivedFilter={setActivedFilter}
          deleteFilm2List={deleteFilm2List}
          updateFilm2List={updateFilm2List}
        />}
        />
        <Route path='/unseen' element={<FilmManager
          filmList={filmList}
          setFilmList={setFilmList}
          filterList={filterList}
          activedFilter={4}
          setActivedFilter={setActivedFilter}
          deleteFilm2List={deleteFilm2List}
          updateFilm2List={updateFilm2List}
        />}
        />

        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
    </Router>

  );
}
export default App;

