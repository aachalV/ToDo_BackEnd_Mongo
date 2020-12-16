# ToDo_BackEnd_Mongo
Implemented CRUD operations for ToDoList (Backend) using MongoDb

- Created an express api for creating a to do application.
- MongoDb is used as a storage.
- HTTP Methods are used for implementing the api endpoints
> - get()
> - post()
> - patch()
> - delete()
## Features
- The application provides end points for the following CRUD operation
  1. Create a task
  2. Read all tasks
  3. Read a single task based on a taskId sent in a route parameter
  4. Update the status of task from pending to complete.
  5. Delete a task
  
## Getting started
  1. Clone the repo
  2. Use "npm run start" command to start the server
  3. Start Mongo in shell version using following commands
  - In terminal
    > - systemctl start mongod
    > - systemctl status mongod
    > - mongo
  4. Open Mongo Compass
  - Connect Locally 
    > by keeping "Paste your connection string" empty and click connect
    
    #### OR
  - On Cloud using MongoDB Atlas
    >  - if you use MongoDB Atlas then make changes in "config.env" file
  5. Test using **Postman**
  
### The end points shall be tested using Postman using following requests
  > - data will be sent back as json objects
  1. To create to do item use request
   >Post : (http://localhost:3000/todoList/tasks)

  2. To Read all the Tasks use request
   >Get : (http://localhost:3000/todoList/tasks)

  3. To get task by id use request
   >Get : (http://localhost:3000/todoList/tasks/33tg5cv4kir5ifha)
   >- here "33tg5cv4kir5ifha" is id of the task
   >- replace this id with taskId of task in your data base
  
  4. To Update task by id use request
   > Patch : (http://localhost:3000/todoList/tasks/33tg5cv4kir5ifha)
   > - here "33tg5cv4kir5ifha" is id of the task
   > - replace this id with taskId of task in your data base
   
  5. To delete task by id use request
   > Delete : (http://localhost:3000/todoList/tasks/33tg5cv4kir5ifha)
   > - here "33tg5cv4kir5ifha" is id of the task
   > - replace this id with taskId of task in your data base
