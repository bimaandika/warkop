const { User, Category, Cuisine, History } = require('../models')
// tambahin validate di model

class cuisineController {
    static async addCuisine(req, res, next){
        try {
            const { name, description, stock, price, imgUrl, categoryId } = req.body
            
            const newCuisine = await Cuisine.create({ name, description, stock, price, imgUrl, authorId: req.user.id, categoryId })
            await History.create({ title: newCuisine.name, description: `new Cuisine with id ${newCuisine.id} created`, updatedBy: req.user.username })
            res.status(201).json({ message: `New Cuisine ${newCuisine.name} Added` })
        } catch (err) {
            next(err)
        }
    }

    static async showCuisine(req, res, next){
        try {
            const cuisine = await Cuisine.findAll({
                include: [
                    { model: User },
                    { model: Category }
                ],
                order: [[ 'id', 'ASC']]
            })
            res.json(cuisine)

        } catch (err) {
            next(err)
        }
    }

    static async detailCuisine(req, res, next){
        try {
            const cuisineId = +req.params.id
            const cuisine = await Cuisine.findByPk(cuisineId, {
                include: [
                    { model: User },
                    { model: Category }
                  ]
            })
            if (!cuisine) {
                throw { name: "NotFound"}
            }
            res.status(200).json(cuisine)

        } catch (err) {
            next(err)
        }
    }

    static async deleteCuisine(req, res, next){
        try {
            const cuisineId = +req.params.id
            const cuisine = await Cuisine.findByPk(cuisineId)
            if (!cuisine) {
                throw { name: "NotFound"}
            }
            await cuisine.destroy();
            res.status(200).json({ message: `${cuisine.name} success to delete` })

        } catch (err) {
            next(err)
        }
    }

    // ==== part 2

    static async editCuisine(req, res, next){
        try {
            const cuisineId = +req.params.id
            const { name, description, stock, price, imgUrl, categoryId } = req.body
            console.log(req.body)

            const updateCuisine = await Cuisine.update({ 
                name: name,
                description: description,
                stock: stock,
                price: price,
                imgUrl: imgUrl,
                categoryId: categoryId,
                authorId: req.user.id
            },
            { where:
                { id: +cuisineId } 
            })
            await History.create({ title: name, description: `Cuisine with id ${cuisineId} updated`, updatedBy: req.user.username })
            res.status(200).json({ message: `cuisine updated` })

        } catch (err) {
            next(err)
        }
    }

    static async editStatus(req, res, next){
        try {
            const cuisineId = +req.params.id
            const { status } = req.body
            const cuisine = await Cuisine.findOne({ where: { id: cuisineId } })
            const updateStatus = await Cuisine.update({
                status: status
            },
            { where:
                { id: +cuisineId }
            })
            await History.create({ title: cuisine.name, description: `Cuisine with id ${cuisineId} updated`, updatedBy: req.user.username })
            res.status(200).json({ message: `status cuisine updated` })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = cuisineController