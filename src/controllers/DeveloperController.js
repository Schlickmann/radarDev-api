const api = require('../services/api');
const Developer = require('../models/Developer');

class DeveloperController {
    async store (req, res) {
        const { github_username, techs, latitude, longitude } = req.body; 
    
        const response = await api.get(`/users/${github_username}`);
    
        const { name = login, avatar_url, bio } = response.data;
    
        const techsArray = techs.split(',').map(tech => tech.trim());
    
        const location = { type: 'Point', coordinates: [longitude, latitude] }
        const dev = await Developer.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });

        return res.json(dev);
    }

}

module.exports = new DeveloperController();