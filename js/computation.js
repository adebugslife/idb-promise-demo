/*
 * DOM
 */
 var calcForm = document.getElementById('calcForm'); // Computation Events

/*
 * Events
 */

// OnSubmit
calcForm.addEventListener('submit', function (e) {
  e.preventDefault();

  var id = Number(document.getElementById('id').value),
    name = document.getElementById('name').value.toUpperCase(),
    subject = document.getElementById('subject').value,
    score = Number(document.getElementById('score').value);

    var details = {
      name: name,
      score: score,
      subject: subject
    };

  if (!id) {

    // Add item if there is no existing id
    if (name === '' || subject === '' || score === '') {
      alert('Please enter valid data');
      return;
    }
    writeIDB('myTable', details)
    window.location.href = '/';
  } else {

    // Fetch matched ID from existing data
    getId('myTable', id)
      .then(function (data) {
        if (data.id == id) {
          data.name = document.getElementById('name').value;
          data.score = document.getElementById('score').value;
          data.subject = document.getElementById('subject').value;
        }
        writeIDB('myTable', data)
        window.location.href = '/';

      })
  }
});

// Clear All data
var clearAll = document.getElementById('clearAll');
clearAll.addEventListener('click', clearAllFx);

// Show All data
if ('indexedDB' in window) {
  getAllData('myTable')
    .then(function (data) {
      let tableOutput = '',
          resultContainer = document.getElementById('result');

      data.forEach(cursor => {
        if (cursor) {
          tableOutput += "<thead><tr class='highlight'><th class='codeItem mdl-data-table__cell--non-numeric'>Name: " + cursor.name + "</th>";
          tableOutput += "<td><a href='' onClick='deleteItem(" + cursor.id + ")'>Delete</a> <a href='' onClick='updateItem(" + cursor.id + ");return false'>Edit</a></td><tr></thead>";
          tableOutput += "<tr><td class='mdl-data-table__cell--non-numeric'>Subject: </td><td>" + cursor.subject + "</td></tr>";
          tableOutput += "<tr><td class='mdl-data-table__cell--non-numeric'>Score: </td><td>" + cursor.score.toLocaleString(undefined, {
            maximumFractionDigits: 2
          }) + "</td></tr>";
        }

        resultContainer.innerHTML = tableOutput;
      });
    });
}