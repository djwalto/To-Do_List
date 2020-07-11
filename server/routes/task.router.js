const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

// GET
taskRouter.get('/', (req, res) => {
  console.log('in the get route');
  const queryText = `SELECT * FROM "tasks" ORDER BY "id" DESC;`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      // console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error making get', error);
      res.sendStatus(500);
    });
});
// POST
taskRouter.post('/', (req, res) => {
  const taskData = req.body;
  console.log('in post task router', taskData.task);
  const query = `INSERT INTO "list" ("task")
    VALUES($1);`;
  pool
    .query(query, [taskData.task])
    .then((dbResponse) => {
      console.log(dbResponse);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error with POST', error);
      res.sendStatus(500);
    });
});

// PUT
taskRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const taskData = req.body;
  const queryText = `UPDATE "list" SET "task" = $1 "id"= $2;`;

  pool
    .query(queryText, [taskData.task, id])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

// DELETE
taskRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `DELETE FROM "list"
    WHERE "id"=$1;`;
  console.log(queryText);

  pool
    .query(queryText, [id])
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error in taskrouter delete', err);
      res.sendStatus(500);
    });
});

module.exports = taskRouter;
