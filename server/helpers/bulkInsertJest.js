const { Customer, Order, Cuisine, User, Category } = require('../models')
const { hashPassword } = require('./bcrypt')

async function bulkInsertCustomers() {
    await Cuisine.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    await Order.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    await User.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    await Category.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
    await Customer.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    await User.bulkCreate([
        {
            username: "Ferdi",
            email: "ferdi@gmail.com",
            password: "12345678",
            role: "admin",
            phoneNumber: "081234567890",
            address: "Jl. Pengelapan Uang"
        }
    ])
    await Category.bulkCreate([
        {
            name: "Nasi Warkop"
        },
        {
            name: "Olahan Indomie"
        },
        {
            name: "Minuman"
        },
        {
            name: "Cemilan"
        },
        {
            name: "Tambahan"
        }
    ])
    await Cuisine.bulkCreate([
        {
            name: "Indomie Goreng",
            description: "Cintai usus mu makan indomie goreng tiap hari",
            stock: 13,
            price: 5000,
            imgUrl: "https://m.media-amazon.com/images/I/71B4YNvwCtL._SL1500_.jpg",
            status: "Active",
            authorId: 1,
            categoryId: 2
        }
    ])
    await Customer.bulkCreate([
        {
            email: 'prop@mail.com',
            password: hashPassword('12345'),
            role: "customer"
        },
        {
            email: 'emit@mail.com',
            password: hashPassword('12345'),
            role: "customer"
        }
    ])
    await Order.bulkCreate([
        {
            customerId: 1,
            cuisineId: 1
        }
    ])
}

module.exports = bulkInsertCustomers