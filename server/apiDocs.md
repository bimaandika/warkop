# API Docs

## list available endpoints
- `POST /register`
- `POST /login`
- `POST /google-signin`

- `GET /cuisines`
- `POST /cuisines`
- `GET /cuisines/:id`
- `DELETE /cuisines/:id`
- `get /categories`

- `POST /public/register`
- `POST /public/login`
- `POST /public/login-google`
- `GET /public/cuisine`
- `GET /public/cuisine/:id`
- `GET /public/cuisine/qr/:id`
- `GET /public/order/`
- `POST /public/order/:id`

## 1. GET /cuisines
### Response
- Body ( 200 - OK )
    ```json
    {
        "id": "integer",
        "name": "string",
        "description": "string",
        "price": "integer",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer",
        "createdAt": "string",
        "updatedAt": "string"
    }
    ```
- Body ( 500 - Internal Server Error )

    ```json
    { message: `internal server error`}
    ```
## 2. POST /cuisines
### Request
- Body

    ```json
    {
        "name": "string",
        "description": "string",
        "price": "integer",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
    }
    ```

### Response
- Body ( 201 - Created )

    ```json
    { message: `New Cuisine Added` }
    ```
- Body ( 400 - BadRequest )

    ```json
    { message: `Field Is Required!`}
    ```
- Body ( 500 - Internal Server Error )

    ```json
    { message: `internal server error`}
    ```

## 3. GET /cuisines/:id
### Request
- Params
    ```json
    { id: "integer" }
    ```
- Body

    ```json
    {
        "name": "string",
        "description": "string",
        "price": "integer",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
    }
    ```

### Response
- Body ( 201 - Created )

    ```json
    {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "imgUrl": "string",
    "authorId": "integer",
    "categoryId": "integer",
    "createdAt": "string",
    "updatedAt": "string",
    "User": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "password": "string",
        "role": "string",
        "phoneNumber": "string",
        "address": "string",
        "createdAt": "string",
        "updatedAt": "string"
    },
    "Category": {
        "id": "integer",
        "name": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
    }
    ```
- Body ( 400 - BadRequest )

    ```json
    { message: `cuisine not found` }
    ```
- Body ( 500 - Internal Server Error )

    ```json
    { message: `internal server error`}
    ```

## 4. Delete /cuisines/:id
### Request
- Params
    ```json
    { id: "integer" }
    ```
### Response
- Body ( 200 - OK )

    ```json
    { message: `success to delete` }
    ```
- Body ( 404 - NotFound )

    ```json
    { message: `cuisine not found` }
    ```
- Body ( 500 - Internal Server Error )

    ```json
    { message: `internal server error`}
    ```

## 5. GET /categories
### Response
- Body ( 200 - OK )
    ```json
    {
        "id": "integer",
        "name": "string",
        "createdAt": "string",
        "updatedAt": "string"
    }
    ```
- Body ( 500 - Internal Server Error )

    ```json
    { message: `internal server error`}
    ```

## 6. POST /register
### Response
- Body ( 200 - OK )
    ```json
    {
        {"message": "user with ${user.email} has been created"}
    }
    ```

- Body ( 400 - Required )
    ```json
    {
        {"message": "name is required"}
    }
    ```

## 7. POST /login
### Response
- Body ( 200 - OK )
    ```json
    {
        {"message": "login success"}
    }
    ```

- Body ( 400 - JsonWebTokenError )
    ```json
    {
        {"message": "invalid token"}
    }
    ```

- Body ( 400 - Required )
    ```json
    {
        {"message": "email or password is required"}
    }
    ```

## 8. POST /google-signin
### Response
- Body ( 200 - OK )
    ```json
    {
        {"message": "login success"}
    }
    ```
### Response

- Body ( 200 - OK )

  ```json
  {"<access_token>" }
  ```

## 9. POST /categories
### Request
- Body

    ```json
    {
        {"name": "string"}
    }
    ```

### Response
- Body ( 201 - Created )

    ```json
    { message: `New Category Added` }
    ```
- Body ( 400 - BadRequest )

    ```json
    { message: `Field Is Required!`}
    ```
## 10. Delete /categories/:id
### Request
- Params
    ```json
    { id: "integer" }
    ```
### Response
- Body ( 200 - OK )

    ```json
    { message: `success to delete` }
    ```
- Body ( 404 - NotFound )

    ```json
    { message: `category not found` }
    ```

## 11. Get /histories
### Request
### Response
- Body ( 200 - OK )

    ```json
    {
        "id": "integer",
        "title": "string",
        "description": "string",
        "updatedBy": "string",
        "createdAt": "date",
        "updatedAt": "date"
    }
    ```
## 10. Put /cuisines/:id
### Request
- Params
    ```json
    { id: "integer" }
    ```
### Response
- Body ( 200 - OK )

    ```json
    { message: `success to delete` }
    ```
- Body ( 404 - NotFound )

    ```json
    { message: `category not found` }
    ```

## 11. POST /public/register
### Response
- Body ( 200 - OK )
    ```json
    {
        {"message": "user with ${user.email} has been created"}
    }
    ```

- Body ( 400 - Required )
    ```json
    {
        {"message": "name is required"}
    }
    ```

## 12. POST /public/login
### Response
- Body ( 200 - OK )
    ```json
    {
        {"message": "login success"}
    }
    ```

- Body ( 400 - JsonWebTokenError )
    ```json
    {
        {"message": "invalid token"}
    }
    ```

- Body ( 400 - Required )
    ```json
    {
        {"message": "email or password is required"}
    }
    ```

## 13. POST /public/login-google
### Response
- Body ( 200 - OK )
    ```json
    {
        {"message": "login success"}
    }
    ```
### Response

- Body ( 200 - OK )

  ```json
  {"<access_token>" }
  ```

## 14. GET /public/cuisine

### Response

- Body ( 200 - OK )
  ```json
  {
        "name": "string",
        "description": "string",
        "price": "integer",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
  }
  ```

## 15. GET /public/cuisine/:id

- Params
  ```json
  { "id": "integer" }
  ```
### Response

- Body ( 200 - OK )

  ```json
  {
        "name": "string",
        "description": "string",
        "price": "integer",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
  }
  ```

- Body ( 404 - BadRequest )

  ```json
  { "message": `Cuisine not found` }
  ```

## 16. GET /public/order/:id

### Request
- Headers
```json
{
   "access_token" : "string"
}
````

- Params
  ```json
  { "id": "integer" }
  ```

### Response

- Body ( 200 - OK )

  ```json
  {
        "name": "string",
        "description": "string",
        "price": "integer",
        "imgUrl": "string",
        "authorId": "integer",
        "categoryId": "integer"
  }
  ...
  ```

- Body ( 404 - BadRequest )

- (401 - Unathorized)
  ```json
  { "message": `Invalid token` }

## 7. POST /customer/bookmarks/:id

### Request
- Headers
```json
{
   "access_token" : "string"
}
````

- Params
  ```json
  { "id": "integer" }
  ```

- User
  ```json
  { "id"}
  ```
### Response
- Body ( 200 - Created )

   ```json
   {
        "id": 2,
        "customerId": 2,
        "cuisineId": 2,
        "createdAt": "2023-05-30T11:39:32.859Z",
        "updatedAt": "2023-05-30T11:39:32.859Z",
        "Cuisine": {
            "id": 2,
            "name": "Indomie Kuah",
            "description": "Indomie Kuah pake sayur lezat dikala hujan",
            "stock": 13,
            "price": 5000,
            "imgUrl": "https://cf.shopee.co.id/file/fb5d1592dc223d9659835619add43541",
            "status": "Active",
            "authorId": 1,
            "categoryId": 2,
            "createdAt": "2023-05-30T11:39:32.714Z",
            "updatedAt": "2023-05-30T11:39:32.714Z"
        }
    },
   ```
   
- (401 - Unathorized)

````json
   { message: `Invalid token`}
   ```

- Body ( 404 - BadRequest )

   ```json
   { message: `Cuisine not found`}

## Globals

### Errors
- Body ( 500 - Internal Server Error )

    ```json
    { message: `internal server error`}
    ```