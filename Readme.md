# Notes on nodejs and express

What follows is a step by step development experience of someone who started with nodejs and express framework. 

<u>Won't be going into detail of what something is but will be making notes on why something didn't work or why something is done the way it is.</u>

After a set of notes or discussion, code is written, tested and committed. Links to specific code releases are added.



### Installation and Setup

`npm install -g express`

`npm init`

Update your package.json

`npm install`

## Agenda

We will build a simple nodejs application step by step. 

Each release is marked with release tags. Features added in each release is mentioned below along with  concepts and features of javascript/nodejs/expressjs that's explored as part of this project development.

## Developer Notes

What are middleware in express? What does `app.use` do?
http://expressjs.com/en/guide/writing-middleware.html
https://stackoverflow.com/questions/11321635/nodejs-express-what-is-app-use



### Why `body-parser`?

To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.
`body-parser` extracts the entire body portion of an incoming request stream and exposes it on req.body.



## Release 0.0.1

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.1

Scope:

- Basic hello world echoed from `index.js`
- Package.json updated with relavent libraries



## Release 0.0.2

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.2

Scope:

- Add templating - basic hello world from Jade/Pug template
- Package.json updated with relavent libraries



## Release 0.0.3

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.3

Scope:

- Experiment with Pug layout

  

## Release 0.0.4

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.4

Scope:

- Bootstrap theme added
- More Pug template pages added



## Release 0.0.5

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.5

Scope:

- Contact form and send email added (it doesn't work completely yet)



### Setting up Database and Data Access Layer

The commands given below is for creating mongo database on window machine.

`mongod --directoryperdb --dbpath /data/db --logpath /log/mongodb.log --logappend --rest --install`
`net start MongoDB`

I have Mac and it was simpler for me to just go to the location of mongo/bin and run `./mongod`

Then I used Compass for creating, visualizing and manging the databases and documents.

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



### Why and What is Mongoose?

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. A better term is to call that as Object Document Mapper (ODM). It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

Schema and Model are somewhat similar, but there is an underlying difference: Schema defines the structure of the document and Model is responsible for creating and reading documents from MongoDB Database.

Each Schema maps to a Collection and defines the shape of the documents.

Mongoose models provide several helper functions for CRUD operations, namely - 
save(), find(), findById(), findOne(), updateMany() updateOne(), deleteMany(), deleteOne()

Must read for Mongoose:
1. https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
2. https://blog.cloudboost.io/everything-you-need-to-know-about-mongoose-63fcf8564d52



### Difference between various Model callbacks?

`const query = Model.find({}, cb);`
returns a Query object 
`const promise = Model.find({}).exec();`
returns a Promise which is useful if you need promises, then you can work with the promise and do things like:
`promise.then(cb);`
`promise.catch((err) => {console.error(err);});`

But if you do `Model.find({}).exec(cb);` the callback is also called without using promises.



### Why did we add multer?

`bodyparser` cannot handle fileuploads that's why we need `multer`



### Difference between `res.location` and `res.redirect`

res.location just sets the response header. It does not set a response status code or close the response, so you can write a response body if you want, and you have to call res.end() on your own after.
res.redirect on the other hand sets the status to 302, sets the header (using res.location) and sends a nice response body saying that the user is being redirected, and renders a link if their browser doesn't automatically redirect them for some reason.



### Difference between `module.exports` and `exports`?


Thanks to answer here:https://stackoverflow.com/a/16383925/548634
`module` is a plain JavaScript object with an exports property. `exports` is a plain JavaScript variable that happens to be set to module.exports. At the end of your file, node.js will basically 'return' `module.exports` to the require function. 
A simplified way to view a JS file in Node could be this:
```javascript
var module = { exports: {} };
var exports = module.exports;
// your code
return module.exports;
```
If you set a property on exports, like exports.a = 9;, that will set module.exports.a as well because objects are passed around as references in JavaScript, which means that if you set multiple variables to the same object, they are all the same object; so then exports and module.exports are the same object.
But if you set exports to something new, it will no longer be set to module.exports, so exports and module.exports are no longer the same object.
Another pictorial explanation is https://blog.tableflip.io/the-difference-between-module-exports-and-exports/
Use `module.exports` uniformaly.



###  Better handling of callback hell?

The problem in Javascript is that the only way to "freeze" a computation and have the "rest of it" execute latter (asynchronously) is to put "the rest of it" inside a callback.

For example, say I want to run code that looks like this:
```javascript
x = getData();
y = getMoreData(x);
z = getMoreData(y);
```
What happens if now I want to make the getData functions asynchronous, meaning that I get a chance to run some other code while I am waiting for them to return their values? In Javascript, the only way would be to rewrite everything that touches an async computation using continuation passing style:
```javascript
getData(function(x){
    getMoreData(x, function(y){
        getMoreData(y, function(z){ 
            ...
        });
    });
});
```
We face with callback hell because in JavaScript the only way to delay a computation so that it runs after the asynchronous call returns is to put the delayed code inside a callback function. 
> You cannot delay code that was written in traditional synchronous style so you end up with nested callbacks everywhere.
For eg: 
```javascript
// we would like to write the following
for(var i=0; i<10; i++){
    doSomething(i); //i want this to run async
}
blah(); //but this should run only after doSomething has run 10 times
```
We end up with something like this
```javascript
function loop(i, onDone){
    if(i >= 10){
        onDone()
    }else{
        doSomething(i, function(){
            loop(i+1, onDone);
        });
     }
}
loop(0, function(){
    blah();
});
```
Avoid async callbacks and use it only if it's really necessary.


### Choose between `res.redirect` and `res.render`

`res.redirect(someURL)` is for you want to return a 30x status code to the browser and tell the browser to go to a new URL. 
This is often done on the server as part of a login process and occasionally when the user finds themselves at an old URL that has been changed to something different. res.redirect() should only be used for these types of forced navigation to a different URL and should never be part of any standard rendering process.

`res.render(filename, data)` is how one would typically use EJS (or any other template engine plugged into Express) to fill in a template with some data and return the "rendered" HTML page back to the requesting browser so the browser can render it. The URL wouldn't change.

Note that most often after a redirect there will be a render call. Say you redirect to /login and the /login route returns with a render call.



## Release 0.0.6

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.6

Scope:

- Mongo integration using Mongoose
- Sample data created in Mongo
- User registration and login added
- Tons of bugs introduced




### Fixes to be done:

1. Add validation server side  validation
2. Fix current active menu 
3. Push footer down (css fix)
4. Contact form button invisible 
5. Use flash messages without using connect-flash library instead use a custom similar version 
   why? because i wanted to reduce library dependencies using library shadowing (a technique to copy in necessary code)
6. Structuring your data access layer
7. PUG to EJS -> PUG templates was a pain with the formatting and spaces so changed to EJS (Note that EJS doesn't have the concept of templates but instead has includes) 
8. Contact form; Email bug 



## Security - Authentication & Authorization

### What is `req.session` ? 

is just a json object that gets persisted by the express-session middleware, using a store of your choice e.g. Mongo or Redis. 
```json
req.session = { 
    cookie: 
    { 
        path: '/',
        _expires: Thu Nov 07 2014 09:39:45 GMT-0700 (PDT),
        originalMaxAge: 100000,
        httpOnly: true 
    } 
}
```
If you open up your persistence store and look at the documents, you'll see the req.session object is an attribute of the the entire document that also comes with an id and expires attribute.
```json
{
    _id : "svZGs99EIvDkwW_60PRwlafU9Y_7_m-N",
    session : { cookie:{originalMaxAge:100000,expires:"2014-11-07T02:11:16.320Z",httpOnly:true,path:"/"},
    expires : ISODate("2014-11-07T02:11:16.320Z")
}
```
Express stuffs the id of the session object into a cookie on the client's browser, which gets passed back to express in a header on every request.

### Passport

Passport also harnesses `req.session`
```json
req.session = { 
    cookie: 
    { 
        path: '/',
        _expires: Thu Nov 07 2014 09:39:45 GMT-0700 (PDT),
        originalMaxAge: 100000,
        httpOnly: true,
        passport: { user: { _id: '5175efbfa3802cc4d5a5e6ed' } },
    } 
}
```
the passport attribute allows PassportJS to use the session object to keep track of a logged in user associated with a given session.

It then uses the deserializeUser function, which receives req.session.passport.user as its first parameter, and as the default behavior suggested in the PassportJS documentation, makes an additional read to your persistence store to retrieve the user object associated with the userId.
It's best to keep the session information small and only attach user information you actually need (note: some user info should be kept - like for instance the user ID, otherwise passport cannot use its Session Strategy).

However, if you use the deserializeUser method to go and load the user from the db based on the user ID attached to the session, it's better to store the entire user object in the session. This will prevent a roundtrip to the database on every request just to fetch user information.

We could move passport configuration to another file because the passport instance we get back from require('passport') is a singleton. 
So we can just configure express to use the passport middleware in app.js while configuring passport in another file.

There are three main parts in using passport.js:

1. Requiring the module and using its passport.initialize() and passport.session() middleware with express.
2. Configuring passport with at least one Strategy and setting up passport's serializeUser and deserializeUser methods.
3. Specifying a route which uses the passport.authenticate middleware to actually authenticate a user.

### Authentication Request Flow

With the tree parts configured as in the example, the following happens when a user tries the authenticate via the /login route:

1. When the user submits the login form, a POST request to `/login` is made resulting in the execution of the `passport.authenticate` middleware we've set up.
2. As the authenticate middleware for that route is configured to handle the local strategy, passport will invoke our implementation of the local strategy.
3. Passport takes the `req.body.username` and `req.body.password` and passes it to our verification function in the local strategy.
4. Now we do our thing: loading the user from the database and checking if the password given matches the one in the database.
5. In case of an Error interacting with our database, we need to invoke `done(err)`. When we cannot find the user or the passwords do not watch, we invoke `done(null, false)`. If everything went fine and we want the user to login we invoke `done(null, user)`.
6. Calling done will make the flow jump back into passport.authenticate. It's passed the error, user and additional info object (if defined).
7. If the user was passed, the middleware will call `req.login` (a passport function attached to the request).
8. This will call our `passport.serializeUser` method we've defined earlier. This method can access the user object we passed back to the middleware. It's its job to determine what data from the user object should be stored in the session. The result of the serializeUser method is attached to the session as `req.session.passport.user = { // our serialised user object // }`.
The result is also attached to the request as `req.user`.
Once done, our requestHandler is invoked.

### Subsequent Authenticated Requests Flow

On subsequent request, the following occurs:

1. Express loads the session data and attaches it to the req. As passport stores the serialised user in the session, the serialised user object can be found at req.session.passport.user.
2. The general passport middleware we setup (`passport.initialize`) is invoked on the request, it finds the passport.user attached to the session. If is doesn't (user is not yet authenticated) it creates it like `req.passport.user = {}`.
3. Next, `passport.session` is invoked. This middleware is a Passport Strategy invoked on every request. If it finds a serialised user object in the session, it will consider this request authenticated.
4. The `passport.session` middleware calls `passport.deserializeUser` we've setup. `deserializeUser` receives `req.session.passport.user` as its first parameter, and as the default behavior suggested in the PassportJS documentation, makes an additional read to your persistence store to retrieve the user object associated with the userId. Attaching the loaded user object to the request as req.user.

Thanks to http://toon.io/understanding-passportjs-authentication-flow/

### The complete authentication code

```javascript
var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
// the mapping of username and password fields can be skipped as is needed if you are using something else like email & pass.
passport.use('local', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'   
    },
    function verify(username, password, done) {
		dao.User
            .findOne({
				username: username
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				if (user.password != password) {
					return done(null, false);
				}
				return done(null, user);
			});
    }
));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	dao.User.findById(id, function (err, user) {
	    if (err) { return cb(err); }
	    cb(null, user);
	});
});

app.use(cookieParser());
app.use(session({
	//genid can be ommitted; the default value is a function which uses the uid-safe library to generate IDs.
	genid: (req) => {
		console.log('Inside session middleware genid function')
		console.log(`Request object sessionID from client: ${req.sessionID}`)
        //The req.session.id property was added as an alias for the folks who wanted req.sessionID to be available within the req.session object.
        return req.sessionID || uuid.v4();
	},
	//store can be ommitted since we used the default MemoryStore
	store: new session.MemoryStore,
	//the secret used to sign the session ID cookie
	secret: 'keyboard cat',
	//if you alter the req.session object, it will be saved back to the session store at the end of the request; 
	//otherwise it will not be saved. Setting resave to true forces it to be saved everytime, even if no changes were made. 
	//It might seem illogical but certain stores might require this.
	resave: false,
	//forces a session that is "uninitialized" to be saved to the store. 
	//a session is uninitialized when it is new but not modified. Choosing false is useful for implementing login only sessions, 
	//reducing server storage usage, or complying with laws that require permission before setting a cookie. 
	//You can choose to only save sessions (i.e, saving the object in the given Session Store) if they deviate from the default session object (ie. if you've modified it, like setting req.session.user = user; on login) by setting saveUninitialized to false.
	//choosing false will prevent a lot of empty session objects being stored in the session store and 
	//also help with race conditions where a client makes multiple parallel requests without a session.
	//ecommerce sites will use a true value since you need to track recurring guest visitors
    saveUninitialized: false
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());

//In the controller

login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    //do any validation here

    //invoke local strategy of passport
    passport.authenticate(
        'local', 
        {
            successRedirect: '/',
            failureRedirect: '/error' 
        })(req, res, next); // <=== Do not forget to add these; the callback needs to invoke the middleware with req, res, next
    } 
```

### What the heck is `req.user` ?

`req.user` is a PassportJS specific property that is the result of the deserializeUser function using the data from `req.session.passport.user`. The assignment from `req.session.passport.user` to `req.user` is probably done by the `done` callback. 


### Flash Messages

Flash messaging in Express can be confusing to the newcomer. The confusion tends to arise from the distinction between the concept of flash messaging, a temporary message from the server available to templates, and the various implementations of flash messaging, which include express-flash and other modules. 

The express-flash module exposes getter and setter methods for a flash message of the form, `{ flash: { type: 'type', message: 'message' }}` and depends on the express-session module. The method `req.flash(type, message)` sets the value of a new flash message and adds it to an array of messages of the same type. 
The method `req.flash(type)` gets the value of all flash messages matching of the same type and returns either a string value for the message if there is only 1 of that type, or an array of string values for messages matching that type. The flash messages have a lifetime of one request and are deleted afterward.

```javascript
var flash = require('express-flash');
app.use(flash());
// Route that creates a flash message using the express-flash module
app.all('/express-flash', function( req, res ) {
    req.flash('success', 'This is a flash message using the express-flash module.');
    res.redirect(301, '/');
});
// Route that incorporates flash messages from either req.flash(type)
app.get('/', function( req, res ) {
    res.render('index', { expressFlash: req.flash('success') });
});
```

This is simple and straightforward, instead of including a library for this we could create our custom middleware.
Following https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423
Following the tutorial, `res.locals.sessionFlash` acts as a the getter and `req.session.sessionFlash` acts as the setter for messages with a lifetime of one request.  As in the express-flash module, these flashes take the form, `{ type: 'type', message: 'message' }`, but only do so to follow established convention.

There are a couple of important distinctions between the 2 approaches illustrated above.
- First, the custom middleware option exposes all of the properties of the flash object, not just the message. 
- Second, the custom middleware does not include a mechanism for adding multiple messages of the same type to an array.



### Fixes to be done:

1. Add validation server side  validation -> done
2. Fix current active menu -> done (to some extend, a better approach is to handle it on the client side based on current url)
3. Push footer down -> done
4. Contact form button invisible -> done
5. Use flash messages without using connect-flash library instead use a custom similar version 
   why? because i wanted to reduce library dependencies using library shadowing (a technique to copy in necessary code)-> done; see below
6. Structuring your data access layer -> done
7. PUG to EJS -> PUG templates was a pain with the formatting and spaces so changed to EJS (Note that EJS doesn't have the concept of templates but instead has includes) -> done
8. Contact form; Email bug -> fixed



## Release 0.0.7

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.7

Scope:

- All the above security and bug fixes

- Pug to EJS transition

- Code restructuring

  

### Upgrading to ES 6,7 and 8 updates

The following are the features available ine ES6+ we can take a look at how to apply any of this to the code.

1. change to ES6 practice of using const or let (not var)
    var used in blocks will be hoisted and the outer scope
    let provides block scope

2. choosing correctly between { } imports - called object destructuring 
	Note: https://stackoverflow.com/a/53998071/548634

3. Aysnc and Await and Promise

4. Backticks for template strings 

```javascript
`${value +2} some line
line 2 str`
```

5. Destructuring objects and Spread operator

```javascript
const { firstname, lastname} = jsonobject
const { firstname: fn, lastname: ln } = jsonobject
let [firstobj, secondobj, ...others] = jsonarray
let array2 = [...array1] //creates a new array
```

6. Object literals

```javascript
fun(a ,b) {
	return {a, b}
}
creates {'a': a, 'b':b}

function addressMaker(adder){
	const newAddress = {
		city: adder.city,
		state: adder.state,
		country: 'US'
	};
}

function addressMaker(adder){
	const {city, state} = adder
	const newAddress = {
		city,
		state,
		country: 'US',
		..others
	};
}
```


7. For of - loops

```javascript
let incomes = [100, 200, 300]
let total = 0
for (const income of incomes) {
	total += income
}
```
Works with any Iterable; best practice to use const so that it doesn't get modified accidently


8. Rest operator

```javascript
To get the args out of function
function(nums) {
	console.log(arguments)//deprecated
}

function(...nums) {
	nums is a array that can be accessed inside
}
```


9. Arrow function

replace callbacks with => : but this is not available
```javascript
let totals = nums.reduce(function(x, y) { return x+y;});
let totals = nums.reduce((x, y) => { return x+y; });
let totals = nums.reduce((x, y) => x+y);
```


10. Default parameter

```javascript
function add(numArray = []) {
	let total =0;
	numArray.forEach( (e) => totals=e)
}
```

11. Includes
to check if an array had a value we used to say numArray.indexOf(num) => -1 if not 
`numArray.includes(num) -> returns true/false`
12. Classes, static functions and get
13. Trailing commas
14. Sets
15. Modules 



### Module system in Javascript (ES6+)

#### What is a module?

A module is just a file. One script is one module.

`export` keyword labels variables and functions that should be accessible from outside the current module.
`import` allows the import of functionality from other modules.

Features:

- Modules always use strict, by default.

- Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts.

- Module code is evaluated only once the first time it is imported.

  This helps in safely using it for initialization - configure modules on first import

  ```javascript
  // 📁 admin.js
  export let admin = { };
  
  export function sayHi() {
    alert(`Ready to serve, ${admin.name}!`);
  }
  
  // 📁 init.js
  import {admin} from './admin.js';
  admin.name = "Pete";
  
  // 📁 other.js
  import {admin, sayHi} from './admin.js';
  alert(admin.name); // Pete
  sayHi(); // Ready to serve, Pete!
  ```

  

- The object `import.meta` contains the information about the current module; it depends on the current environment

- In a module `this` is undefined

  ```html
  <script>
    alert(this); // window
  </script>
  
  <script type="module">
    alert(this); // undefined
  </script>
  ```

- Browser-specific features

  - module scripts are always deferred; same effect as defer attribute for both external and inline scripts. That is, it is loaded in parallel with other resources. 

  - As a side-effect, module scripts always “see” the fully loaded HTML-page, including HTML elements below them.

    ```html
    <script type="module">
      alert(typeof button); // object: the script can 'see' the button below
      // as modules are deferred, the script runs after the whole page is loaded
    </script>
    
    Compare to regular script below:
    
    <script>
      alert(typeof button); // Error: button is undefined, the script can't see elements below
      // regular scripts run immediately, before the rest of the page is processed
    </script>
    
    <button id="button">Button</button>
    ```

    Please note: the second script actually runs before the first! So we’ll see `undefined` first, and then `object`.

  - async works on inline scripts

    For non-module scripts, the `async` attribute only works on external scripts. Async scripts run immediately when ready, independently of other scripts or the HTML document.

    For module scripts, it works on inline scripts as well.

  - External scripts that have `type="module"` are different in two aspects:

    1. External scripts with the same `src` run only once
    2. External scripts that are fetched from another origin (e.g. another site) require [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers

  - No bare modules allowed

    In the browser, `import` must get either a relative or absolute URL. Modules without any path are called “bare” modules. Such modules are not allowed in `import`.

    For instance, this `import` is invalid:

    ```javascript
    import {sayHi} from 'sayHi'; 
    ```

  - Old browsers do not understand `type="module"`.

- Criteria for Export and Import

  - Export can be placed in front of variable, function or class

  - Export can be done as part of declaration or later separately - no difference

  - Import *  - will import whatever is exposed in the module; think twice before you use it

    - modern build tools bundle only necessary imports; removes unused stuff
    - explicitly listing what to import gives shorter names: `sayHi()` instead of `say.sayHi()`
    - gives better overview to the reader

  - Import as - alias naming

  - Export as - alias naming

  - Good practice is to export a single functionality or entity (class or object) instead of a pack of functions

  - Export default - says export only this from this module

    | Named export              | Default export                    |
    | ------------------------- | :-------------------------------- |
    | `export class User {...}` | `export default class User {...}` |
    | `import {User} from ...`  | `import User from ...`            |

  - the confusing "default" name

    ```javascript
    export {sayHi as default}; //same as export default
    ```

- Module import()

  The `import(module)` expression loads the module and returns a promise that resolves into a module object that contains all its exports. It can be called from any place in the code.

  ```javascript
  let modulePath = prompt("Which module to load?");
  
  import(modulePath)
    .then(obj => <module object>)
    .catch(err => <loading error, e.g. if no such module>)
  ```

  

### Promises

Let's look at how and why promises came into the picture.

Consider this piece of code

```javascript
// a function to emulate synch waiting
function wait(ms) {
    var start = Date.now(), now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}
//library code - starts
const checkIfUserIdExists = (id) => {
    console.log('Checking Auth...start');
    //hitting ldap service
    result = null;
    if(id)
        result = true;
    else
        result = false;
    wait(1000);
    console.log('Checking Auth...end');
    return result;
}

const fetchUserDetails = (id) => {
    //hitting remote database
    console.log('Fetching User...start');
    result =  null;
    if(id)
        result = { name: "John" };
    else
        result = null;
    console.log('Fetching User...end');
    wait(500);
    return result;
}
//library code - ends


console.log("before");

user = null;
id = 1;
auth = checkIfUserIdExists(id);
if(auth) {
    user = fetchUserDetails(id);
}
console.log(`Fetched data: ${user.name}`);

console.log("after");

// before
// Checking Auth...start
// Checking Auth...end
// Fetching User...start
// Fetching User...end
// Fetched data: John
// after
```



The above code was synchronous and it's dangerous because of the nature of how javascript works.

JavaScript program is single threaded and all code is executed in a sequence, not in parallel. In JavaScript this is handled by using what is called an *“asynchronous non-blocking I/O model”*. 

What that means is that while the execution of JavaScript is blocking, I/O operations are not. I/O operations are handled in parallel by native threads. 

Meaning no libraries (both out of the box and third-party) would write code that does something costly synchronously.

Essentially it would be something like this -

```javascript
/library code - starts
const checkIfUserIdExists = (id) => {
    console.log('Checking Auth...start');
    //hitting ldap service
    result = null;
    if(id)
        result = true;
    else
        result = false;
    
    console.log('Checking Auth...end');
    setTimeout(() => {
        console.log('Checking Auth...really end');
        return result;
    }, 1000);
   
}

const fetchUserDetails = (id) => {
    //hitting remote database
    console.log('Fetching User...start');
    result =  null;
    if(id)
        result = { name: "John" };
    else
        result = null;
    console.log('Fetching User...end');
    setTimeout(() => {
        console.log('Fetching User...really end');
        return result;
    }, 500);
}
//library code - ends

//user code
console.log("before");

user = null;
id = 1;
auth = checkIfUserIdExists(id);
if(auth) {
    user = fetchUserDetails(id);
}
console.log(`Fetched data: ${user.name}`); //TypeError: Cannot read property 'name' of null

console.log("after");

// before
// Checking Auth...start
// Checking Auth...end
// TypeError: Cannot read property 'name' of null
```

But now we cannot access the results of what is asynchronosly run by the library functions. The only way is using callbacks.

```javascript
console.log("before");

user = null;
id = 1;
checkIfUserIdExists(id, (auth) => {
    if (auth) {
        fetchUserDetails(id, (user) => {
            console.log(`Fetched data: ${user.name}`);
            return user;
        });
        //console.log(`Fetched data: ${user.name}`);
    }
});
//console.log(`Fetched data: ${user.name}`);
console.log("after");

// before
// Checking Auth...start
// Checking Auth...end
// after
// Checking Auth...really end
// Fetching User...start
// Fetching User...end
// Fetching User...really end
// Fetched data: John
```



This would lead to *callback hell* as it creates some most confusing and un-readable code.

Enter **Promises**.

> A Promise is an object that is used as a placeholder for the eventual results of a deferred (and possibly asynchronous) computation.

This sounds exactly like callbacks, but the important differences are in the usage of Promises. Instead of providing a callback, a promise has its own methods which you call to tell the promise what will happen when it is successful or when it fails - making the code look synchronous.

And what happens within a promise can be synchronous or asynchronous - which means the code that runs within the promise can be natively asynchronous (like setTimeout or fs.readFile) or may be not (like the ones you write or natively provided ones like fs.readFileSync).

The constructor syntax for a promise object is:

```javascript
let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});
```
The function passed to new Promise is called the executor. 

When new Promise is created, the executor runs automatically. It contains the producing code which should eventually produce the result.
Its arguments resolve and reject are callbacks provided by JavaScript itself. Our code is only inside the executor.

When the executor obtains the result, be it soon or late, doesn’t matter, it should call one of these callbacks:

- resolve(value) — if the job finished successfully, with result value.
- reject(error) — if an error occurred, error is the error object.

The promise object returned by the new Promise constructor has these internal properties:

- state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.	
  - **Fulfilled:** `onFulfilled()` will be called (e.g., `resolve()` was called)
  - **Rejected:** `onRejected()` will be called (e.g., `reject()` was called)
  - **Pending:** not yet fulfilled or rejected
- result — initially undefined, then changes to value when resolve(value) called or error when reject(error) is called.
  So the executor eventually moves promise to one of these states:

**Promises are eager**, meaning that a promise will start doing whatever task you give it as soon as the promise constructor is invoked.

#### Short history about Promises

Have a look [here](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)

#### Making Promises

We create a promise when a certain task’s completion time is uncertain or too long. Promises are all about making this type of asynchrony easy and effortless. Let’s get to the basics.

A new promise is created by the using the **Promise** constructor. Like this —

```javascript
const myPromise = new Promise((resolve, reject) => {
    if (Math.random() * 100 <= 90) {
        resolve('Hello, Promises!');
    }
    reject(new Error('In 10% of the cases, I fail. Miserably.'));
});
```



Observe that the constructor accepts a function with two parameters.

The `resolve` and `reject` are functions themselves and are used to send back values to the promise object. When the computation is successful or the future value is ready, we send the value back using the `resolve` function. 

If the computation fails or encounters an error, we signal that by passing the error object in the `reject` function.  `reject` accepts any value. However, it is recommended to pass an `Error` object since it helps in debugging by viewing the stacktrace.

In the above example, `Math.random()` is used to generate a random number. In 90% of the cases, the promise will be resolved (assuming equal probability distribution). It will be rejected in the rest of the cases.



####Using Promises

In the above example, we created a promise and stored it in `myPromise`. **How can we access the the value passed by the** `resolve` **or** `reject` **function?**All `Promise` instances have a `.then()` method on them.

```javascript
const myPromise = new Promise((resolve, reject) => {
    if (Math.random() * 100 < 90) {
        console.log('resolving the promise ...');
        resolve('Hello, Promises!');
    }
    reject(new Error('In 10% of the cases, I fail. Miserably.'));
});

// Two functions 
const onResolved = (resolvedValue) => console.log(resolvedValue);
const onRejected = (error) => console.log(error);

myPromise.then(onResolved, onRejected);

// Same as above, written concisely
myPromise.then((resolvedValue) => {
    console.log(resolvedValue);
}, (error) => {
    console.log(error);
});

// Output (in 90% of the cases)

// resolving the promise ...
// Hello, Promises!
// Hello, Promises!
```

#### Important Promise Rules

A standard for promises was defined by the [Promises/A+ specification](https://promisesaplus.com/implementations) community. There are many implementations which conform to the standard, including the JavaScript standard ECMAScript promises.

Promises following the spec must follow a specific set of rules:

- A promise or “thenable” is an object that supplies a standard-compliant `.then()` method.
- A pending promise may transition into a fulfilled or rejected state.
- A fulfilled or rejected promise is settled, and must not transition into any other state.
- Once a promise is settled, it must have a value (which may be `undefined`). That value must not change.

Change in this context refers to identity (`===`) comparison. An object may be used as the fulfilled value, and object properties may mutate.

Every promise must supply a `.then()` method with the following signature:

```
promise.then(
  onFulfilled?: Function,
  onRejected?: Function
) => Promise
```

The `.then()` method must comply with these rules:

- Both `onFulfilled()` and `onRejected()` are optional.
- If the arguments supplied are not functions, they must be ignored.
- `onFulfilled()` will be called after the promise is fulfilled, with the promise’s value as the first argument.
- `onRejected()` will be called after the promise is rejected, with the reason for rejection as the first argument. The reason may be any valid JavaScript value, but because rejections are essentially synonymous with exceptions, I recommend using Error objects.
- Neither `onFulfilled()` nor `onRejected()` may be called more than once.
- `.then()` may be called many times on the same promise. In other words, a promise can be used to aggregate callbacks.
- `.then()` must return a new promise, `promise2`.
- If `onFulfilled()` or `onRejected()` return a value `x`, and `x` is a promise, `promise2` will lock in with (assume the same state and value as) `x`. Otherwise, `promise2` will be fulfilled with the value of `x`.
- If either `onFulfilled` or `onRejected` throws an exception `e`, `promise2` must be rejected with `e` as the reason.
- If `onFulfilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled with the same value as `promise1`.
- If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected with the same reason as `promise1`.

#### Catching Promises

```javascript
const myProimse = new Promise((resolve, reject) => {
  if (Math.random() * 100 < 90) {
    reject(new Error('The promise was rejected by using reject function.'));
  }
  throw new Error('The promise was rejected by throwing an error');
});

myProimse.then(
  () => console.log('resolved'), 
  (error) => console.log(error.message)
);

// Output (in 90% of cases)

// The promise was rejected by using reject function
```

Since error handling is a necessity for robust programs, a shortcut is given for such a case. Instead of writing `.then(null, () => {...})` when we want to handle an error, we can use `.catch(onRejected)` which accepts one callback: `onRejected`.

#### Chaining Promises

`.then()` and .`catch()` **methods always return a promise**. So you can chain multiple `.then` calls together.

```javascript
const delay = (ms) => new Promise(
  (resolve) => setTimeout(resolve, ms)
);

delay(2000)
  .then(() => {
    console.log('Resolved after 2 seconds')
    return delay(1500);
  })
  .then(() => {
    console.log('Resolved after 1.5 seconds');
    return delay(3000);
  }).then(() => {
    console.log('Resolved after 3 seconds');
    throw new Error();
  }).catch(() => {
    console.log('Caught an error.');
  }).then(() => {
    console.log('Done.');
  });

// Resolved after 2 seconds
// Resolved after 1.5 seconds
// Resolved after 3 seconds
// Caught an error.
// Done.
```

It is recommended to use `.catch` and not `.then` with both `onResolved` and `onRejected` parameters. Here’s a case explaining why —

```javascript
const promiseThatResolves = () => new Promise((resolve, reject) => {
  resolve();
});

// Leads to UnhandledPromiseRejection
promiseThatResolves().then(
  () => { throw new Error },
  (err) => console.log(err),
);

// Proper error handling
promiseThatResolves()
  .then(() => {
    throw new Error();
  })
  .catch(err => console.log(err));
```

When you have a `.then` with two callbacks, `onResolved` and `onRejected`, you can only handle errors and rejections of the ***executor\*** function. Suppose that the handler in `.then` also throws an error. It won’t lead to the execution of `onRejected` callback.

But if you have a `.catch` a level below the `.then`, then the `.catch` **catches errors of executor function and the errors of** `.then` handler too.



Thanks to the articles: 

https://codeburst.io/a-simple-guide-to-es6-promises-d71bacd2e13a

https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261

The above article also explains why cancelling is not a good idea and how to do it.

The native `Promise` object has some extra stuff you might be interested in:

- `Promise.reject()` returns a rejected promise.
- `Promise.resolve()` returns a resolved promise.
- `Promise.race()` takes an array (or any iterable) and returns a promise that resolves with the value of the first resolved promise in the iterable, or rejects with the reason of the first promise that rejects.
- `Promise.all()` takes an array (or any iterable) and returns a promise that resolves when *all of the promises* in the iterable argument have resolved, or rejects with the reason of the first passed promise that rejects.

Let's go back to our original example written using promises.

```javascript

//library code - starts
const checkIfUserIdExists = (id) => {
    console.log('Checking Auth...start');
    //hitting ldap service
    result = null;
    if(id)
        result = true;
    else
        result = false;
    
    console.log('Checking Auth...end');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Checking Auth...really end');
            resolve(result);
        }, 1000);
    });
}

const fetchUserDetails = (id) => {
    //hitting remote database
    console.log('Fetching User...start');
    result =  null;
    if(id)
        result = { name: "John" };
    else
        result = null;
    console.log('Fetching User...end');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Fetching User...really end');
            resolve(result);
        }, 500);
    });
}
//library code - ends

//user code
console.log("before");

user = null;
id = 1;
fn = async () => {
    const isAuth = await checkIfUserIdExists(id)
    let user = null;
    if (isAuth) {
        user = await fetchUserDetails(id)
    }
    console.log(`Fetched data: ${user.name}`);
};
fn();

console.log("after");
```

Using the then syntax

```javascript
console.log("before");

user = null;
id = 1;
fn = () => {
    checkIfUserIdExists(id).then( (isAuth) => {
        if (isAuth) {
            fetchUserDetails(id).then( (user) => {
                console.log(`Fetched data: ${user.name}`);
            });
        }
    });
};
fn();

console.log("after");

// before
// Checking Auth...start
// Checking Auth...end
// after
// Checking Auth...really end
// Fetching User...start
// Fetching User...end
// Fetching User...really end
// Fetched data: John
```

Using the new async - await syntax

```javascript
console.log("before");

user = null;
id = 1;
fn = async () => {
    const isAuth = await checkIfUserIdExists(id)
    let user = null;
    if (isAuth) {
        user = await fetchUserDetails(id)
    }
    console.log(`Fetched data: ${user.name}`);
};
fn();

console.log("after");

//expect the same output
```

Now remember the definition of Promise - and the word *possibily asynchronous*

```javascript
// a function to emulate synch waiting
function wait(ms) {
    var start = Date.now(), now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

//library code - starts
const checkIfUserIdExists = (id) => {
    console.log('Checking Auth...start');
    //hitting ldap service
    result = null;
    if(id)
        result = true;
    else
        result = false;
    
    console.log('Checking Auth...end');
    return new Promise((resolve, reject) => {
        wait(1000); //synchronous wait
        console.log('Checking Auth...really end');
        resolve(result);
    });
}

const fetchUserDetails = (id) => {
    //hitting remote database
    console.log('Fetching User...start');
    result =  null;
    if(id)
        result = { name: "John" };
    else
        result = null;
    console.log('Fetching User...end');
    return new Promise((resolve, reject) => {
        wait(500);
        console.log('Fetching User...really end');
        resolve(result);
    });
}
//library code - ends

// user code
console.log("before");

user = null;
id = 1;
fn = async () => {
    const isAuth = await checkIfUserIdExists(id)
    let user = null;
    if (isAuth) {
        user = await fetchUserDetails(id)
    }
    console.log(`Fetched data: ${user.name}`);
};
fn();
console.log("after");

//we can expect the same output and no change to user code
```



## Release 0.0.8

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.8

Scope:

- Almost all the above ES6+ updates

- Service layer introduction

  - Deciding  which service calls should be async 

  - If user code or library code is doing something timetaking/heavy it should be async and encapsulated in a promise

    eg: Send email code

  - If the library code returns a Promise then all is well and use async - await or then clauses 

    eg: Mongoose save method

  - I didn't cover all calls with async only the ones I think is necessary

  - Passport deserialize and serialize can be made async as can be shown here: https://www.wlaurance.com/2018/09/async-await-passportjs-local-strategy but I didn't



## Release 0.0.9

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.9

Scope:

- Optimize passport calls

  We were hitting the database twice on every single API call to populate all the user's information in memory. But in practice, we rarely needed more than the userId in our backend code. So this time around, I've made the decision to stuff the name and email into the session object and avoid making multiple database trips on every single API call. 

  Thanks to this idea from [here](https://www.airpair.com/express/posts/expressjs-and-passportjs-sessions-deep-dive#optimize-passportjs)

- Throw error for registrations if existing email and/or username

  Note that: I used statics instead of methods on Mongoose Model. Perhapes this is a good usecase of when to use statics vs methods.



## Release 0.0.10

Code: https://github.com/john77eipe/NodeJSHandbook/releases/tag/Release_0.0.10

Scope:

- Add support for password encryption and decryption

  I used bcrypt library. But I couldn't get the ES6 imports to work for BCrypt. 

- Added async util methods for the encryption and decryption



### Design Patterns and Principles with MongoDB and Mongoose

- Mongoose opens a pool of 5 reusable connections to a MongoDB database
- This pool of connections is shared with all requests
- Best practice is to open the connections when the application starts up and then leave it open until your application restarts/shutsdown. 
- Mongoose will publish events based on the status of the connection. Note that we have used listeners to listen and log these events
- Mongoose connections may not get disconnected for restarts or shutdown -> To monitor we need to listen to the Node.js process for an event called SIGINT. If you’re using nodemon to automatically restart the application, then you’ll also have to listen to a second event on the Node process called SIGUSR2
- MongoDB Security
  - To install it on a server on the default port without authentication is asking for trouble, especially when one can execute arbitrary JavaScript within a query (e.g. $where [as a vector for injection attacks](https://lockmedown.com/securing-node-js-mongodb-security-injection-attacks/)).
  - MongoDB’s [security checklist](https://docs.mongodb.com/manual/administration/security-checklist/) gives good advice on reducing the risk of penetration of the network and of a data breach. It is easy to shrug and assume that a development server doesn’t need a high level of security. Not so: It is relevant to all MongoDB servers. In particular, unless there is a very good reason to use [mapReduce](https://docs.mongodb.com/manual/reference/command/mapReduce/#dbcmd.mapReduce), [group](https://docs.mongodb.com/manual/reference/command/group/#dbcmd.group), or [$where](https://docs.mongodb.com/manual/reference/operator/query/where/#op._S_where), you should [disable the use of arbitrary JavaScript by setting javascriptEnabled:false in the config file](https://lockmedown.com/securing-node-js-mongodb-security-injection-attacks/). Because the data files of standard MongoDB is not encrypted, It is also wise to [Run MongoDB with a Dedicated User](https://docs.mongodb.com/manual/administration/security-checklist/#run-mongodb-with-a-dedicated-user) with full access to the data files restricted to that user so as to use the operating systems own file-access controls.
- Design a schema whenever possible
  - MongoDB doesn’t enforce a schema. 
  - If you really want to save documents with no consistent schema, you can store them very quickly and easily but retrieval [can be the very devil](https://www.compose.com/articles/mongodb-with-and-without-schemas/).
  - The classic article ‘[6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1)’ is well worth reading, and features like [Schema Explorer](https://studio3t.com/knowledge-base/articles/schema-explorer/) from third-party tools such as Studio 3T is well worth having for regular schema check-ups.
- Changing default collation
  - This can result in more frustration and wasted time than any other misconfiguration. MongoDB defaults to [using binary collation](https://jira.mongodb.org/browse/SERVER-1920). This is helpful to no cultures anywhere. Case-sensitive, accent-sensitive, binary collations 
  - When you create a MongoDB database, use an [accent-insensitive, case-insensitive](https://weblogs.sqlteam.com/dang/archive/2009/07/26/Collation-Hell-Part-1.aspx) collation appropriate to the [languages and culture of the users](https://derickrethans.nl/mongodb-collation-revised.html) of the system. This makes searches through string data so much easier.
- Keep document sizes small
  - MongoDB is happy to accommodate large documents of up to 16 MB in collections, and [GridFS](https://docs.mongodb.com/manual/core/gridfs/#gridfs) is designed for large documents over 16MB. 
  - Because large documents can be accommodated doesn’t mean that it is a good idea. 
- Avoid creating documents with large arrays
  - Documents can contain arrays. It is best to keep the number of array elements well below four figures. If the array is added to frequently, it will outgrow the containing document so that [its location on disk has to be moved](http://docs.mongodb.org/manual/core/data-model-operations/#document-growth), which in turn means [every index must be updated](http://docs.mongodb.org/manual/core/write-performance/#document-growth). A lot of index rewriting is going to take place when a document with a large array is re-indexed, because there is a separate [index entry for every array element](http://docs.mongodb.org/manual/core/index-multikey/). This re-indexing also happens when such a document is inserted or deleted.
  - MongoDB has a ‘[padding factor](https://docs.mongodb.com/manual/core/mmapv1/#record-allocation-strategies)’ to provide space for documents to grow, in order to minimize this problem.
  - You might think that you could get around this by not indexing arrays. Unfortunately, without the indexes, you can run into other problems. Because documents are scanned from start to end, it takes longer to find elements towards the end of an array, and [most operations dealing with such a document would be slow](http://grokbase.com/t/gg/mongodb-user/128r0h5gzw/inserting-into-300-000-size-embedded-array-is-slow-even-w-o-indexes).
- Be aware about the order of aggregation 
  - DBMSs have query optimiser, the queries that you write are explanations of what you want rather than how to get it.
  - MongoDB gives you more control, but at a cost of convenience.
  - For example, you need to make sure that the data is reduced as early as possible in the pipeline via match and ​ project, sorts happen only once the data is reduced, and that lookups happen in the order you intend.
- Be careful when using fast writes
  - Never set MongoDB for high-speed writes with low durability. This ‘file-and-forget’ mode makes writes appear to be fast because your command returns before actually writing anything. If the system crashes before the data is written to disk, it is lost and risks being in an inconsistent state.
  - The MMAPv1 and WiredTiger storage engine both use journaling to prevent this.
  - Journaling will ensure that the database is in a consistent state when it recovers and will save all the data up to the point that the journal is written.
  - To be confident of your writes, make sure that journaling is [enabled (storage.journal.enabled) in the configuration file](https://docs.mongodb.com/manual/reference/configuration-options/#configuration-file) and the commit interval corresponds with what you can afford to lose.
- Don't sort without an index
  - In searches and aggregations, you will often want to sort your data. Hopefully, it is done in one of the final stages, after filtering the result, to reduce the amount of data being sorted. Even then, [you will need an index that can cover the sort](https://studio3t.com/knowledge-base/articles/mongodb-index-strategy/). Either a single or compound index will do this.
  - When no suitable index is available, MongoDB is forced to do without. There is a [32MB memory limit on the combined size of all documents in the sort operation](https://docs.mongodb.org/manual/reference/limits/#Sort-Operations) and if MongoDB hits the limit, it will either produce an error or occasionally [just return an empty set of records](https://www.sitepoint.com/7-simple-speed-solutions-mongodb/).
- Don't use Lookups without indexes
  - Lookups perform a similar function to a SQL join. To perform well, they require an index on the key value used as the foreign key. This isn’t obvious because the use isn’t reported in explain(). 
  - These indexes are in addition to the index recorded by explain() that is used by the match and ​sort pipeline operators when they occur at the beginning of the pipeline. [Indexes can now cover any stage](https://docs.mongodb.com/manual/core/aggregation-pipeline/#aggregation-pipeline-operators-and-performance) an aggregation pipeline.
- Use multi-updates when needed
  - The db.collection.update() method is used to modify part or all of an existing document or replace an existing document entirely, depending on the update parameter you provide.
  - It is less obvious that it doesn’t do all the documents in a collection unless you set the multi parameter to update all documents that match the query criteria.
- The order of keys in a hash object matters
  - In JSON, an object consists of an unordered collection of zero or more name/value pairs, where a name is a string and a value is a string, number, boolean, null, object, or array.
  - Unfortunately, BSON attaches significance to order when doing searches. [The order of keys within embedded objects matters in MongoDB](http://devblog.me/wtf-mongo), i.e. { firstname: "Phil", surname: "factor" } does not match { { surname: "factor", firstname: "Phil" }. This means that you have to preserve the order of name/value pairs in your documents if you want to be sure to find them.
- Avoid using undefined
  - The ‘undefined’ value has never been valid in JSON, according to the [official JSON standard](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf) (ECMA-404, Section 5), despite the fact that it is used in JavaScript. Furthermore, it is ‘deprecated’ in BSON and converted to $null which isn’t always a happy solution. [Avoid using ‘undefined’ in MongoDB](https://github.com/meteor/meteor/issues/1646#issuecomment-29682964).
- Use sort() with limit()
  - Often, when you are developing in MongoDB, it useful to just see a sample of the results that are returned from a query or aggregation. limit() serves this purpose, but it should never be in the final version of the code, unless you first use ​sort(). 
  - This is because you can’t otherwise guarantee the order of the result and you won’t be able to reliably ‘page’ through data. You get different records in the top of the result depending on the way you’ve sorted it.



References: https://www.infoq.com/articles/Starting-With-MongoDB/


#### Mongoose terminologies

- Mongoose schema resembles the data (synonymous to class in java)
- Mongoose model objects are a compiled version of the schemas (synonymous to objects created from classes)
- All data interactions in Mongoose goes through model
- Schema contains `path (attribute) name: properties like data type`
- Data types supported:
  - String - Any string, UTF-8 encoded 
  - Number - default support is enough for most cases 
  - Date - Typically returned from MongoDB as an ISODate object 
  - Boolean - True or false 
  - Buffer - For binary information such as images 
  - Mixed - Any data type 
  - Array - Can either be an array of the same data type, or an array of nested sub-documents 
  - ObjectId - For a unique ID in a path other than _id; typically used to reference _id paths in other documents 
- Other properties commonly used are:
  - default values
  - required
- Document embedding (subdocuments)
  - is done using nested schema
  - very much like a standard document
  - they have there own schema and each is given a unique _id by MongoDB when created
  - they can only be accessed as a path of that parent document


Notes:

- How to return **id** instead of the internal **_id** 

  In Mongoose, you can use 'virtuals', which are essentially fake fields that Mongoose creates. They're not stored in the DB, they just get populated at run time:

  ```js
  // Duplicate the ID field.
  Schema.virtual('id').get(function(){
      return this._id.toHexString();
  });
  
  // Ensure virtual fields are serialised.
  Schema.set('toJSON', {
      virtuals: true
  });
  ```

  Any time toJSON is called on the Model you create from this Schema, it will include an 'id' field that matches the _id field Mongo generates. Likewise you can set the behaviour for toObject in the same way.
  Latest versions of Mongoose supports this out of the box.

  However, to **export** this field to **JSON**, it's still required to **enable** serialization of virtual fields:

  ```js
  Schema.set('toJSON', {
      virtuals: true
  });
  ```

  

- A common gotcha with [Mongoose populate](https://mongoosejs.com/docs/populate.html) is that you can't filter by fields in the foreign collection. For example, suppose you have 2 models: `Book` and `Author`, and you want to filter books by the author's name.

  ```javascript
  // 2 models: Book and Author
  const Book = mongoose.model('Book', Schema({
    title: String,
    author: {
      type: mongoose.ObjectId,
      ref: 'Author'
    }
  }));
  const Author = mongoose.model('Author', Schema({
    name: String
  }));
  
  // Create books and authors
  const [author1, author2] = await Author.create([
    { name: 'Michael Crichton' },
    { name: 'Ian Fleming' }
  ]);
  const books = await Book.create([
    { title: 'Jurassic Park', author: author1._id },
    { title: 'Casino Royale', author: author2._id }
  ]);
  
  // Populate books and filter by author name.
  const books = Book.find().populate({
    path: 'author',
    match: { name: 'Ian Fleming' }
  });
  
  books.length; // 2
  books[0].author; // null
  books[1].author; // { name: 'Ian Fleming' }
  ```

  In the above example, even though the [populate `match`](http://thecodebarbarian.com/mongoose-5-5-static-hooks-and-populate-match-functions#populate-match-function) filters based on the author's name, Mongoose still returns all the books, including those whose `author.name` doesn't match. If `author.name` isn't `'Ian Fleming'`, the book's `author` property will be `null`.

  That's because, under the hood, 

  Mongoose translates `Book.find().populate('author')` into 2 queries:

	1. `const books = await Book.find({})`

	2. `Author.find({ _id: { $in: books.map(b => b.author) }, name: 'Ian Fleming' })`

   So `populate()` finds all books first, and then finds the corresponding authors.

   If you need to filter books by the author's name in a performant way, the right way is to store the author's name in the book document:

   ```javascript
   // 2 models: Book and Author
   const Book = mongoose.model('Book', Schema({
     title: String,
     author: {
       type: mongoose.ObjectId,
       ref: 'Author'
     },
     authorName: String
   }));
   
   const authorSchema = Schema({ name: String });
   // Add middleware to update the dereferenced `authorName`
   authorSchema.pre('save', async function() {
     if (this.isModified('name')) {
       await Book.updateMany({ authorId: this.author }, { authorName: this.name });
     }
   });
   const Author = mongoose.model('Author', authorSchema);
   ```

   This way, you can filter and sort by the author's name without an extra `populate()`. 

   The pattern of storing the author's name in the `bookSchema` and updating the book collection every time an author's name changes is called *dereferencing*. Dereferencing, or embedding data from one collection in another collection, is how you can run MongoDB at massive scale without caching solutions like [memcached](https://memcached.org/).

   If you're building a reading app, odds are you will update author names infrequently, but filter and sort books by author name frequently. A handy mnemomic for this rule of thumb is to "store what you query for." Make the queries you execute most frequently fast, at the cost of making infrequent updates slightly slower.

- Versus using lookup

  [MongoDB 3.6 introduced a `$lookup` aggregation operator](http://thecodebarbarian.com/a-nodejs-perspective-on-mongodb-36-lookup-expr) that behaves similarly to a [left outer join](https://www.dofactory.com/sql/left-outer-join). In other words, even if you don't dereference the `author` property, you can use the aggregation framework and `$lookup` to sort books by their author name.

  ```javascript
  const [author1, author2] = await Author.create([
    { name: 'Michael Crichton' },
    { name: 'Ian Fleming' }
  ]);
  await Book.create([
    { title: 'Jurassic Park', author: author1._id },
    { title: 'Casino Royale', author: author2._id }
  ]);
  
  const books = await Book.aggregate([
    {
      $lookup: {
        from: 'Author',
        localField: 'author',
        foreignField: '_id',
        as: 'authorDoc'
      }
    },
    {
      $sort: {
        'authorDoc.name': 1
      }
    }
  ]);
  
  books[0].title; // 'Casino Royale'
  books[1].title; // 'Jurassic Park'
  ```

  Why doesn't Mongoose populate use `$lookup`? The issue comes down to consistent performance. Because `$lookup` executes a separate lookup for every document coming into the `$lookup` stage, [`$lookup`'s performance degrades as `O(n^2)` in case of index misses](http://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs#break-up-one-slow-operation-into-many-fast-operations), which in turn can then cause a [slow train](http://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs).

  On the other hand, Mongoose executes 1 query for each `populate()` call, which leads to better throughput, and only one collection scan in the event of an index miss.

  If you manually update the database or you have a separate app that doesn't correctly update `authorName`, you might have a case where the author's name in the `Book` model doesn't line up with the `Author` model. While update anomalies like this are certainly possible, they are rare in production: the most likely causes are either a manual update to the database that bypasses the app, or a developer using a pattern that bypasses Mongoose middleware.

  ```javascript
  const authorSchema = Schema({ name: String });
  // Add middleware to update the dereferenced `authorName`
  authorSchema.pre('save', async function() {
    if (this.isModified('name')) {
      await Book.updateMany({ authorId: this.author }, { authorName: this.name });
    }
  });
  const Author = mongoose.model('Author', authorSchema);
  
  // Won't trigger the 'save' middleware. You would need a separate `pre('updateOne')`
  // hook to capture this case.
  await Author.updateOne({}, { name: 'test' });
  ```

  If update anomalies occur, they're easy to fix with a migration. It's much easier to identify and fix update anomalies than widespread performance degradation.

  Also, [sometimes data being "out of date" is a feature, not a bug](http://thecodebarbarian.com/managing-embedded-documents-with-monogram#updating-an-existing-document). 
