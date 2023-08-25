import ReactInputMask from "react-input-mask"

export default function input({placeholder,registerInput , ...rest}){
    return(
        <ReactInputMask className="text-black" placeholder={placeholder} maskChar={null}  {...registerInput} {...rest}/>
    )
}