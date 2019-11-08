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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(bodyParser.json());

require('dotenv').config();

app.get('/history/:id', (req, res) => {
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

app.delete('/like', (req, res) => {
  const values = [ req.body.id, req.body.userId ];

  pool.connect().then(client =>
    client
      .query(DELETE_LIKE, values)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(200))
  );
});

app.get('/likes/:id', (req, res) => {
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
