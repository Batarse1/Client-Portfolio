import styles from './Input.module.scss';

function Input({ title, type, id, name, onChange, message, ...rest }) {

    return (
        <div className={styles.background}>
            <label htmlFor={id}>{title}</label>
            <input type={type} id={id} name={name} onChange={onChange} {...rest}/>
            <p>{message}</p>
        </div>
    );
}

export default Input;
