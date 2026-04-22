const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const basename = path.basename(__filename);

const sequelize = new Sequelize({
  dialect: process.env.DIALECT,
  dialectModule: process.env.DIALECTMODULE,
  database: process.env.DATABASE_NAME,
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  host: process.env.HOST
});

const db = {};

db.Sequelize = Sequelize;   
db.sequelize = sequelize;

// Load models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

// Call associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
