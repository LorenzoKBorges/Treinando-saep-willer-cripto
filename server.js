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
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
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
})