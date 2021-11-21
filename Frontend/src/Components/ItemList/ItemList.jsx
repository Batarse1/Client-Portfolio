import { Link } from "react-router-dom";
import styles from "./ItemList.module.scss";

const ItemList = ({ name, id, ...rest }) => {
    return (
        <Link className={styles.itemList} {...rest} to={id}> {name}</Link>
    );
};

export default ItemList;