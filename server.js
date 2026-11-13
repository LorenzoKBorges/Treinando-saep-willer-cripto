import pool from "./db.js"
import cors from "cors"
import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

const PORT = 3000
const app = express()
const JWT_SECRET = "te_vira_para_ver_a_senha"


app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

<<<<<<< HEAD

function autenticar(req, res, next) {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ mensagem: "Acesso não autorizado. Faça login." });
  
    try {
      const usuario = jwt.verify(token, JWT_SECRET);
      req.usuario = usuario;
      next();
    } catch (err) {
      return res.status(403).json({ mensagem: "Sessão expirada ou inválida." });
    }
  }  
//========================================================================================================================================================================================
app.post("/api/login", async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
      );
  
      const usuario = resultado.rows[0];
  
      if (!usuario) {
        return res.status(401).json({
          mensagem: "E-mail ou senha incorretos.",
        });
      }
  
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
  
      if (!senhaValida) {
        return res.status(401).json({
          mensagem: "E-mail ou senha incorretos.",
        });
      }
  
      const token = jwt.sign(
        {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          cargo: usuario.cargo,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7200000,
      });
  
      return res.json({
=======
//===================================================================================================
//===================================================================================================
 function autenticar(req, res, next){
    const token = req.cookies.token
    if(!token)
        return res.status(401).json({mensagem: "Acesso não autorizado. Faça login."})

    const usuario = jwt.verify(token, JWT_SECRET)


 }
//===================================================================================================
//===================================================================================================



app.post('/clientes/register', async (req, res) =>{
    const {nome, cpf, telefone, senha} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(senha, salt)
    const hashedCPF = await bcrypt.hash(cpf, salt)


    const queryText = 'INSERT INTO clientes (nome, cpf, telefone, senha) VALUES ($1, $2, $3, $4) RETURNING *'
    const novoClientes = await pool.query(queryText, [nome, hashedCPF, telefone, hashedPassword])

    res.json("criado com sucesso")
})








app.post('/aleatorio', async (req, res) =>{
    const {blablabla} = req.body
    const salt = await bcrypt

    const novousuario = await pool.query('INSERT INTO usuarios (asdasdasdsa) VALUES ($1, $2, $3), RETURNING *', [blablabla])
    res.json(novousuario)
})

appe.postar(aluno asinc (requesicao, rezposta) >=(
    
))



//sair disso para isso:
app.post('/clientes/register', async (req, res) =>{
    const {nome, cpf, telefone, senha} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(senha, salt)
    const hashedCPF = await bcrypt.hash(cpf, salt)


    const queryText = 'INSERT INTO clientes (nome, cpf, telefone, senha) VALUES ($1, $2, $3, $4) RETURNING *'
    const novoClientes = await pool.query(queryText, [nome, hashedCPF, telefone, hashedPassword])

    res.json("criado com sucesso")
})










app.post('/barbeiros/register', async (req, res) =>{
    const {nome, cpf, telefone, senha} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(senha, salt)
    const hashedCPF = await bcrypt.hash(cpf, salt)

    const queryText = 'INSERT INTO barbeiros (nome, cpf, telefone, senha) VALUES ($1, $2, $3, $4) RETURNING *'
    const novoBarbeiro = await pool.query(queryText, [nome, hashedCPF, telefone, hashedPassword])
    res.json(novoBarbeiro)
})

//===================================================================================================
//===================================================================================================
app.post('/clientes/login', async (req, res) =>{
    const {nome, cpf, telefone, senha} = req.body
    const queryText = 'SELECT * FROM clientes WHERE nome = $1 AND telefone = $2'
    const user = await pool.query(queryText, [nome, telefone])
    const isPasswordValid = await bcrypt.compare(senha, user.senha)

    if(!isPasswordValid){
        console.log('Credenciais incorretas')
    }

    res.json('Logado com sucesso')
})

app.post('/barbeiros/login', async (req, res) =>{
    const {nome, cpf, telefone, senha} = req.body
    const queryText = 'SELECT * FROM barbeiros WHERE nome = $1 AND telefone = $2 RETURNING *'
    const user = await pool.query(queryText, [nome, telefone])
    const isPasswordValid = await bcrypt.compare(senha, user.senha)

    if(!isPasswordValid){
        console.log('Credenciais incorretas')
    }

    res.json('Logado com sucesso')
})



app.listen(PORT, () =>{
    console.log("Servidor rodando na porta 3000")
})

//===================================================================================================
//===================================================================================================

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query('SELECT * FROM')
    if (!usuario) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const token = jwt.sign(
      {
>>>>>>> f40687c7ec76defb30142cb3cf84e37980734249
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
<<<<<<< HEAD
      });
    } catch (err) {
      return res.status(500).json({
        mensagem: "Erro interno no servidor.",
      });
    }
  });

//==========

  app.post("/api/logout", async (req, res) => {
    res.clearCookie("token");
    return res.json("Sessão terminada");
  });

//========================================================================================================================================================================================

app.get("/api/me", autenticar, (req, res) => {
    return res.json(req.usuario);
});


//========================================================================================================================================================================================

app.listen(PORT, () =>{
    console.log("Servidor rodando na porta 3000")
=======
      },
      JWT_SECRET,
      { expiresIn: "2h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7200000, // 2 horas
    });

    return res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cargo: usuario.cargo,
    });
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
});


app.post('/api/logout', async (req, res) =>{
    res.clearCookie("token")
    return res.json("Sessão terminada")
>>>>>>> f40687c7ec76defb30142cb3cf84e37980734249
})