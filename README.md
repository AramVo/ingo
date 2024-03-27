# How to run

To run the app you need MySql and NodeJS.

> You can use docker to run MySql in the container:

    docker run -e MYSQL_ROOT_PASSWORD=testRoot -e MYSQL_DATABASE=ingo -e MYSQL_USER=testUser -e MYSQL_PASSWORD=testPass -p 3306:3306 --name test-mysql -v mysql:/var/lib/mysql -d mysql

> To run `NestJS` app just create `.env.dev` file and copy/past the content of the `.env.example` into the `.env.dev`. After that run `npm run start:dev`.

# Modules of the app

The app consists of the following modules (besides app module):

1. Users
2. Auth
3. Casco, Health (Those are insurance products, we can add others)
4. Insurance-types

### Users

Users module is used for creating, getting and storing user datas

### Auth

Auth module used for registration and login. Also it provides AuthGuard for checking JWT tokens.

### Casco, Health

Casco and Health modules are used for stroing users insurance infomations.<br>
For adding a new insurance product we can copy one of those modules, the update the model and dto fields, class and property names.

### Insurance-types

Insurance-types module act as a metadata for insurance products. This module has 2 tables `insurance-types` and `insuarance-fields` fields.<br>

`insurance-types` store the insurance products info:
> 1. name - the name of the product that will shown in the front end.
> 2. path - the API path to insurane product. For example: `/casco` and `/health`

<br>

`insurance-fields` stores info about insurance product fields:

> 1. name - the name of the field, for example `firstName`, `email` and etc.
> 2. valueType - the type of the field.
> 3. typeId - this is the foeign key of the insurance type.

#### We can get the insurance type joined with it's fields. The data will look like this:
```{
        "id": 2,
        "name": "Health",
        "path": "/health",
        "createdAt": "2024-03-26T16:05:15.000Z",
        "updatedAt": "2024-03-26T16:05:15.000Z",
        "fields": [
            {
                "id": 6,
                "name": "firstName",
                "valueType": "STRING",
                "typeId": 2,
                "createdAt": "2024-03-26T16:07:45.000Z",
                "updatedAt": "2024-03-26T16:07:45.000Z"
            },
            {
                "id": 7,
                "name": "lastName",
                "valueType": "STRING",
                "typeId": 2,
                "createdAt": "2024-03-26T16:08:08.000Z",
                "updatedAt": "2024-03-26T16:08:08.000Z"
            },
            {
                "id": 8,
                "name": "email",
                "valueType": "STRING",
                "typeId": 2,
                "createdAt": "2024-03-26T16:08:20.000Z",
                "updatedAt": "2024-03-26T16:08:20.000Z"
            },
            {
                "id": 9,
                "name": "age",
                "valueType": "NUMBER",
                "typeId": 2,
                "createdAt": "2024-03-26T16:08:26.000Z",
                "updatedAt": "2024-03-26T16:08:26.000Z"
            },
            {
                "id": 10,
                "name": "healthSpeceficField",
                "valueType": "STRING",
                "typeId": 2,
                "createdAt": "2024-03-26T16:08:32.000Z",
                "updatedAt": "2024-03-26T16:08:32.000Z"
            }
        ]
    }
```

> When we add new insurance product, we need to add appropriate records in the `insurance-types` and `insuarance-fields` tables. This will allow as to not make any changes in the  front end with each new product. <br>
In front end we wiil get this data and then use it to generate appropriate form items based on the insuarance fields and make API calls by using `path` value.