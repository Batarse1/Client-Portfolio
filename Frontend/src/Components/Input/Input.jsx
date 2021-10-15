import styles from './Input.module.scss';

function Input({ title, type, id, name }) {

    return (
        <div className={styles.background}>
            <label htmlFor={id}>{title}</label>
            <input type={type} id={id} name={name} />
        </div>
    );
}

export default Input;
