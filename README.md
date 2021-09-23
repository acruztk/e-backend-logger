# Backend Test

## In the env file add the following values
```
DB_URL = mongodb+srv://Developer:d3v3l0p3r@api-rest-logger.6pada.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
JWT_SECRET = jwt-2021-september-test-backend-developer
```

## Run the project

1. Install all the project dependencies, run the following command:
```
npm install
```
2. Run the project with the following command:
```
npm run start
```

## API DOCUMENTATION
1. CREATE APPLICATION
**Path:** /api/aplications
**Method:** POST
**Body params:**
```
{
    "name": "my-application-three"
}

name -> application name
```
**Body Response:**
```
{
    "message": "Application created successfully!",
    "aplication": {
        "name": "my-application-three",
        "id": "614ced3f9b7566ee292a9d29"
    }
}
```

2. CREATE TOKEN
**Path:** /api/auth
**Method:** POST
**Body params:**
```
{
    "id": "614ce00ebadef79d2eab02d1"
}

id -> application id
```
**Body Response:**
```
{
    "message": "Authorization created successfully!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNGNlMDBlYmFkZWY3OWQyZWFiMDJkMSIsIm5hbWUiOiJteS1hcHBsaWNhdGlvbi10d28iLCJpYXQiOjE2MzI0MzM0MjIsImV4cCI6MTYzMzY0MzAyMn0.tItmirZ1SZDV77ucyjuQP4nSR2GJpZk5JIkpIon7ayY"
}
```

3. GET ALL LOGS
**Path:** /api/logs
**Method:** GET
**Headers:**
```
{
  "Authorization": "ajshdiurjwnikv"
}

Authorization -> token created in /api/auth
```
**Body response:**
```
{
    "message": "Logs not found!",
    "logs": []
}
```

4. CREATE LOG
**Path:** /api/logs
**Method:** POST
**Body params:**
```
{
    "application_id": "614ce00ebadef79d2eab02d1",
    "type": "error",
    "priority": "low",
    "path": "/messages",
    "message": "error at send message",
    "request": {
        "method": "POST"
    },
    "response": {
        "error": "not fount"
    }
}
all params are required
```
**Body response:**
```
{
    "message": "Log created successfully!",
    "log": {
        "id": "614cebcbd73517a9ec9bfd29",
        "type": "error",
        "priority": "low",
        "path": "/messages",
        "message": "error at send message"
    }
}
```

5. GET LOG BY ID
**Path:** /api/logs/:id
**Method:** GET
**Request params:**
```
{
  id: 614cebcbd73517a9ec9bfd29
}
id -> log id
```
**Body response:**
```
{
    "message": "Log found!",
    "logDb": {
        "_id": "614cebcbd73517a9ec9bfd29",
        "application_id": "614ce00ebadef79d2eab02d1",
        "type": "warning",
        "priority": "lowest",
        "path": "/messages",
        "message": "error at send message",
        "request": {
            "method": "POST"
        },
        "response": {
            "error": "not fount"
        },
        "created_at": "2021-09-23T21:04:11.782Z",
        "updadet_at": "2021-09-23T21:55:42.076Z",
        "__v": 0,
        "updated_at": "2021-09-23T22:01:21.368Z"
    }
}
```

6. UPDATE LOG
**Path:** /api/logs/:id
**Method:** PUT
**Request params:**
```
{
  id: 614cebcbd73517a9ec9bfd29
}
id -> log id
```
**Body params:**
```
{
    "type": "warning",
    "priority": "low",
}
all params are optional
```
**Body response:**
```
{
    "message": "Log updated successfully!"
}
```

7. DELETE LOG
**Path:** /api/logs/:id
**Method:** DELETE
**Request params:**
```
{
  id: 614cebcbd73517a9ec9bfd29
}
id -> log id
```
**Body response:**
```
{
    {
    "message": "Log deleted successfully!",
    "result": {
        "_id": "614ceba110f6400bb2af68df",
        "application_id": "614ce00ebadef79d2eab02d1",
        "type": "error",
        "priority": "low",
        "path": "/messages",
        "message": "error at send message",
        "request": {
            "method": "POST"
        },
        "response": {
            "error": "not fount"
        },
        "created_at": "2021-09-23T21:03:29.985Z",
        "updadet_at": "2021-09-23T21:03:29.986Z",
        "__v": 0,
        "updated_at": "2021-09-23T22:07:26.168Z"
    }
}
}