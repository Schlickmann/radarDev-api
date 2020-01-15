const api = require('../services/api');
const Developer = require('../models/Developer');
const Utils = require('../utils/functions');

class DeveloperController {
    async index (req, res) {

        const developers = await Developer.find();

        return res.json(developers);
    }

    async store (req, res) {
        const { github_username, techs, latitude, longitude } = req.body; 
    
        let dev = await Developer.findOne({ github_username });

        if(!dev) {
            const response = await api.get(`/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = response.data;
        
            const techsArray = Utils.parseStringAsArray(techs);
        
            const location = { type: 'Point', coordinates: [longitude, latitude] }
            dev = await Developer.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }
        

        return res.json(dev);
    }

}

module.exports = new DeveloperController();