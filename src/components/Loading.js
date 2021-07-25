import injectSheet from 'react-jss';
import Loader from "react-js-loader";

const styles = {
    container: {
        position: 'absolute',
        width: "100%",
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        display: 'flex',
        jusifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    text: {
        color: 'white'
    }
}

const Loading = ({ visible }) => {
    return (
        visible && <div style={styles.container}>
            <div style={styles.loader}>
                <Loader type="spinner-circle" bgColor={"white"} size={44} />
                <p style={styles.text}>processing your request...</p>
            </div>
        </div>
    )
}

export default injectSheet(styles)(Loading);