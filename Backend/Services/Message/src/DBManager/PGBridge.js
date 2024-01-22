import pkg from 'pg';
const {Client} = pkg;

const DBConnection = new Client(
    {
        user : "postgres",
        password : "root@123",
        database : "FastChatt",
        port : 5432
    }
)

DBConnection.connect((err) => {
    if(err) console.log(err);
    else console.log("Connected to PG Sucessfully");
})

export default DBConnection;


