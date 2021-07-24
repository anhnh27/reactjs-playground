const FormInput = props => {
    const { backgroundColor } = props;
    return (
        <input
            style={{ width: '100%', border: 'none', backgroundColor: 'whitesmoke', borderRadius: 4, marginTop: 8, paddingLeft: 8, paddingTop: 8, paddingBottom: 8, backgroundColor: backgroundColor, color: '#485460' }}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            autoFocus={true} />
    )
};

export default FormInput;