let express = require('express');
let app = express();
var cors = require('cors')
let sqlite3 = require('sqlite3').verbose();
let url = require('url');
app.use(cors())
app.use(express.json());

app.get('/api/words', async function (req, res) {
    let query = url.parse(req.url, true).query;
    let db;
    db = new sqlite3.Database('chain.sqlite3');

    db.all(`SELECT * FROM main.word ORDER BY date_updated desc limit 5 offset 5*${query.page-1}`, function (err, rows) {
        db.close();
        res.send(JSON.stringify({
            'next': rows.length===5,
            'result': rows
        }))
    });
});

app.post('/api/words', async function (req, res) {
    let db;
    db = new sqlite3.Database('chain.sqlite3');
    db.run('INSERT INTO main.word(word, englishText, russianText) VALUES(?,?,?)',
        [req.body.word, req.body.englishText, req.body.russianText], function (err) {
        db.close();
        res.send(JSON.stringify({'result': req.body, 'error': err}))
        res.end()
    });
});

app.patch('/api/words/:id', async function (req, res) {
    let db;
    db = new sqlite3.Database('chain.sqlite3');
    db.run('UPDATE main.word SET word=?, englishText=?, russianText=? where `index`=?',
        [req.body.word, req.body.englishText, req.body.russianText, req.params.id], function (err) {

        db.close()
    });
    res.send(JSON.stringify(req.body))
});


app.delete('/api/words/:id', async function (req, res) {
    let db;
    db = new sqlite3.Database('chain.sqlite3');
    db.run('DELETE FROM main.word where `index`=?', [req.params.id], function (err) {
        db.close();
        res.send(JSON.stringify({'result': 'delete', 'error': err}))
        res.end()
    });
});




app.listen(3001);