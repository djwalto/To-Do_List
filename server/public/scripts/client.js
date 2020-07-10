console.log('js');

$(document).ready(function () {
  console.log('JQ');
  setupClickListeners();
  $('.header').height($(window).height());
});

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    const taskToSend = $('#taskIn').val();
    const objectToSend = {
      task: taskToSend,
    };
    $.ajax({
      method: 'POST',
      url: '/task',
      data: objectToSend,
    })
      .then(function (response) {
        getTask();
      })
      // call saveTask with the new object
      .catch(function (err) {
        console.log(err);
      });
    clearInputs();
  });

  function getTask() {
    console.log('in getTask', taskToSend);
    // ajax call to server to get task
    $.ajax({
      method: 'GET',
      url: '/task',
    })
      .then((dbResponse) => {
        console.log(dbResponse);
        let taskList = dbResponse;
        render(taskList);
        // saveTask(taskToSend);
        // render(dbResponse);
      })
      .catch((error) => {
        console.log('Error GET task:', error);
      });
  }

  function clearInputs() {
    $('#taskIn').val('');
  }

  function updateTask(Id) {
    $.ajax({
      type: 'PUT',
      url: `/task/${taskId}`,
    })
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('err:', err);
        alert('Check updateTask');
      });
  }

  function clickDelete() {
    const id = $(this).data('taskID');
    byeTask(id);
  }

  function byeTask(taskId) {
    $.ajax({
      type: 'DELETE',
      url: `/task/${taskId}`,
    })
      .then((response) => {
        getTask();
      })
      .catch((err) => {
        console.log('err:', err);
        alert('Check byeTask');
      });
  }

  function render(taskList) {
    console.log(taskList);
    $('#viewTask').empty();

    for (let newTask of taskList) {
      $('#viewTask').append(`
    <tr>
    <td>${newTask.task}</td>
        <td>${newTask.task_complete}</td><button class ="btn btn-outline-secondary btn-sm">Ready</button></td>
        <td>${newKoala.date_completed}</td>
    </tr>
    `);
    }
  }
}
