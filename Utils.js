function showStandardViewHideLoginView() {

    document.getElementById("loginView").style.display="none";
    document.getElementById("standardView").style.display="block";
    
}

function validateReceiver(receiver){
    let receiverIdIfValid = -1;
    tempMapsObject.contactMap.forEach(
        (value, key) => {                          // check for the entire map if key or value are equal to
        if(key == receiver || value==receiver){    // the receiver chosen by the user. if the receiver does
            receiverIdIfValid = key;               // not exist in the backend, receiverIdIfValid stays -1
        }
    })
    if(receiverIdIfValid == userObject.getUserId()){return -2;}
    return receiverIdIfValid;
}

function updateNameAndIdTable(){

    // loads data from tempMapsObject.contactMap into nameAndIdTable

    // load map into table: clear old content, load potentially new one
    table = document.getElementById("nameAndIdTable");
    for(let i=table.rows.length-1; 0<i; i--){
      table.deleteRow(i);
    }
    tempMapsObject.contactMap.forEach(
      (value, key) => {                               
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = key;
      cell2.innerHTML = value;
    })
  }

  function updateAllConversationsTable(){

    console.log("updateAllConversationsTable called");

    // loads data from tempMapsObject.allConversationsMap into allConversationsTable

    // load map into table: clear old content, load potentially new one
    table = document.getElementById("allConversationsTable");
    for(let i=table.rows.length-1; 0<i; i--){
      table.deleteRow(i);
    }
    tempMapsObject.allConversationsMap.forEach(
      (value, key) => {                               
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = key;
      cell2.innerHTML = value;
    })
  }

  function updateSpecificConversationTable(){

    // loads data from tempMapsObject.specificConversationList into specificConversationTable

    // load map into table: clear old content, load potentially new one
    table = document.getElementById("specificConversationTable");
    for(let i=table.rows.length-1; 0<i; i--){
      table.deleteRow(i);
    }
    tempMapsObject.specificConversationList.forEach(
      (array) => {                               
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      cell1.innerHTML = array[0];
      cell2.innerHTML = array[1];
    })
  }

  // functions to set the view as indicated in the name
  function showAllHideSpecificConcersationsTable(){
    document.getElementById("allConversationsTableDiv").style.display="block";
    document.getElementById("specificConversationTableDiv").style.display="none";
  }

  function showSpecificHideAllConversationsTable(){
    document.getElementById("specificConversationTableDiv").style.display="block";
    document.getElementById("allConversationsTableDiv").style.display="none";
  }

  function clearTextfields(){
    const list = document.getElementsByTagName("input");
    const listArr = Array.from(list);
    for(let i = 0; i<listArr.length-1; i++) {
      let e = listArr[i];
      if(e.type === 'text'){e.value = "";}
    }
  }