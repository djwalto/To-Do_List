const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

// GET
taskRouter.get('/', (req, res) => {
  console.log('in the get route');
  const queryText = `SELECT * FROM "list" ORDER BY "id" DESC;`;
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
  console.log('in post task router', taskData.task, taskData.task_completed);
  const query = `INSERT INTO "list" ("task", "task_completed")
    VALUES($1, $2);`;
  pool
    .query(query, [taskData.task, taskData.task_completed])
    .then((dbResponse) => {
      console.log(dbResponse);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error with POST', error);
      res.sendStatus(500);
    });
});

taskRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const taskData = req.body;
  console.log(id);
  const queryText = `UPDATE "list" SET "task_completed" = $1 WHERE "id" = $2;`;

  console.log(queryText);

  pool
    .query(queryText, ['YES', id])
    .then((response) => {
      console.log('in taskRouterPut then', response);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error in taskrouter put', err);
      res.sendStatus(500);
    });
});

// PUT
// taskRouter.put('/task_complete/:id', (req, res) => {
//   const id = req.params.id;
//   const taskData = req.body;
//   const queryText = `UPDATE "list" SET "task" = $1 "id"= $2 "task_complete"= $3;`;

//   pool
//     .query(queryText, [taskData.task, id, taskData.task_complete])
//     .then((response) => {
//       res.sendStatus(201);
//     })
//     .catch((err) => {
//       console.log('error', err);
//       res.sendStatus(500);
//     });
// });

// DELETE
taskRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const queryText = `DELETE FROM "list"
    WHERE "id"=$1;`;
  console.log(queryText);

  pool
    .query(queryText, [id])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error in taskrouter delete', err);
      res.sendStatus(500);
    });
});

module.exports = taskRouter;
