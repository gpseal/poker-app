
export const ButtonText = (props) => {
    return (
      <button
        className="text-blue-600 hover:text-red-600"
        onClick={props.onClick}
        data-testid="ButtonText"
      >
        {props.text}
      </button>
    );
}

export const ButtonStandard = (props) => {
    return (
      <button
        className="p-2 bg-black text-white hover:bg-slate-500 w-40 mx-2 border border-pink-500"
        onClick={props.onClick}
        data-testid="stdButton"
        >
        {props.text}
      </button>
    );
}

export const ButtonForm = (props) => {
    return(
        <button
        id={props.id}
        type="submit"
        className="p-2 w-20 bg-black text-white hover:bg-slate-500"
        data-testid="ButtonForm"
        >
            {props.text}
        </button>
    )
} 