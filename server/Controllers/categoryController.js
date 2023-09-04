const { User, Category, Cuisine } = require('../models')


class categoryController {
    static async showCategory(req, res, next){
        try {
            const category = await Category.findAll()
            res.json(category)

        } catch (err) {
            next(err)
        }
    }

    static async addCategory(req, res, next){
        try {
            const { name } = req.body

            await Category.create({ name })
            res.status(201).json({ message: `New Category Added` })
        } catch (err) {
            next(err)
        }
    }
    
    static async deleteCategory(req, res, next){
        try {
            const categoryId = +req.params.id
            const category = await Category.findByPk(categoryId)
            if (!category) {
                throw { name: "NotFoundCategory"}
            }
            await category.destroy();
            res.status(200).json({ message: `${category.name} success to delete` })

        } catch (err) {
            next(err)
        }
    }

    // == part 2
    static async editCategory(req, res, next){
        try {
            const categoryId = +req.params.id
            const { name } = req.body
            const updateName = await Category.update({
                name: name
            },
            { where:
                { id: +categoryId }
            })
            res.status(200).json({ message: `category updated` })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = categoryController