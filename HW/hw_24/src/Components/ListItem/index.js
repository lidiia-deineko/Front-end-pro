import './style.css'

const ListItem = (props) => {
    return <li className={`list-item${props.className}`}>{props.name}</li>
}

export default ListItem;