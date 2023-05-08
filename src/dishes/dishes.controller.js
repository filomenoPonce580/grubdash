const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
function validateDataExists(req, res, next) {
    if (req.body.data) {
      next();
    } else {
      next({
        status: 400,
        message: "Please include a data object in your request body."
      })
    }
}


//MIDDLEWARES -------------------------------------------------------

//validates field for CREATE/UPDATE
function fieldValidator(field) {
    return function (req, res, next) {
      if (req.body.data[field]) {
        if(field === 'price' && req.body.data[field] < 0){
            next({
                status: 400,
                message: `Dish must indlude a ${field}`
            })
        }else{
            next();            
        }
      } else {
        next({
          status: 400,
          message: `Dish must indlude a ${field}`
        })
      }
    }
}


//validation middleware(validates id in route) 
function validateDishExists(req, res, next) {
    let { dishId } = req.params;
    dishId = dishId;
    let index = dishes.findIndex(dish => dish.id === req.params.dishId);
    if (index > -1) {
      let dish = dishes[index];
      // save the dinosaur that we found for future use
      res.locals.dish = dish;
      res.locals.index = index;
      next();
    } else {
      next({
        status: 404,
        message: `Could not find dish with id ${dishId}`
      })
    }
}



//lists all dishes---------------------------------------------------
function list(req, res, next) {
    res.send({ data: dishes })
}

//create(post)-------------------------------------------------------

function create(req, res, next) {
    const { name, description, price, image_url } = req.body.data;
    let newDish = {
      "name": name,
      "description": description,
      "price": price,
      "image_url": image_url,
      "id": nextId(),
    };
    dishes.push(newDish);
    res.status(201).send(newDish);
  }


//READ---------------------------------------------------

function read(req, res, next) {
    // use the saved dish from inside the validator function
    const { dish } = res.locals;
    res.send({ data: dish })
}



//UPDATE-------------------------------------------------
function update(req, res, next) {
    const dish = res.locals.dish;
    const { data: { name, description, price, image_url } = {} } = req.body;
  
    // update the paste
    dish.name = name;
    dish.description = description;
    dish.price = price;
    dish.image_url = image_url;
  
    res.json({ data: dish });
  }


//fields for create validator
let fields = ['name', 'description', 'price', 'image_url']

module.exports = {
    list,
    create: [validateDataExists, ...fields.map(fieldValidator), create],
    read: [validateDishExists, read],
    update: [validateDishExists, ...fields.map(fieldValidator), update]
}