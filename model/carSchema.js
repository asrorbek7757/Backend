const {Schema, model} = require("mongoose")

const carSchema = new Schema ({
  title: {
    type: String,
    require: true
  },
  speed: {
    type: String,
    require: true
  },
  desc: {
    type: String,
    require: true
  },
  color: {
    type: String,
    require: true
  },
  horsePower: {
    type: String,
    require: true
  },
})

const Cars = model('cars', carSchema)

module.exports = Cars