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


//query per il form
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

//query per il login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = "SELECT * FROM operatori WHERE contatto = ? AND password = ?";
    
    conn.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Errore del server" });
        }

        if (results.length > 0) {
            res.status(200).json({ message: "Login riuscito", user: results[0] });
        } else {
            res.status(401).json({ error: "Credenziali non valide" });
        }
    });
});




// API per aggiungere note prima della chiusura della richiesta
app.put('/richieste/:id/chiudi', (req, res) => {
    const { id } = req.params;
    const { note } = req.body;  // Assicurati che le note vengano passate nel corpo della richiesta

    // Aggiungi la logica per aggiornare le note e segnare la richiesta come chiusa
    const query = `
        UPDATE segnalazioni 
        SET esito = 1, note = ?  -- Imposta esito a 1 (chiuso) e aggiorna le note
        WHERE id_richiesta = ?
    `;
    
    conn.query(query, [note, id], (err, result) => {
        if (err) {
            console.error("Errore durante la chiusura della richiesta:", err.message);
            return res.status(500).json({ error: "Errore durante la chiusura della richiesta" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Richiesta non trovata" });
        }

        res.status(200).json({ message: "Richiesta chiusa con successo" });
    });
});




// API per ottenere tutte le richieste
app.get('/richieste', (req, res) => {
    const query = `
        SELECT r.id_richiesta, r.data_ora, r.nome_vittima, r.contatto_vittima, r.tipo_di_violenza, r.descrizione_richiesta, s.esito
        FROM richieste r
        JOIN segnalazioni s ON r.id_richiesta = s.id_richiesta
    `;
    
    conn.query(query, (err, results) => {
        if (err) {
            console.error("Errore durante il recupero delle richieste:", err.message);
            return res.status(500).json({ error: "Errore durante il recupero delle richieste" });
        }
        
        res.status(200).json({ richieste: results });
    });
});



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`)
})