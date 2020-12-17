import {
    MongoClient,
    ObjectID
} from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'GasStation';
const collectiionName = "GasStation";



const gasStationKeepingControler = {
    get: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });
            const connection = await client.connect();
            const gasStationKeeping = connection.db(dbName).collection(collectiionName);
            const result = await gasStationKeeping.find({}).toArray();
            let A80 = 0;
            let A92 = 0;
            let A95 = 0;
            result.forEach(element => {
                if (element.firm_owner == req.query.f) {
                    A80 += element.rest_A80 * 1;
                    A92 += element.rest_A92 * 1;
                    A95 += element.rest_A95 * 1;
                }
            });
            var ress = "A80 - " + A80.toString() + ", A92 - " + A92.toString() + ", A95 - " + A95.toString();
            if (req.query.f) {
                res.send(ress)
            }
            res.send(result);
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    getById: (req, res) => {
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        });
        client.connect().then(connection => {
            const gasStations = connection.db(dbName).collection(collectiionName);
            gasStations.findOne({
                _id: ObjectID(req.params.id)
            })
                .then(result => {
                    client.close();
                    if (result)
                        res.send(result);
                    else
                        res.status(404).send("Not Found");
                })
                .catch(error => {
                    throw error;
                });
        })
            .catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
    },
    delete: (req, res) => {
        function logError(error) {
            console.log(error);
            res.status(500).send(error);
        }
        const client = new MongoClient(url, {
            useUnifiedTopology: true
        });
        client.connect(
            (error, connection) => {
                if (error) {
                    logError(error);
                } else {
                    const gasStations = connection.db(dbName).collection(collectiionName);
                    gasStations.findOneAndDelete({
                        _id: ObjectID(req.params.id)
                    },
                        (error, result) => {
                            if (error) {
                                logError(error);
                            } else {
                                connection.close();
                                res.send(result);
                            }
                        }
                    );
                }
            }
        );
    },
    post: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });
            const connection = await client.connect();
            const gasStations = connection.db(dbName).collection(collectiionName);
            if (Array.isArray(req.body)) {
                const result = await gasStations.insertMany(req.body);
            }
            else {
                const result = await gasStations.insertOne(req.body);
            }
            res.send("добавлено");
            client.close();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) => {
        try {
            const client = new MongoClient(url, {
                useUnifiedTopology: true
            });

            const connection = await client.connect();
            const gasStations = connection.db(dbName).collection(collectiionName);
            const result = await gasStations.findOneAndUpdate({
                _id: ObjectID(req.params.id)
            },
                {
                    $set: req.body
                });

            if (result.value)
                res.send(result.value);
            else
                res.status(404).send("Not Found");
            client.close();
        } catch (error) {

            console.log(error);
            res.status(500).send(error);

        }

    },
}

export default gasStationKeepingControler;