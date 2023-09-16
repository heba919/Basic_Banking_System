const {MongoClient} = require ('mongodb');
let dbconnection

module.exports ={
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://127.0.0.1:27017/bank')
            .then((client)=>{
                dbconnection = client.db()
                return cb()
            })
            .catch((err)=>{
                console.log(err);
                return cb(err);
            })
    },
    getDb:() => dbconnection




}