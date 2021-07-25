import injectSheet from 'react-jss';

const styles = {
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 4,
        marginTop: 8,
        paddingLeft: 8,
        paddingTop: 8,
        paddingBottom: 8,
        color: '#485460',
        border: '1px solid silver'
    }
}

const FormInput = props => {
    return (
        <input
            style={styles.input}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            autoComplete="on"
            autoFocus={true} />
    )
};

export default injectSheet(styles)(FormInput);