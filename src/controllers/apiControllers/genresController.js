const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


const genresController = {
    'list': (req, res) => {
        db.Genre.findAll()
            .then(genres => {

                let response = {
                  status: 200,
                  meta : {
                    total: genres.length,
                    url: `${req.protocol}://${req.get('host')}${req.oroginalUrl}`

                  },
                  data : genres
                }
               return res.status(200).json(response)
            })
            .catch(error => {
                let response = {
                    meta: {
                      status: 200,
                      message: "Hubo un error al visualizar los generos",
                      total: arr.length, 
                      url: `${req.protocol}://${req.get('host')}${req.oroginalUrl}`
                    },
                    data: error
                    
                }
    
           return res.status(500).json(response)
           })
        },
    }
   



module.exports = genresController;