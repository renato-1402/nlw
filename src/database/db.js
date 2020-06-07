//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto que ira fazer operações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")
module.exports =db

//utilizar o objeto do banco de dados, para nossas operações

/* db.serialize(()=>{
    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT, 
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );`
        )
    //inserir dados na tabela
    const query =`INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    )values(?,?,?,?,?,?,?);`

    function alterInsertData(err){
        if (err){
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }
    
    //db.run(query,values alterInsertData)

    //consultar os dados da tabela
    db.all('SELECT * FROM places',function(err, rows){
        if (err){
            return console.log(err)
        }
        console.log("dados")
        console.log(rows)
    })
    // deletar um dado da tabela
    db.run('DELETE FROM places WHERE id=?',[1], function(err){
        if (err){
            return console.log(err)
        }
        console.log("deletado")
    })

}) */