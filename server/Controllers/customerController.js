const { Customer, Order, Cuisine } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken, verifyToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios')

class customerController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const customer = await Customer.create({ email, password, role: "customer" })
            res.status(201).json({ message: `Customer with ${customer.email} has been created` })

        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                next({ name: 'emailUniqe' })
            } else {
                next(err)
            }
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: "emailInvalid" }
            }
            if (!password) {
                throw { name: "passInvalid" }
            }
            const [customer] = await Customer.findAll({ where: { email } })

            if (!customer) {
                throw { name: "wrongEmail" }
            }

            const isValidPass = comparePassword(password, customer.password)
            if (!isValidPass) {
                throw { name: "wrongPass" }
            }

            const access_token = signToken({
                id: customer.id,
                email: customer.email
            })

            res.json({ access_token, customer })

        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)
            const token = req.headers.google_token;

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENTID,
            })

            const payloadGoogle = ticket.getPayload()

            const [customer, created] = await Customer.findOrCreate({
                where: {
                    email: payloadGoogle.email
                },
                defaults: {
                    email: payloadGoogle.email,
                    password: `12345`,
                    role: 'customer'
                },
                hooks: false
            })

            const access_token = signToken({
                email: customer.email,
                password: customer.password,
                role: customer.role
            })
            res.json({ access_token, customer })

        } catch (err) {
            next(err);
        }
    }

    static async showCuisine(req, res, next) {
        try {
            const { page, category } = req.query
            console.log(category);
            let ofset = [page - 1] * 10
            let result = {
                order: [['id', 'ASC']],
                limit: 10, offset: page ? ofset : 0,
            }
            if (category) {
                result.where = { categoryId: category }
            }
            const cuisine = await Cuisine.findAll(result)
            res.json(cuisine)

        } catch (err) {
            next(err)
        }
    }

    static async detailMenu(req, res, next) {
        try {
            const cuisineId = +req.params.id
            const cuisine = await Cuisine.findByPk(cuisineId)
            if (!cuisine) {
                throw { name: "NotFound" }
            }
            res.status(200).json(cuisine)

        } catch (err) {
            next(err)
        }
    }

    static async order(req, res, next) {
        try {
            const cuisineId = await Cuisine.findByPk(+req.params.id)
            if (!cuisineId) {
                throw { name: "NotFound" }
            }
            const newOrder = await Order.create({ customerId: req.user.id, cuisineId: +req.params.id })
            res.status(201).json({ message: `New order with id ${newOrder.id} added` })
        } catch (err) {
            next(err)
        }
    }

    static async showOrder(req, res, next) {
        try {
            const order = await Order.findAll({
                where: { customerId: req.user.id },
                include: Cuisine,
                order: [['id', 'ASC']],

            })
            res.json(order)

        } catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async qrCode(req, res, next) {
        try {
            const id = +req.params.id
            const {data} = await axios({
                url: `https://api.qr-code-generator.com/v1/create?access-token=S4H9AF5O8MnME8jL4YGw3XG-Scntb2Hb59QsWbIJRM7T5mTeQYp0TMEz9I9N4bLV`,
                method: `post`,
                data: {
                    "frame_name": "no-frame",
                    "qr_code_text": `http://localhost:5173/detail/${id}`,
                    "image_format": "SVG",
                    "qr_code_logo": "scan-me-square"
                }
            })
            res.status(201).json(data);
        } catch (err) {
            console.log(err);
        }
    }
}
module.exports = customerController