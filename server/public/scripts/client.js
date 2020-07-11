console.log('js');

$(document).ready(function () {
  console.log('JQ');
  setupClickListeners();
  $('#completed').on('click', newTime);
  $('.header').height($(window).height());
  $('#viewTask').on('click', '.js-btn-delete', clickDeleteTask);
});

function clickDeleteTask() {
  const id = $(this).data('idTask');
  deleteTask(id);
}

function deleteTask(id) {
  $.ajax({
    type: 'DELETE',
    url: `/list/${id}`,
  })
    .then((response) => {
      getTask(response);
    })

    .catch((err) => {
      console.log('err: ', err);
      alert('OH NO!!!');
    });
}

function newTime() {
  console.log('in new Time');
  let timeStamp = getTime();
  console.log(timeStamp);
}

function setupClickListeners() {
  getTask();
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
}

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

function render(tasks) {
  console.log(tasks);
  $('#viewTask').empty();
  for (let newTask of tasks) {
    $('#viewTask').append(`
    <tr>
    <td class="data">${newTask.task}</td>
    <td><input type="checkbox" id="completed" name="completed" value="no"></td>
    <td class="data">Date Completed</td>
    
    <td><button data-id-task="${newTask.id}" class="js-btn-delete btn btn-outline-secondary btn-sm">
        DELETE
      </button>
    </tr>
    `);
  }
}
