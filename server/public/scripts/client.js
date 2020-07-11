// const { default: swal } = require('sweetalert');

console.log('js');

$(document).ready(function () {
  console.log('JQ');
  setupClickListeners();
  $('.header').height($(window).height());
  $('#viewTask').on('click', '.js-btn-delete', clickDeleteTask);
  $('#viewTask').on('click', '#completed', changeClass);
  $('#viewTask').on('click', '#completed', changeStatus);
});

function changeStatus() {}

function changeClass() {
  console.log('YES!');
  updateTask();
  $(this).parent().toggleClass('greenClass');
}

function editTask() {
  console.log('in Edit');
  const $newStatus = $(this)
    .parent()
    .siblings('.data')
    .children('.js-new-status');
  console.log($newStatus);
  if ($newCost.length > 0) {
    const id = $(this).data('idTask');
    const newStatus = $newCost.val();
    console.log(newStatus);
    updateShoe(id, newStatus);
    return;
  }
  $(this).parent().siblings('.data');
  $(this).text('Updated');
}

function updateTask(id, newStatus) {
  console.log('new status alert for', id);
  console.log('new status:', newStatus);
  $.ajax({
    type: 'PUT',
    url: `/list/task_completed/${id}`,
    data: {
      newStatus,
    },
  })
    .then((response) => {
      getTask();
    })
    .catch((err) => {
      console.log('err: ', err);
      alert('OH NO!!!');
    });
}

function makeGreenRow() {
  console.log('in makegreeenrow');
  console.log($(this));
  $(this).data.addClass('.greenClass');
}

function clickDeleteTask() {
  swal({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this!',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal('Poof! Your file has been deleted!', {
        icon: 'success',
      });
      const id = $(this).data('idTask');
      deleteTask(id);
    } else {
      swal('Your imaginary file is safe!');
      return;
    }
  });
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
    console.log($('#completeIn').val());
    const taskToSend = {
      task: $('#taskIn').val(),
      task_completed: $('#completeIn').val(),
    };
    console.log(taskToSend);
    const objectToSend = {
      task: taskToSend.task,
      task_completed: taskToSend.task_completed,
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
  $('#completeIn').val('');
}

function render(tasks) {
  console.log(tasks);
  $('#viewTask').empty();
  for (let newTask of tasks) {
    $('#viewTask').append(`
    <tr class="taskRow">
    <td data-task class="data">${newTask.task}</td>
    <td><input type="checkbox" data-task-each id="completed" name="completed" class="js-new-status" value="no"></td>
    <td class="data">Date Completed</td>
    <td><button data-id-task="${newTask.id}" class="js-btn-delete">
        DELETE
      </button>
    </tr>
    `);
  }
}
