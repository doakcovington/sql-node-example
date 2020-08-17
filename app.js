const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movie = await Movie.create({
      title: 'Toy Story',
      runtime: 81,
      releaseDate: '1995-11-22',
      isAvailableOnVHS: true,
    });
    console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: 'The Incredibles',
      runtime: 115,
      releaseDate: '2004-04-14',
      isAvailableOnVHS: true,
    });
    console.log(movie2.toJSON());

    const person = await Person.create({
        firstName: 'Tom',
        lastName: 'Hanks',
    });
    console.log(person.toJSON());

    const movie3 = await Movie.build({
        title: 'Toy Story 3',
        runtime: 103,
        releaseDate: '2010-06-18',
        isAvailableOnVHS: false,
    })
    await movie3.save();
    console.log(movie3.toJSON())

    const person2 = await Person.build({
        firstName: 'Brad',
        lastName: 'Bird',
    })
    await person2.save();

    const movieById = await Movie.findByPk(1);
    console.log(movieById.toJSON());

    const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    console.log(movieByRuntime.toJSON());

    const movies = await Movie.findAll({
        attribute: ['id', 'title'], //return only id and title
        where: {
            releaseDate: {
                [Op.gte]: '2004-01-01' // greater than or equal to the date
            },
            runtime: {
                [Op.gt]: 95, //greater than 95
            }         
        },
    });
    console.log(movies.map(movie => movie.toJSON()) );

    const people = await Person.findAll({
        where: {
            lastName: 'Hanks'
        }
    })
    console.log( people.map(person => person.toJSON()) );

  } catch (error) {
    //console.error('Error connecting to the database: ', error);
    if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => err.message);
        console.log('Validation errors: ', errors);
    } else {
        throw error;
    }
  }
})();






// const Sequelize = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'movies.db' //creates database named 'movie'
// });


// class Movie extends Sequelize.Model {}
// Movie.init({ //defines a new table in the databased with the name 'Movies'
//     title: Sequelize.STRING
// }, { sequelize }); //same as { sequelize: sequelize }

// (async () => {
//     await sequelize.sync({ force: true }); //Sync all tables
//     try {
//     //   await sequelize.authenticate();
//     //   console.log('Connection to the database successful!');
//     // const movie = await Movie.create({
//     //     title: 'Toy Story',
//     // }); //instance of the Movie class represents a database row
//     // console.log(movie.toJSON());

//     // const movie2 = await Movie.create({
//     //     title: 'The Incredibles'
//     // });
//     // console.log(movie2.toJSON());
//         const movieInstances = await Promise.all([
//             Movie.create({
//             title: 'Toy Story'
//             }),
//             Movie.create({
//             title: 'The Incredibles'
//             }),
//         ]);
//         const moviesJSON = movieInstances.map(movie => movie.toJSON());
//         console.log(moviesJSON);

//     } catch (error) {
//       console.error('Error connecting to the database: ', error);
//     }
// })();
