require('dotenv').config();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(function(val){
  console.log("Connected to database");
})
.catch(function(error){
  console.log("Error "+error)
});

let personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    age: Number,
    favoriteFoods: {type: [String]}
  }
)

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var kevinFolgar = new Person({name: 'Kevin Folgar', age: 30, favoriteFoods: ['Pizza', 'Yakisoba', 'Cake']});

  kevinFolgar.save((err, data)=>{ 
    if(err){
      return console.error(err);
    } 
    console.log("Saved person to db");
    done(null, data);
  });
};
let arrayOfPeople = [
  new Person({name: 'Kevin Folgar', age: 30, favoriteFoods: ['Pizza', 'Yakisoba', 'Cake']}),
  new Person({name: 'Malenyn Erazo', age: 27, favoriteFoods: ['Canneloni', 'Fried chicken', 'Cinammon rolls']})
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data)=>{
    if(err){
      return console.error(err);
    } 
    console.log("Saved persons to db");
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data)=>{
    if(err){
      return console.error(err);
    } 
    console.log("Found coincidences");
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err, data)=>{
    if(err){
      return console.error(err);
    }
    console.log("Found coincidence by food");
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) =>{
    if(err){
      return console.error(err);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data)=>{
      if(err){
        return console.error(err);
      }
      done(null, data);
    })
  })  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:true}, (err, data)=>{
    if(err){
      return console.error(err);
    }
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data)=>{
    if(err){
      return console.error(err);
    }
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
