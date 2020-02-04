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