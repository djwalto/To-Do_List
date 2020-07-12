console.log('js');

$(document).ready(function () {
  console.log('JQ');
  setupClickListeners();
  $('.header').height($(window).height());
  $('#viewTask').on('click', '.js-btn-delete', clickDeleteTask);
  $('#viewTask').on('click', '#completed', changeClass);
  $('#viewTask').on('click', '.js-status', clickedCompleteTask);
});

function clickedCompleteTask() {
  console.log('in clickedCompleteTask');
  const statusNow = $(this).siblings('idTask').data('idTask');
  console.log(statusNow);
  const id = $(this).data('status');
  console.log(id);
  changeStatus(id);
}

function completeTask(id, statusNow) {
  $.ajax({
    type: 'PUT',
    url: `/api/list/${id}`,
    data: {
      statusNow,
    },
  });
}

function updateRender(tasks) {
  for (let task of tasks) {
    const $row = $('#viewTask').children(`.${task.task_completed}`);
    const rowStatus = $row.data('task_completed');
    if (rowStatus === yes) {
      $row.addClass('greenClass');
    }
  }
}

function changeClass() {
  console.log('YES!');
  $(this).parent().toggleClass('greenClass');
}

function changeStatus(id) {
  $.ajax({
    type: 'PUT',
    url: `/list/${id}`,
  })
    .then((response) => {
      console.log('in then statement');
    })
    .catch((err) => {
      console.log('err: ', err);
    });
}

// function clickEditRank() {
//     console.log('EDIT RANK');
//     const $newRank = $(this).parent()
//       .siblings('.js-rank')

//     if ($newRank.length > 0) {
//       const id = $(this).data('idSong');
//       const newRankValue = $newRank.val();
//       updateRank(id, newRankValue);
//       return;
//     }

//     $(this).parent()
//     $(this).text('SAVE');
//   }

// function updateRank(id, rank) {
//     console.log('RANK SAVE - id:', id);
//     console.log('RANK SAVE - rank:', rank);
//     $.ajax({
//       type: 'PUT',
//       url: `/api/music/rank/${id}`,
//       data: {
//         rank
//       }
//     })
//     .then((response) => {
//       getMusicData();
//     })
//     .catch((err) => {
//       console.log('err: ', err);
//       alert('Stuff broke!!!');
//     });
//   }

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
      swal('Poof! Your task has been deleted!', {
        icon: 'success',
      });
      const id = $(this).data('idTask');
      deleteTask(id);
    } else {
      swal('Your task is safe!');
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
    <td><input type="checkbox" data-status="${newTask.id}" id="completed" name="completed" class="js-status" value="no"></td>
    <td class="data"></td>
    <td><button data-id-task="${newTask.id}" class="js-btn-delete">
        DELETE
      </button>
    </tr>
    `);
  }
}
