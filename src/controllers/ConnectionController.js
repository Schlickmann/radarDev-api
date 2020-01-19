const Connection = require('../models/Connection');
const Utils = require('../utils/functions');

class ConnectionController {

    async store (params) {
        const { socketId, techs, latitude, longitude } = params; 
    
        let connection = await Connection.findOne({ socketId });

        if(!connection) {
        
            const techsArray = Utils.parseStringAsArray(techs);
        
            connection = await Connection.create({
                socketId,
                techs: techsArray,
                coordinates: {
                    latitude: Number(latitude),
                    longitude: Number(longitude)
                }
            });
        }
        

        return connection;
    }

    async destroy(socketId) {
        let connection = await Connection.findOneAndRemove({ socketId });
    }

    async show(coordinates, techs) {
 
        const connections =  await Connection.find();

        return connections.filter(connection => {
            return Utils.getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10 && connection.techs.some(item => techs.includes(item));
        }); 
    }

}

module.exports = new ConnectionController();