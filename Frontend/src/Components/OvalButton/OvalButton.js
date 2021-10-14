import styles from './OvalButton.module.scss';

function OvalButton({content, bgColor, borderColor, padding, radius}){
    const style = {
        backgroundColor: bgColor,
        border: '1px solid ' + borderColor,
        padding: padding,
        borderRadius: radius
    }

    return(
        <button style={style} className={styles.button}>
            {content}
        </button>
    );
}

export default OvalButton;