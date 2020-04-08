//usei o express para criar e configurar meu servidor
const express = require('express')
const server = express()

//requisitando o DataBase
    const db = require("./db")

//configurar arquivos estáticos (CSS, scripts, etc)
    server.use(express.static("public"))

//habilitar uso do req.body
    server.use(express.urlencoded({ extended: true }))

//configuração nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

//criei uma rota "/" e capturo o pedido do cliente para responder
server.get("/", function(req, res) {

    db.all(`SELECT * FROM ideas`, function(err, rows) { //* significa "all"
        if (err) {
            return res.send("Erro no banco de dados!")
        }

        const reverseIdeas = rows.reverse()

        let lastIdeas = []
        for(let idea of reverseIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }
    
        return res.render("index.html", {ideas: lastIdeas})
    }) 
})

server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideas`, function(err, rows) {
        if (err) {
            return res.send("Erro no banco de dados!")
        }

        const reverseIdeas = rows.reverse()

        return res.render("ideias.html", {ideas: reverseIdeas})

    })
})

//receptando os dados cadastrados

server.post("/", function(req, res) {
    //Inserir dados
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?, ?, ?, ?, ?);
    `

        const values = [
            req.body.image,
            req.body.title,
            req.body.category,
            req.body.description,
            req.body.link
        ]
        
        db.run(query, values, function(err) {
            if (err) {
                return res.send("Erro no banco de dados!")
            }

            //após cadstrar no sistema...

                return res.redirect("/ideias")

        }) 

})

//liguei meu servidor na porta 3000
server.listen(3000)
