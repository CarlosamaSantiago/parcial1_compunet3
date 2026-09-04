import mongoose from "mongoose";

const connectionString: string = `mongodb://root:password@localhost:27017`;

export const dbInstace = mongoose.connect(connectionString, {dbName:"Icesi"})
                        .then(
                            () => console.log("Connected to mongoDB")
                        ).catch(
                            (error)=> console.log(error)
                        );