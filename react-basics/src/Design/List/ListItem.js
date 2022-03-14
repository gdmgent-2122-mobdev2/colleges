const ListItem = ({ name, img, onClick }) => {
  return (
    <li className="list-item" onClick={onClick}>
      <img className="list-item__image" src={img} alt={name} />
      <h3 className="list-item__title">{name}</h3>
    </li>
  );
};

export default ListItem;
