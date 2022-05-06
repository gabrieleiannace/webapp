import { Alert, Form, Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Film } from './Film';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router';
import { getCorrectUrl } from './Sidebar';

function FilmForm(props) {
  return (
    <>
      {props.errorMsg ? <Alert variant='danger' onClose={() => props.setErrorMsg('')} dismissible>{props.errorMsg}</Alert> : false}
      <Form>
        <Form.Group>
          <Form.Label>Nome Film</Form.Label>
          <Form.Control
            placeholder={props.title ? props.title : "Titolo"}
            onChange={(ev) => props.setTitle(ev.target.value)}
          />
        </Form.Group>
        <Form.Group>

          <div className="form-check form-switch">
            <br />
            <Form.Label>Favorite</Form.Label>
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={(ev) => props.setFavorite(ev.target.checked)}
              checked={props.favorite}
            />
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Data di visulizzazione</Form.Label>
          <Form.Control className='text-muted' value={props.watchDate ? props.watchDate.format('YYYY-MM-DD') : ''} type='date' onChange={ev => props.setWatchDate(dayjs(ev.target.value))}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type='number'
            placeholder='0-5'
            value={props.rating}
            onChange={
              (ev) => {
                const val = Math.round(ev.target.value);
                if (val > 5)
                  props.setRating(5);
                else if (val < 0)
                  props.setRating(0);
                else
                  props.setRating(val);
              }
            }
          />
        </Form.Group>
      </Form>
    </>
  );
}

function FilmModal(props) {

  const navigate = useNavigate();

  const { id } = useParams();

  const film2Edit = props.filmList.filter(item => `${item.id}` === `${id}`)

  const [title, setTitle] = useState(film2Edit[0] ? film2Edit[0].title : '');
  const [favorite, setFavorite] = useState(film2Edit[0] ? film2Edit[0].favorite : false);
  const [watchDate, setWatchDate] = useState(film2Edit[0] ? dayjs(film2Edit.watchDate) : '');
  const [rating, setRating] = useState(film2Edit[0] ? film2Edit[0].rating : 0);

  //  Error Message: Empty string like '' = there is not an error
  const [errorMsg, setErrorMsg] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    //  Validation: avoid empty title
    if (!title) {
      setErrorMsg('Errore: il titolo non può essere vuoto')
      return;
    }

    const today = dayjs(new Date());
    //  Validation: avoid future dates
    if ((today.diff(dayjs(watchDate)) <= 1)) {
      setErrorMsg('Errore: i viaggi nel tempo non sono ancora implementati')
      return;
    }

    let validDate = '';
    //  Validation: allow empty date
    if (watchDate && (watchDate.isValid()))
      validDate = watchDate;

    //  Add: the real film's ID is assigned in addFilm2List function
    const newFilm = new Film(id, title, favorite, validDate, rating);
    props.addFilm2List(newFilm, props.isUpdate);
    
    navigate(getCorrectUrl(props.openFilter));
  }

  return (
    <Modal
      show={true}
      onHide={() => navigate('/')}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi un nuovo film</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Completa i seguenti campi per aggiungere un film alla libreria:
        <br />
        <br />
        <br />
        <FilmForm
          title={title}
          favorite={favorite}
          watchDate={watchDate}
          rating={rating}
          errorMsg={errorMsg}
          setTitle={setTitle}
          setFavorite={setFavorite}
          setRating={setRating}
          setWatchDate={setWatchDate}
          setErrorMsg={setErrorMsg}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Chiudi
        </Button>
        <Button variant="dark" onClick={handleSubmit}>Salva</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function AddButton(props) {
  const navigate = useNavigate();
  return (
    <>
      <Button variant="none" className='position-fixed bottom-0 end-0 mx-5 my-5' >
        <i className="bi bi-plus-circle-fill" style={{ fontSize: "32px" }} onClick={() => navigate('/add')}></i>
      </Button>
    </>
  );
}

export function EditButton(props) {
  const navigate = useNavigate();
  return (
    <Button variant="none" className='p-1'>
      <i className="bi bi-pencil-square" onClick={() => navigate(`/edit/${props.film.id}`)} />
    </Button>
  );
}

export { FilmModal };