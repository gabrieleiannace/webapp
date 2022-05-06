import { Container, ListGroup } from 'react-bootstrap';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';

export function SideBar(props) {
  const filters = props.filters;

  return (
    <Container className='list-group-flush my-list vh-100 bg-light py-2'>
      {filters.map((filter, index) =>
        <SideBarElement
          filter={filter}
          active={index === props.activedFilter}
          key={index}
          filterHandle={props.filterHandle}
          index={index}
        />
      )}
    </Container >
  );
}

function SideBarElement(props) {
  const navigate = useNavigate();

  return (
    <>
      <ListGroup.Item
        action
        active={props.active}
        onClick={() => { navigate(`${getCorrectUrl(props.filter)}`);  props.filterHandle(props.index) }}>
        {props.filter}
      </ListGroup.Item>
    </>

  );
}

export function filterFilm(filterN, filmList) {
  switch (filterN) {
    case 1:
      return filmList.filter((film) => {
        return film.favorite;
      });
    case 2:
      return filmList.filter((film) => {
        return film.rating === 5;
      });
    case 3:
      return filmList.filter((film) => {
        const today = dayjs(new Date());
        return (today.diff(film.watchDate, 'day') < 30)
      });
    case 4:
      return filmList.filter((film) => {
        return film.watchDate === '';
      });
    default:
      return [...filmList];
  }
}

export function getCorrectUrl(filter) {
  let openFilter = ';'
  switch (filter) {
    case 'All':
      openFilter = '/all';
      break;
    case 'Favorite':
      openFilter = '/favorite';
      break;
    case 'Best Rated':
      openFilter = '/best_rated';
      break;
    case 'Seen Last Month':
      openFilter = '/seen_last_month';
      break;
    case 'Unseen':
      openFilter = '/unseen';
      break;
    default:
      openFilter = '*';
      break;
  }
  return openFilter;
}
