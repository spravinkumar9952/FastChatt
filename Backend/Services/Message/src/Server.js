
import server from "./IOManger/IOServer.js";
import "./DBManager/PGBridge.js"

server.listen(5000, () => {
    console.log("listening...");
});
