import { Link } from "react-router-dom";

const ListItem = ({ name, img, onClick, href }) => {
  if (href) {
    return (
      <Link to={href} className="list-item" onClick={onClick}>
        <img className="list-item__image" src={img} alt={name} />
        <h3 className="list-item__title">{name}</h3>
      </Link>
    );
  }

  return (
    <li className="list-item" onClick={onClick}>
      <img className="list-item__image" src={img} alt={name} />
      <h3 className="list-item__title">{name}</h3>
    </li>
  );
};

export default ListItem;
