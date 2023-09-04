const { comparePassword } = require('../helpers/bcrypt')
const { signToken, verifyToken } = require('../helpers/jwt')
const { User, Category, Cuisine } = require('../models')
const { OAuth2Client } = require('google-auth-library');

class userController {
    static async adminRegister(req, res, next){
        // get name emai; pass dari req body
        // validate apakah semua ada? -> model
        // create
        try {
            const { username, email, password, phoneNumber, address } = req.body
            console.log(req.body);
            const user = await User.create({ username, email, password, role: "admin", phoneNumber,  address})
    
            res.status(201).json({ message: `user with ${user.email} has been created` })

        } catch (err) {
            next(err)
        }

    }

    static async login (req, res, next){
        // get name emai; pass dari req body
        // validate apakah semua ada? 
        // find dulu dari db -> email
        // kalo ga ada berarti user belum registrasi
        // cek password
        // create token
        // token kita return
        try {
            const { email, password } = req.body
            console.log(req.body);
            if (!email) {
                throw { name: "emailInvalid" }
            }
            if (!password) {
                throw { name: "passInvalid" }
            }
    
            // const user = await User.findOne({ where: { email } })
            const [user] = await User.findAll({ where: { email } })
    
            if (!user) {
                throw { name: "JsonWebTokenError"}
            }
    
            const isValidPass = comparePassword(password, user.password)
            if (!isValidPass) {
                throw { name: "JsonWebTokenError"}
            }
    
            const access_token = signToken({
                id: user.id,
                email: user.email,
                role: user.role
            })

            res.json({ access_token, user })

        } catch (err) {
            next(err)
        }
    }

    static async loginGoogle (req, res, next){
        try {
            const client = new OAuth2Client(process.env.GOOGLE_CLIENTID)
            const token = req.headers.google_token;

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENTID,
            })

            const payloadGoogle = ticket.getPayload()
            // console.log(payloadGoogle);

            const [user, created] = await User.findOrCreate({
                where: {
                    email: payloadGoogle.email
                },
                defaults: {
                    email: payloadGoogle.email,
                    username: payloadGoogle.name,
                    password: `1234567`,
                    role: `staff`
                },
                hooks: false
            })
            // console.log(created);

            const access_token = signToken({
                email: user.email,
                username: user.username,
                password: user.password,
                role: user.role
            })


            res.json({ access_token, user })

        } catch (err) {
            next(err);
        }
    }
}

module.exports = userController