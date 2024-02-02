


export default function MessageSent({message, time}){

    return(
        <div className="w-screen">
            <div className="w-fit ml-auto mr-4 px-2 mt-2 rounded-md rounded-br-none bg-green-100 flex flex-row">
                <h1 className="p-1 m-1">{message} <sub className="timestamp-text ml-2">{time}</sub></h1>
                {/* <p className="text-xs font-thin">12:00 AM</p> */}
                {/* <div className="w-full flex flex-row-reverse">
                    
                </div> */}
            </div>
        </div>

    )
}