// TABLE FUNCTION
function myFunction() { //on click event
  var name = document.getElementById("item-to-add").value; //ชื่อสิ่งของ
  var type = document.getElementById("type-to-add").value; //ชื่อคน
  var timer = document.getElementById("time-to-add").value; //ชื่อสิ่งของ
  var table = document.getElementById("main-table").getElementsByTagName('tbody')[0];

  var button = document.createElement("button");
  button.innerHTML = "Remove";
  button.id = "add-newrow";
  // button.onclick = "deleteRow(this)";
  button.addEventListener ("click", function() {
      table.removeChild(row);
     });

  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  cell1.innerHTML = name;
  cell2.innerHTML = type;
  cell3.innerHTML = timer;
  cell4.appendChild(button);
}

function deleteRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}
