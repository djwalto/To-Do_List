const express = require('express');
const { Router } = require('express');
const taskRouter = express.Router();

const pg = require('pg');
const pool = require('../modules/pool');
const Pool = pg.Pool;

// GET
taskRouter.get('/', (req, res) => {
  const queryText = `SELECT * FROM "tasks" ORDER BY "id" DESC;`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      // console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});
// POST
taskRouter.post('/', (req, res) => {
  const taskData = req.body;
  console.log('in post task router');
  const queryText = `INSERT INTO "tasks" ("task", "task_completed", "date_completed")
    VALUES($1, $2, $3);`;
  pool
    .query(queryText, [
      taskData.task,
      taskData.task_completed,
      taskData.date_completed,
    ])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error with POST', error);
    });
});

// PUT
taskRouter.put('task/:id', (req, res) => {
  const id = req.params.id;
  const taskData = req.body;
  const queryText = `UPDATE "task" SET "task" = $1 "id"= $2;`;

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
  const queryText = `DELETE FROM "tasks"
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
