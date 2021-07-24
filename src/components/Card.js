import { Row, Col } from 'react-flexa';

const Card = ({ title, content }) => {
    return (
        <Col xs={12} sm={12} md={4} lg={4} >
            <div style={{
                minHeight: 180,
                borderRadius: '16px',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px 1px silver',
                backgroundColor: 'white',
                marginTop: 8
            }}>
                {title && <p style={{ color: '#485460', marginBlockStart: 0, marginBlockEnd: 24, fontSize: 24 }}>{title}</p>}
                {content}
            </div>
        </Col>
    )
}

export default Card;