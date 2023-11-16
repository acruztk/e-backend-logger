# TEST BACKEND LOGGER

Hi, mi name is acxell in this project you can use the basic operation (CRUD)

In this CRUD we will use the following technologies: JOI, for validation of payloads, JWT for the security of our requests and we use prettier and eslint to format and clean code.

# Summanry

1.- Instalation of dependecys
2.- Documentation of API

# Instalation
 1.- install the dependencies with the following command ---
    npm i
 2.- Create and set the  ENVIROMENT in the file .env

    ENVIROMENT=LOCAL 
    SECRET_KEY=$E1!d%@#DA!3#

    modify the document databaseConfig.js for set the uri of your database

 --- Run the project with the following comand ---
    npm run start <-- PRODUCTION
    npm run dev <-- Development


# Documentation of API

    For use all operation you will need a token generated by JWT, then use the next operation for create a token

    1.- POST /api/logs/applications
        body params =
                     {
                        name : "",
                     }
        response =
                    {
                        message: "",
                        data: [{
                            name:"",
                            created_at:"",
                            updated_at:"",
                            _id:""
                        }]
                    }
    
    take the generated id and insert it in the following request and you token or password
    2.- POST /api/logs/authorization
        body params =
                     {
                        application_id: "",
                        token: "",
                     }
        response =
                    {
                        "message": "created Succesfully",
                        "data": [
                            {
                                "application_id": "6555bec88ca0b5a67f511fc2",
                                "token": "password12345",
                                "created_at": "2023-11-16T07:07:40.901Z",
                                "updated_at": "2023-11-16T07:07:40.901Z",
                                "_id": "6555bfbc8ca0b5a67f511fc4",
                            }
                        ]
                    }

    3.- POST /api/logs/authorization/generateToken
        boyd params= {
            application_id: "6555bec88ca0b5a67f511fc2",
            token: "password12345"
        }
        response =
                    {
                        "message": "token generated succesfully, this token is valid for 2 hours",
                        "data": {
                            "_id": "6555bfbc8ca0b5a67f511fc4",
                            "application_id": "6555bec88ca0b5a67f511fc2",
                            "token": "password12345",
                            "created_at": "2023-11-16T07:07:40.901Z",
                            "updated_at": "2023-11-16T07:07:40.901Z",
                        },
                        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6InBhc3N3b3JkMTIzNDUiLCJhcHBsaWNhdGlvbl9pZCI6IjY1NTViZWM4OGNhMGI1YTY3ZjUxMWZjMiIsImlhdCI6MTcwMDExODU1OCwiZXhwIjoxNzAwMTI1NzU4fQ.srjnZEwdHSa5plRgU66YpNGTMJSObTbV8_NI1PTZ6cE"
                    }

    4.- well now for use all operations
        For rest of operations you need Authorization
                    header ={
                        "Authorization": "Bearer 'your token generated' "
                     }

        GET /api/logs/applications --> get all applications 
        GET /api/logs/applications/{id} --> get specific application
        PUT /api/logs/applications/{id} --> modify an application
        DELETE /api/logs/applications/{id} --> delete and application

        GET /api/logs/authorization --> get all authorization
        GET /api/logs/authorization/{id} --> get specific authorization
        PUT /api/logs/authorization/{id} --> modify an authorization
        DELETE /api/logs/authorization/{id} --> delete and authorization

        GET /api/logs/log --> get all appliclogations
        GET /api/logs/log/{id} --> get specific log
        PUT /api/logs/log/{id} --> modify an log
        DELETE /api/logs/log/{id} --> delete and log

        for the all metods of get all datas the response is
        {
            "message": "",
            "data": [ ]
        }
        for the especific element the response is 
        {
            "message":"",
            "data": { }
        }
        The response of an update is
        {
            "message":"",
            "data": { }
        }
        The response of an delete is 
        {
            "message":"",
            "data": { }
        }

        in case that not fount the elements data will be null

