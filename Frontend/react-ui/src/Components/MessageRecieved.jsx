
export default function MessageReceived({message, time, type}){

    return(
        <div className="w-fit px-2 m-4 rounded-md bg-blue-100 rounded-bl-none">
            {type === "Text" && <h1 className="p-1 m-1 max-w-xs">{message} <sub className="timestamp-text ml-2">{time}</sub></h1>}
            {type === "Image" && <img className="p-1 m-1 w-52 h-52 object-contain" src = {message} />}
        </div>
    )
}