import injectSheet from 'react-jss';
import { Row, Col } from 'react-flexa';

const styles = {
    wrapper: {
        maxWidth: 1400,
        margin: 'auto',
        boxShadow: '0px 0px 16px -2px gray',
        paddingBottom: '6px',
        paddingTop: '6px',
        backgroundColor: 'white',
        overflow: 'hidden'
    },
    userName: {
        marginLeft: 16,
        color: '#485460'
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        marginLeft: '24px'
    },
    button: {
        border: 'none',
        backgroundColor: 'white',
        marginRight: 16,
        color: '#485460',
        fontWeight: 'bold'
    }
}

const TopNavigation = ({ user, logoutHandler }) => {
    if (!user) return;

    return (
        <div style={styles.wrapper}>
            <Row justifyContent="space-between">
                <Col xs={9}>
                    <Row>
                        <img alt="" style={styles.avatar} src={user.image} />
                        <p style={styles.userName}>{user.token.name}</p>
                    </Row>
                </Col>
                <button style={styles.button} onClick={logoutHandler}>Logout</button>
            </Row>
        </div>
    )
}

export default injectSheet(styles)(TopNavigation);