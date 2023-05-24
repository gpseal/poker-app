
export const ButtonText = (props) => {
    return (
        <button
        className="text-blue-600 hover:text-red-600"
        onClick={props.onClick}
        >{props.text}</button>
    )
}

export const ButtonStandard = (props) => {
    return (
        <button
        className="p-2 mt-10 bg-black text-white hover:bg-slate-500"
        onClick={props.onClick}
        >{props.text}</button>
    )
}

export const ButtonForm = (props) => {
    return(
        <button
        id={props.id}
        type="submit"
        className="p-2 w-20 mt-10 bg-black text-white hover:bg-slate-500"
        >
            {props.text}
        </button>
    )
} 