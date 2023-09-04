
const errorHandler = async (err, req, res, next) => {
    // console.log(err);
    if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message })
    } else if (err.name === "wrongEmail") {
        res.status(400).json({ message: "invalid email" })
    } else if (err.name === "wrongPass") {
        res.status(400).json({ message: "invalid password" })
    }else if (err.name === "emailInvalid") {
        res.status(400).json({ message: "email is required" })
    } else if (err.name === "passInvalid") {
        res.status(400).json({ message: "password is required" })
    } else if (err.name === "JsonWebTokenError" || err.name === "InvalidToken") {
        res.status(401).json({ message: "invalid token" })
    } else if (err.name === "NotFoundCategory") {
        res.status(404).json({ message: "category not found" })
    } else if (err.name === "NotFound") {
        res.status(404).json({ message: "cuisine not found" })
    } else if (err.name === "Forbidden") {
        res.status(403).json({ message: "you dont have access" })
    } else if (err.name === "emailUniqe") {
        res.status(401).json({ message: `Your email has been registered` })
    } else if (err.name === "Forbidden") {
        res.status(400).json({ message: `internal server error` })
    } else {
        res.status(500).json({ message: `internal server error` })
    }
}

module.exports = { errorHandler }