const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;




const moviesController = {
  
    //Aqui dispongo las rutas para trabajar con el CRUD
    list: async (req, res) => {
        try {
          let movies = await db.Movie.findAll({
            include: ["genre"],
          });
          //creo un objeto
          let response = {
            ok: true, 
            meta: {
              status: 200,
              total: movies.length,
            },
            data: genres,
          };
          return res.status(200).json(response);
        } catch (error) {}
      },
      detail: (req, res) => {
        if (checkID(req.params.id)) {
          return res.status(400).json(checkID(req.params.id));
        }
    
        db.Movie.findByPk(req.params.id, {
          include: ["genre"],
        }).then((movie) => {
          res.render("moviesDetail.ejs", { movie });
        });
      },
      new: (req, res) => {
        db.Movie.findAll({
          order: [["release_date", "DESC"]],
          limit: 5,
        }).then((movies) => {
          res.render("newestMovies", { movies });
        });
      },
      recomended: (req, res) => {
        db.Movie.findAll({
          include: ["genre"],
          where: {
            rating: { [db.Sequelize.Op.gte]: 8 },
          },
          order: [["rating", "DESC"]],
        }).then((movies) => {
          res.render("recommendedMovies.ejs", { movies });
        });
      },
    create: function (req,res) {
        console.log(req.body)
        Movies.create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(pelicula => {

            let arr = []
            arr.push(pelicula)
            let response = {
                meta: {
                  status: 200,
                  message: "La pelicula fue creada con exito",
                  total: arr.length, 
                  url: `${req.protocol}://${req.get('host')}${req.oroginalUrl}`
                },
                data: pelicula
            }

            return res.status(200).json(response)
        })            
        .catch(error => {
            let response = {
                meta: {
                  status: 200,
                  message: "Hubo un error al crear la pelicula",
                  total: arr.length, 
                  url: `${req.protocol}://${req.get('host')}${req.oroginalUrl}`
                },
                data: error
                
            }

      return  res.status(500).json(response)
       })
    },
   
  
    destroy: function (req,res) {
        let movieId = req.params.id;
        let pelicula = Movies.findOne({
            where :{
                id : movieId
            }
        })
        let eliminar = Movies.destroy({
            where: {
                id: movieId
            },
                force: true
            }) // force: true es para asegurar que se ejecute la acción
            Promise.all([pelicula,eliminar])
            .then((pelicula,eliminar)=> {
              let arr = []
              arr.push(pelicula)
              let response = {
                meta: {
                  status: 200,
                  message: "La pelicula fue eliminada con exito",
                  total: arr.length, 
                  url: `${req.protocol}://${req.get('host')}${req.oroginalUrl}`
                },
                data: arr
            }

            return res.status(200).json(response)
        })
            .catch(error => {
                let response = {
                    meta: { 
                      status: 200,
                      message: "Hubo un error al eliminar la pelicula",
                      total: arr.length, 
                      url: `${req.protocol}://${req.get('host')}${req.oroginalUrl}`
                    },
                    data: error
                    
                }
    
          return  res.status(500).json(response)
           })
    }
}

module.exports = moviesController;