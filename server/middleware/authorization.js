const { verifyToken } = require("../helpers/jwt");
const { User, Category, Cuisine } = require('../models')

const authorization = async (req, res, next) => {
    try {
        const cuisineId = +req.params.id
        const cuisine = await Cuisine.findByPk(cuisineId)
        if (!cuisine) {
            throw { name: "NotFound"}
        }

        if (req.user.role !== "admin" || req.user.id !== cuisine.authorId) {
            throw { name: "Forbidden"}
        } else {
            next()
        }

    } catch (err) {
        next(err)
    }
}

module.exports = { authorization }