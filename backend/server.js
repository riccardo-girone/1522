const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())



const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "_1522"
})

conn.connect((err) => {
  if (err) {
    console.error("Impossibile connettersi al server:", err.message)
    return
  }
  console.log("Connesso al database con successo!")
})

app.post('/richieste', (req, res) => {
    const { data_ora, nome_vittima, contatto_vittima, tipo_di_violenza, descrizione_richiesta } = req.body
  
    const query = `
      INSERT INTO richieste (data_ora, nome_vittima, contatto_vittima, tipo_di_violenza, descrizione_richiesta)
      VALUES (?, ?, ?, ?, ?)
    `
  
    conn.query(query, [data_ora, nome_vittima, contatto_vittima, tipo_di_violenza, descrizione_richiesta], (err, result) => {
      if (err) {
        console.error("Errore durante l'inserimento nel database:", err.message)
        return res.status(500).json({ error: "Errore durante l'inserimento dei dati" })
      }
  
  
      const id_richiesta = result.insertId
  
      const querySegnalazione = `
        INSERT INTO segnalazioni (id_richiesta, esito, note)
        VALUES (?, 0, NULL)
      `
      
      conn.query(querySegnalazione, [id_richiesta], (err) => {
        if (err) {
          console.error("Errore durante la creazione della segnalazione:", err.message)
          return res.status(500).json({ error: "Errore durante la creazione della segnalazione" })
        }
        res.status(200).json({ message: "Richiesta e segnalazione create con successo!" })
      })
    })
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`)
})