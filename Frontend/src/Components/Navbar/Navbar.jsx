import { Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/UseAuth/useAuth';
import style from './Navbar.module.scss';

const NavbarLink = ({ content, route }) => {
    return (
        <Link to={route} className={style.navbarLink}>
            {content}
        </Link>
    );
};

function Navbar({ insuranceCarrier }) {
    
    const auth = useAuth();

    const handleOnClick = (event) => {
        event.preventDefault();
        auth.signOut();
    }

    return (
        <nav>
            <ul>
                <NavbarLink content="Inicio" route="Home" />
                <NavbarLink content="Clientes" route="signup" />
                <NavbarLink content="Reportería" route="signup" />
                <li className={style.navbarLink} onClick={handleOnClick}>Cerrar sesión</li>
            </ul>
            {insuranceCarrier ? <p>{insuranceCarrier}</p> : <p>Global</p>}
        </nav>
    );
}

export default Navbar;