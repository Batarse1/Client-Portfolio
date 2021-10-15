import { Link } from 'react-router-dom';
import styles from './Return.module.scss';

function Return({Img, route}){
    const linkStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        cursor: 'pointer'
    }

    return(
        <Link to={route} style={linkStyle}>
            <Img className={styles.return} />
        </Link>
    );
}

export default Return;