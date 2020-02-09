A tutorial that builds on nodejs and express

`npm install -g express`

`npm init`

Update your package.json

`npm install`

Notes:

What are middleware in express? What does `app.use` do?
http://expressjs.com/en/guide/writing-middleware.html
https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use

Why `body-parser`?
To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.
`body-parser` extracts the entire body portion of an incoming request stream and exposes it on req.body.

`mongod --directoryperdb --dbpath /data/db --logpath /log/mongodb.log --logappend --rest --install`
`net start MongoDB`

```shell
> show dbs
admin    0.000GB
blogger  0.000GB
config   0.000GB
local    0.000GB
> use nodeauth
switched to db nodeauth
> db.createCollection('users');
{ "ok" : 1 }
> show collections
users
> db.users.insert({"name":"John Eipe", "email":"john77eipe@gmail.com", "password":"123"});
WriteResult({ "nInserted" : 1 })
> db.users.insert({"name":"Riya", "email":"riya@gmail.com", "password":"123"});
WriteResult({ "nInserted" : 1 })
> db.users.find().pretty()
{
	"_id" : ObjectId("5e39309ac48f332398ae052c"),
	"name" : "John Eipe",
	"email" : "john77eipe@gmail.com",
	"password" : "123"
}
{
	"_id" : ObjectId("5e3930b3c48f332398ae052d"),
	"name" : "Riya",
	"email" : "riya@gmail.com",
	"password" : "123"
}
> db.users.update({"name":"John Eipe"},{$set: { "username":"john"}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.update({"name":"Riya"},{$set: { "username":"riya"}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find().pretty()
{
	"_id" : ObjectId("5e39309ac48f332398ae052c"),
	"name" : "John Eipe",
	"email" : "john77eipe@gmail.com",
	"password" : "123",
	"username" : "john"
}
{
	"_id" : ObjectId("5e3930b3c48f332398ae052d"),
	"name" : "Riya",
	"email" : "riya@gmail.com",
	"password" : "123",
	"username" : "riya"
}
```

Note: 
- You can use express generator for creating a project
`npm install express-generator` 
- To install and update package.json in one command
`npm install [library ] --save` 

Why and What is Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

Schema and Model are somewhat similar, but there is an underlying difference: Schema defines the structure of the document and Model is responsible for creating and reading documents from MongoDB Database.

Each Schema maps to a Collection and defines the shape of the documents.

Mongoose models provide several helper functions for CRUD operations, namely - 
save(), find(), findById(), findOne(), updateMany() updateOne(), deleteMany(), deleteOne()