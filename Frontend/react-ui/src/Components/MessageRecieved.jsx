
export default function MessageReceived({message, time}){

    return(
        <div className="w-fit px-2 m-4 rounded-md bg-blue-100 rounded-bl-none">
            <h1 className="p-1 m-1 max-w-xs">{message} <sub className="timestamp-text ml-2">{time}</sub></h1>
        </div>
    )
}