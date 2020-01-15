const api = require('../services/api');
const Developer = require('../models/Developer');
const Utils = require('../utils/functions');

class SearchController {
    async index (req, res) {
        // Search all developers within certain distance and filter by technologies

        const { latitude, longitude, techs } = req.query;

        const techsArray = Utils.parseStringAsArray(techs);

        const developers = await Developer.find({ 
            techs: { 
                $in: techsArray 
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return res.json(developers);
    }


}

module.exports = new SearchController();