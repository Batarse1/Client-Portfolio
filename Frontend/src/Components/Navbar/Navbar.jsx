import { Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/UseAuth/useAuth';
import { useInsuranceCarrier } from '../../Hooks/UseInsuranceCarrier/useInsuranceCarrier';
import style from './Navbar.module.scss';

const NavbarLink = ({ content, route }) => {
    return (
        <Link to={`/${route}`} className={style.navbarLink} >
            {content}
        </Link>
    );
};

function Navbar() {

    const auth = useAuth();
    const insuranceCarrier = useInsuranceCarrier();

    const onSignOutClick = (event) => {
        event.preventDefault();
        insuranceCarrier.setInsuranceCarrier(false);
        auth.signOut();
    };

    return (
        <nav>
            <ul>
                <NavbarLink content="Inicio" route="home" />
                <NavbarLink content="Clientes" route="customers" />
                <NavbarLink content="Reportería" route="report" />
                <li className={style.navbarLink} onClick={onSignOutClick}>Cerrar sesión</li>
            </ul>
            {insuranceCarrier.insuranceCarrier ? <p>{insuranceCarrier.insuranceCarrier}</p> : <p>Global</p>}
        </nav>
    );
}

export default Navbar;