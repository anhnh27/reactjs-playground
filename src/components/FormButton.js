import Loader from "react-js-loader";

const FormButton = ({ title, onPress, processing }) => {
    return (
        <button onClick={onPress} style={{ width: '100%', border: 'none', backgroundColor: '#54a0ff', borderRadius: '4px', marginTop: '8px', padding: '8px', color: 'white' }}>{processing ? <Loader type="bubble-top" bgColor={"#FFFFFF"} size={24} /> : title}</button>
    );
}

export default FormButton;
