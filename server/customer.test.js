const { describe, test, expect } = require('@jest/globals')
const request = require('supertest')
const models = require('./models')
const bulkInsertCustomers = require('./helpers/bulkInsertJest')
const app = require('./app')

let token = ''

beforeAll(async function () { await bulkInsertCustomers() })
afterAll(async function () { await models.sequelize.close() })

describe('Customer', function () {
    describe('Register Test', function () {
        test('Status (201)', async function () {
            const response = await request(app)
                .post('/public/register')
                .send({ email: "z@mail.com", password: "12345" })
            expect(response.status).toEqual(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
        })
        test('Status (400) ', async function () {
            const response = await request(app)
                .post('/public/register')
                .send({ password: "12345" })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('Email is required')
        })
        test('Status (400)', async function () {
            const response = await request(app)
                .post('/public/register')
                .send({ email: "z@mail.com" })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('Password is required')
        })
        test('Status (400) ', async function () {
            const response = await request(app)
                .post('/public/register')
                .send({ email: "", password: "12345" })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('Email is required')
        })
        test('Status (400)', async function () {
            const response = await request(app)
                .post('/public/register')
                .send({ email: "z@mail.com", password: "" })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('Password is required')
        })
        test('Status (401) ', async function () {
            const response = await request(app)
                .post('/public/register')
                .send({ email: "prop@mail.com", password: "12345" })
            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('Your email has been registered')
        })
        test('Status (400)', async function () {
            const response = await request(app)
                .post('/public/register')
                .send({ email: "z", password: "12345" })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('Invalid email')
        })
    })
    
    describe('Login Test', function () {
        test('Status (200)', async function () {
            const response = await request(app)
                .post('/public/login')
                .send({ email: "prop@mail.com", password: "12345" })
            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('access_token')
            expect(typeof response.body.access_token).toEqual('string')
            token = response.body.access_token
            
        })
        test('Status (400)', async function () {
            const response = await request(app)
                .post('/public/login')
                .send({ email: "prop@mail.com", password: "123456" })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('invalid password')
        })
        test('Status (400)', async function () {
            const response = await request(app)
                .post('/public/login')
                .send({ email: "prop2@mail.com", password: "12345" })
            expect(response.status).toEqual(400)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('invalid email')
        })
    })

    describe('Main Entity test', function () {
        test('GET /cuisine success without access token', async function () {
            const response = await request(app)
                .get('/public/cuisine')
            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            expect(response.body[0]).toHaveProperty('id')
            expect(response.body[0]).toHaveProperty('name')
            expect(response.body[0]).toHaveProperty('description')
            expect(response.body[0]).toHaveProperty('price')
            expect(response.body[0]).toHaveProperty('imgUrl')
            expect(response.body[0]).toHaveProperty('status')
            expect(response.body[0]).toHaveProperty('authorId')
            expect(response.body[0]).toHaveProperty('categoryId')
        })
        test('GET /cuisine success without access token with query parameter', async function () {
            const response = await request(app)
                .get('/public/cuisine?page=1')
            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            expect(response.body[0]).toHaveProperty('id')
            expect(response.body[0]).toHaveProperty('name')
            expect(response.body[0]).toHaveProperty('description')
            expect(response.body[0]).toHaveProperty('price')
            expect(response.body[0]).toHaveProperty('imgUrl')
            expect(response.body[0]).toHaveProperty('status')
            expect(response.body[0]).toHaveProperty('authorId')
            expect(response.body[0]).toHaveProperty('categoryId')
        })
        test('GET /cuisine success with with pagination and length pagination', async function () {
            const response = await request(app)
                .get('/public/cuisine?page=1')
            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            expect(response.body[0]).toHaveProperty('id')
            expect(response.body[0]).toHaveProperty('name')
            expect(response.body[0]).toHaveProperty('description')
            expect(response.body[0]).toHaveProperty('price')
            expect(response.body[0]).toHaveProperty('imgUrl')
            expect(response.body[0]).toHaveProperty('status')
            expect(response.body[0]).toHaveProperty('authorId')
            expect(response.body[0]).toHaveProperty('categoryId')
        })
        test('GET /cuisine success by id params', async function () {
            const response = await request(app)
                .get('/public/cuisine/1')
            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('id')
            expect(response.body).toHaveProperty('name')
            expect(response.body).toHaveProperty('description')
            expect(response.body).toHaveProperty('price')
            expect(response.body).toHaveProperty('imgUrl')
            expect(response.body).toHaveProperty('status')
            expect(response.body).toHaveProperty('authorId')
            expect(response.body).toHaveProperty('categoryId')
        })
        test('GET /cuisine fail id params invalid ', async function () {
            const response = await request(app)
                .get('/public/cuisine/24')
            expect(response.status).toEqual(404)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('cuisine not found')
        })
    })

    describe('Customer test', function () {
        test('GET /customer show order', async function () {
            const response = await request(app)
                .get('/public/order')
                .set('access_token', token)

            expect(response.status).toEqual(200)
            expect(typeof response.body).toEqual('object')
            expect(response.body[0]).toHaveProperty('id')
            expect(response.body[0]).toHaveProperty('customerId')
            expect(response.body[0]).toHaveProperty('cuisineId')
            expect(response.body[0]).toHaveProperty('Cuisine')
        })
        test('POST /customer add order', async function () {
            const response = await request(app)
                .post('/public/order/1')
                .set('access_token', token)

            expect(response.status).toEqual(201)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('New order with id 2 added')
        })
        test('post /customer fail add order by params', async function () {
            const response = await request(app)
                .post('/public/order/24')
                .set('access_token', token)

            console.log(response.body, 'pppp');
            expect(response.status).toEqual(404)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('cuisine not found')
        })
        test('POST /customer fail show order no access token', async function () {
            const response = await request(app)
                .post('/public/order/1')

            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('invalid token')
        })
        test('GET /customer fail show order invalid token', async function () {
            const response = await request(app)
                .get('/public/order/1')
                .set('access_token', token + 'xxx')
            expect(response.status).toEqual(401)
            expect(typeof response.body).toEqual('object')
            expect(response.body).toHaveProperty('message')
            expect(typeof response.body.message).toEqual('string')
            expect(response.body.message).toEqual('invalid token')
        })
    })
})