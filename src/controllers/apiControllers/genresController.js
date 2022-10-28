const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {

                let response = {

                }
                res.status(200).json(response)
            })
    }
   

}

module.exports = genresController;