import Loader from "react-js-loader";
import injectSheet from 'react-jss';

const styles = {
    button: {
        width: '100%',
        border: 'none',
        backgroundColor: '#54a0ff',
        borderRadius: '4px',
        marginTop: '8px',
        padding: '8px',
        color: 'white',
        cursor: 'pointer',
    }
}

const Button = ({ title, onClick, processing }) => {
    return (
        <button onClick={onClick} style={styles.button}>{processing ? <Loader type="spinner-circle" bgColor={"white"} size={16} /> : title}</button>
    );
}

export default injectSheet(styles)(Button);
