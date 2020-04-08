const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ex002.ideiaspandemia.db')

db.serialize(function() {

    // Criar a tabela

        db.run(`
            CREATE TABLE IF NOT EXISTS ideas(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                title TEXT,
                category TEXT,
                description TEXT,
                link TEXT
            );
        `)

    // Inserir dado na tabela
      /*  
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
            "https://image.flaticon.com/icons/svg/2729/2729007.svg",
            "Curso de Programação",
            "Estudo",
            "Fique em casa e descubra seu potencial de raciocínio lógico nesses cursos para aprender a 'codar'!!!",
            "https://creativeideas.com"
        ]
        
        db.run(query, values, function(err) {
            if (err) return console.log(err)

            console.log(this)
        }) 
    */
    // Deletar um dado da tabela
        /*
        db.run(`DELETE FROM ideas WHERE id=?`, [?], function(err) {
            if(err) return console.log(err)

            console.log("DELETED", this)
        })
        */
    // Consultar dados na tabela
        /*
        db.all(`SELECT * FROM ideas`, function(err, rows) { //* significa "all"
            if (err) return console.log(err)

            console.log(rows)
        }) 
*/
})

module.exports = db