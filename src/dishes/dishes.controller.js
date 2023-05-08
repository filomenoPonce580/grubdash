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
        if(field === 'price' && (req.body.data[field] < 0 || typeof req.body.data[field] !== 'number')){
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


//validation middleware(validates id in route) (READ/UPDATE)
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

function deleteDishExists(req, res, next) {
    let { dishId } = req.params;
    dishId = dishId;
    let index = dishes.findIndex(dish => dish.id === req.params.dishId);
    if (index > -1) {
      let dish = dishes[index];
      // save the dinosaur that we found for future use
      res.locals.dish = dish;
      res.locals.index = index;
      next({status: 405});
    } else {
      next({
        status: 405,
        message: `Could not find dish with id ${dishId}`
      })
    }
}





//lists all dishes---------------------------------------------------
function list(req, res, next) {
    res.send({ data: dishes })
}

//---------CREATE(post)-------------------------------------------------------

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
    res.status(201).json({data: newDish});
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

//does not work when checking if id's dont match
// function validateUpdateId(req, res, next){
//     const dishId = res.locals.dish.id
//     const{ data: { name, description, price, image_url, id } = {} } = req.body;

//     if(dishId === id){
//         next()
//     } else {
//         next({
//             status: 400,
//             message: `${id} does not match`
//           })
//     }
// }


//DELETE --------------------------------------------------------
function destroy(req, res, next) {
    const { dishId } = req.params;
    const index = pastes.findIndex((dish) => dish.id === dishId);
    // `splice()` returns an array of the deleted elements, even if it is one element
    dishes.splice(index, 1);
    res.sendStatus(204);
  }

//fields for create validator
let fields = ['name', 'description', 'price', 'image_url']

module.exports = {
    list,
    create: [validateDataExists, ...fields.map(fieldValidator), create],
    read: [validateDishExists, read],
    update: [validateDishExists, ...fields.map(fieldValidator), update],
    delete: [deleteDishExists, destroy]
}