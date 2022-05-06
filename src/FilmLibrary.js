import { Col, Container, Row, Table, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { AddButton, EditButton } from './FilmForm';
import FilmLibraryNavBar from './Navbar.js';
import { SideBar, filterFilm } from './Sidebar.js'
import { Film } from './Film';
import { Outlet } from 'react-router';


function FilmRow(props) {
  const film = props.film;

  const filledStars = [];
  const emptyStars = [];

  const [favorite, setFavorite] = useState(film.favorite);

  function updateRating(n) {
    props.updateFilm2List(new Film(film.id, film.title, film.favorite, film.watchDate, n));
  }

  for (let i = 0; i < props.film.rating; ++i) {
    filledStars.push(<i className="bi bi-star-fill star" key={i + 1} onClick={() => updateRating(i + 1)}></i>)
  }

  for (let i = 0; i < 5 - props.film.rating; ++i) {
    emptyStars.push(<i className="bi bi-star star" key={props.film.rating + 1 + i} onClick={() => updateRating(props.film.rating + 1 + i)}></i>)
  }


  return (

    <>
      <tr>

        <td>
        <EditButton film={film} addFilm2List={props.addFilm2List} updateFilm2List={props.updateFilm2List} /> 
        </td>
        <td><DeleteFilmAction film={film} deleteFilm2List={props.deleteFilm2List} />
        </td>
        {favorite ?
          <td className="text-danger"> {film.title}</td> :
          <td>
            {film.title}
          </td>
        }


        <td>
          <input className="form-check-input" type="checkbox" value="" id={"film_id:" + film.id} checked={favorite}
            onChange={(ev) => {
              setFavorite(ev.target.checked)
              const newFilm = new Film(film.id, film.title, ev.target.checked, film.watchDate, film.rating)
              props.updateFilm2List(newFilm);
            }} />
          <label className="form-check-label px-1" htmlFor={"film_id:" + film.id}>
            Favorite
          </label>
        </td>
        <td>{film.watchDate ? film.watchDate.format('MMMM D, YYYY') : "none"}</td>
        <td>{filledStars}{emptyStars}</td>
      </tr>
    </>
  );
}

function FilmTable(props) {
  const filmList = props.filmList;

  return (
    <>
      <Table>
        <tbody>
          {
            filmList.map(
              film => <FilmRow
                film={film} key={film.id}
                deleteFilm2List={props.deleteFilm2List}
                updateFilm2List={props.updateFilm2List}
                addFilm2List={props.addFilm2List}
              />)
          }
        </tbody>
      </Table>
      <AddButton addFilm2List={props.addFilm2List} filmList={filmList} />
    </>
  );
}

function DeleteFilmAction(props) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="none" className='p-1'><i className="bi bi-trash" onClick={() => setShow(true)}></i></Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sei sicuro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cliccando <font color="red">Cancella</font> cancellerai il film <strong>{props.film.title}</strong>.<br /><br /> Vuoi procedere comunque?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={() => {
            setShow(false);
            props.deleteFilm2List(props.film);
          }}>
            Cancella
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}




export function FilmManager(props) {

  const [showedfilmList, setShowedFilmList] = useState(props.filterList);
  const filters = props.filterList;
  const showedFilms = filterFilm(props.activedFilter, props.filmList);

  return (
    <>
      <FilmLibraryNavBar filters={filters} filterHandle={props.setActivedFilter} />
      < Container fluid>
        <Row>
          <Col className='col-sm-4 h6 d-none d-sm-block g-0'>
            <SideBar filters={filters} activedFilter={props.activedFilter} filterHandle={props.setActivedFilter} />
          </Col>
          <Col className="col-sm-8 col-12 py-2">
            <h2>{filters[props.activedFilter]}</h2>
            <FilmTable
              filmList={showedFilms}
              addFilm2List={props.addFilm2List}
              deleteFilm2List={props.deleteFilm2List}
              updateFilm2List={props.updateFilm2List}
            />
          </Col>
        </Row>
      </Container>
      <Outlet />
    </>
  );
}