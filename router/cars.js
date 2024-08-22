const {Router} = require('express')

const cars = Router()

const {
    getCars,
    createCars,
    deleteCars,
    updateCars,
} = require('../controller/cars')

cars.get('/getCars', getCars)
cars.post('/createCars', createCars)
cars.delete('/deleteCars/:id', deleteCars)
cars.put('/updateCars/:id', updateCars)

module.exports = {cars}