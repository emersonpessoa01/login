### Preview: [app]()
### Descrição:
- Backend vinculado ao Frontend(client)<br>
- "npm run dev" para iniciar tanto api quanto o front<br>
- Rota raiz: localhost:3002/api<br>
- Métodos get, post, patch e delete.Todos testados.Ok!<br> 
- Repositório Github integrado com a Heroku<br>

### Install:
`npm install bcrypt`<br>
`npm install cookie-parser>`<br>
`npm install cors`<br>
`npm install dotenv`<br>
`npm install express`<br>
`npm install mongodb`<br>
`npm install mongoose`<br>
`npm install mongoose-date-format -D`<br>
`npm install path`<br>
`npm install concurrently -D`<br>

### scripts backend:
`"client": "npm start --prefix client",`<br>
 `"dev": "concurrently \"npm run server\" \"npm run client\"",`<br>    
 `"server": "nodemon index.js",`<br>
 `"start": "node index.js",`<br>
 `"heroku-postbuild": "cd client && npm install && npm run build"`<br>

 ### Install frontend:
 * cd client<br>
 * npm install @material-ui/core<br>
 * npm install ou yarn add @material-ui/icons<br>



