import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

function Button({ content, bgColor, borderColor, padding, radius, buttonWidth, route }) {
    const buttonStyle = {
        backgroundColor: bgColor,
        border: '1px solid ' + borderColor,
        padding: padding,
        borderRadius: radius,
        width: buttonWidth,
        cursor: 'pointer'
    };

    const linkStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        cursor: 'pointer'
    }

    return (
        <Link to={route} style={linkStyle}>
            <button style={buttonStyle} className={styles.button}>
                {content}
            </button>
        </Link>
    );
}

export default Button;