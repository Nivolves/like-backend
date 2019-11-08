const bodyParser = require('body-parser');
const express = require('express');

const { ERRORS } = require('./constants/errors');
const {
  DELETE_LIKE,
  GET_HISTORY,
  GET_LIKES,
  INSERT_HISTORY,
  INSERT_LIKE,
  INSERT_USER
} = require('./constants/queries');
const { pool } = require('./db/db');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

require('dotenv').config();

app.get('/history/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const values = [ req.params.id ];

  pool.connect().then(client =>
    client
      .query(GET_HISTORY, values)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        const { code } = err;
        if (ERRORS[ code ]) {
          res.sendStatus(ERRORS[ err.code ]);
        } else {
          res.sendStatus(500);
        }
      })
  );
});

app.post('/history', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const values = [ req.body.id, req.body.userId, req.body.query ];

  pool.connect().then(client =>
    client
      .query(INSERT_HISTORY, values)
      .then(() => res.sendStatus(200))
      .catch(err => {
        const { code } = err;
        if (ERRORS[ code ]) {
          res.sendStatus(ERRORS[ err.code ]);
        } else {
          res.sendStatus(500);
        }
      })
  );
});

app.post('/like', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const values = [ req.body.id, req.body.userId ];

  pool.connect().then(client =>
    client
      .query(INSERT_LIKE, values)
      .then(() => res.sendStatus(200))
      .catch(err => {
        const { code } = err;
        if (ERRORS[ code ]) {
          res.sendStatus(ERRORS[ err.code ]);
        } else {
          res.sendStatus(500);
        }
      })
  );
});

app.delete('/like/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const values = [ req.params.id ];

  pool.connect().then(client =>
    client
      .query(DELETE_LIKE, values)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(200))
  );
});

app.get('/likes/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const values = [ req.params.id ];

  pool.connect().then(client =>
    client
      .query(GET_LIKES, values)
      .then(result => {
        res.send(result.rows);
      })
      .catch(err => {
        const { code } = err;
        if (ERRORS[ code ]) {
          res.sendStatus(ERRORS[ err.code ]);
        } else {
          res.sendStatus(500);
        }
      })
  );
});

app.post('/user', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  const values = [ req.body.id ];

  pool.connect().then(client =>
    client
      .query(INSERT_USER, values)
      .then(() => res.sendStatus(200))
      .catch(err => {
        const { code } = err;
        if (ERRORS[ code ]) {
          res.sendStatus(ERRORS[ err.code ]);
        } else {
          res.sendStatus(500);
        }
      })
  );
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${ process.env.PORT }!`)
);
