


export default function MessageSent({message, time, type}){
    console.log("Type ", type);
    return(
        <div className="w-screen">
            <div className="w-fit ml-auto mr-4 px-2 mt-2 rounded-md rounded-br-none bg-green-100 flex flex-row">
                {type === "Text" && 
                    <h1 className="p-1 m-1 ">{message} <sub className="timestamp-text ml-2">{time}</sub></h1>}
                {type === "Image" && 
                    <div className = "flex flex-col">
                        <img className="p-1 m-1 w-52 h-52 object-contain" src = {message} /> 
                        <p className="timestamp-text ml-auto mr-2 pb-2">{time}</p> 
                    </div>
                }
            </div>
        </div>

    )
}