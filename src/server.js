const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar uso do req.body na nossa aplicação

server.use(express.urlencoded({extended:true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express:server,
    noCache:true
})



//configurar caminhos da minha aplicação
//req=requisição
//res=resposta
server.get("/",(req,res)=>{
    return res.render("index.html",{title : "Um titulo"})
})
server.get("/create-point",(req,res)=>{

    //req.query :query strings da nossa url
    //req.query()


    return res.render("create-point.html")
})
server.post("/savepoint",(req,res)=>{

    //req.body = mesmo que o corpo do nosso formulario
    // inserir dados no banco de dados
    const query =`INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    )values(?,?,?,?,?,?,?);`

    const value=[
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function alterInsertData(err){
        if (err){
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html",{saved:true})
    }
    
    db.run(query,value, alterInsertData)

   
})


server.get("/search-results",(req,res)=>{

    const search =req.query.search
    if(search ==""){
        return res.render("search-results.html", { total: 0})
    }
  
  // pegar  os dados do banco
  db.all(`SELECT * FROM places WHERE city ='%${search}%'`,function(err, rows){
    if (err){
        return console.log(err)
    }
    const total = rows.length
    //mostrar a pagina html com os dados do banco de dados
    return res.render("search-results.html", {places: rows, total: total})

})
})

// ligar o servidor
server.listen(3000)

