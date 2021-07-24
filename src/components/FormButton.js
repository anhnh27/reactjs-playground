const FormButton = ({ title, onPress }) => {
    return (
        <button onClick={onPress} style={{ width: '100%', border: 'none', backgroundColor: '#54a0ff', borderRadius: '4px', marginTop: '8px', padding: '8px', color: 'white' }}>{title}</button>
    );
}

export default FormButton;
