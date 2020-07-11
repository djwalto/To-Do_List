console.log('js');

$(document).ready(function () {
  console.log('JQ');
  setupClickListeners();
  $('.header').height($(window).height());
});

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    const taskToSend = $('#taskIn').val();
    console.log(taskToSend);
    const objectToSend = {
      task: taskToSend,
    };
    console.log(objectToSend);
    postTask(objectToSend);
  });

  function postTask(objectToSend) {
    $.ajax({
      method: 'POST',
      url: '/list',
      data: objectToSend,
    })
      .then(function (response) {
        getTask();
      })
      .catch(function (err) {
        console.log(err);
      });
    clearInputs();
  }

  function getTask() {
    $('#viewTask').empty();
    $.ajax({
      method: 'GET',
      url: '/list',
    })
      .then((dbResponse) => {
        console.log(dbResponse);
        render(dbResponse);
      })
      .catch((error) => {
        console.log('Error GET task:', error);
      });
  }

  function clearInputs() {
    $('#taskIn').val('');
  }

  //   function updateTask(Id) {
  //     $.ajax({
  //       type: 'PUT',
  //       url: `/list/tasks${taskId}`,
  //     })
  //       .then((response) => {
  //         res.sendStatus(201);
  //       })
  //       .catch((err) => {
  //         console.log('err:', err);
  //         alert('Check updateTask');
  //       });
  //   }

  //   function clickDelete() {
  //     const id = $(this).data('taskID');
  //     byeTask(id);
  //   }

  //   function byeTask(taskId) {
  //     $.ajax({
  //       type: 'DELETE',
  //       url: `/tasks/${taskId}`,
  //     })
  //       .then((response) => {
  //         getTask();
  //       })
  //       .catch((err) => {
  //         console.log('err:', err);
  //         alert('Check byeTask');
  //       });
  //   }

  function render(tasks) {
    console.log(tasks);
    $('#viewTask').empty();
    for (let newTask of tasks) {
      $('#viewTask').append(`
    <tr>
    <td>${newTask.task}</td>
        <td><button class ="btn btn-outline-secondary btn-sm">COMPLETE</button></td>
    </tr>
    `);
    }
  }
}
