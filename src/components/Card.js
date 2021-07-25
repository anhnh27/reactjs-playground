import { Col } from 'react-flexa';
import injectSheet from 'react-jss';

const styles = {
    container: {
        minHeight: 180,
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0px 2px 4px 1px silver',
        backgroundColor: 'white',
        marginTop: 8
    },
    title: {
        color: '#485460',
        marginBlockStart: 0,
        marginBlockEnd: 24,
        fontSize: 24
    }
}

const Card = ({ title, content }) => {
    return (
        <Col xs={12} sm={12} md={4} lg={4} >
            <div style={styles.container}>
                {title && <p style={styles.title}>{title}</p>}
                {content}
            </div>
        </Col>
    )
}

export default injectSheet(styles)(Card);