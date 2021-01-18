### Preview: [app]()
### Descrição
- Backend vinculado ao Frontend(client)<br>
- "npm run dev" para iniciar tanto api quanto o front<br>
- Rota raiz: localhost:3002/api<br>
- Métodos get, post, patch e delete.Todos testados.Ok!<br> 
- Repositório Github integrado com a Heroku<br>

### scripts:
`"client": "npm start --prefix client",`<br>
 `"dev": "concurrently \"npm run server\" \"npm run client\"",`<br>    
 `"server": "nodemon index.js",`<br>
 `"start": "node index.js",`<br>
 `"heroku-postbuild": "cd client && npm install && npm run build"`<br>

