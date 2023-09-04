const { History } = require('../models')


class historyController {
    static async showHistory(req, res, next) {
        try {
            const history = await History.findAll({
                order: [[ 'id', 'ASC']]
            })
            res.json(history)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = historyController