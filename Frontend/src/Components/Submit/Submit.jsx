import styles from './Submit.module.scss';

function Submit({ value, bgColor, borderColor, padding, radius, submitWidth }) {
    const submitStyle = {
        backgroundColor: bgColor,
        border: '1px solid ' + borderColor,
        padding: padding,
        borderRadius: radius,
        width: submitWidth,
        cursor: 'pointer'
    };

    return (
        <input type="submit" style={submitStyle} className={styles.submit} value={value} />
    );
}

export default Submit;