
// Create "empty" tampMapsObject and userObject
// => this might be unnecessary in js. helps to prevent errors?

let map = new Map();
let tempMapsObject = new TempMaps(map, map, map);
let userObject = new User(-1, "", "");


//after loading, the following block will be executed
document.addEventListener("DOMContentLoaded", function(event) {

  // hide what is not supposed to be visible at the start
  document.getElementById("standardView").style.display="none";
  document.getElementById("allConversationsTableDiv").style.display="block";
  document.getElementById("specificConversationTableDiv").style.display="none";
  document.getElementById("nameAndIdTableDiv").style.display="none";
  clearTextfields();

  //-----------------------click events--------------------------//
  //on buttonclicks, the following blocks will be executed

  document.getElementById("createUserButton").addEventListener("click", function(event) {

    async function todo(){
      let name = document.getElementById("usernameCreate").value;
      let password = document.getElementById("passwordCreate").value;
      document.getElementById("usernameCreate").value = "";
      document.getElementById("passwordCreate").value = "";
      document.getElementById("usernameLogin").value = name;
      document.getElementById("passwordLogin").value = "";

      if(name !== "" && password !== ""){
        await ServerApi.createAccount(name, password);
      }
      else{alert("Please enter name and password for your new account.");}
    }

    todo();
  })

  document.getElementById("loginButton").addEventListener("click", function(event){

    async function todo(){
      let name = document.getElementById("usernameLogin").value;
      let password = document.getElementById("passwordLogin").value;
      document.getElementById("usernameCreate").value = "";
      document.getElementById("passwordCreate").value = "";
      document.getElementById("usernameLogin").value = "";
      document.getElementById("passwordLogin").value = "";

      if(name !== "" && password !== ""){
        ServerApi.checkLogin(name, password)
          .then( (loginSuccess) => {
            if(loginSuccess) {
              todoIfSuccess()
            }
          })
      }
      else{alert("Please enter name and password for your new account.");}
    }

    async function todoIfSuccess(){
      showStandardViewHideLoginView();
      await ServerApi.getUsersAndNames();
      await ServerApi.showAllChats(userObject.getUserId());
      updateNameAndIdTable();
      showAllHideSpecificConcersationsTable();
      clearTextfields();
    }

    todo();
  })

  document.getElementById("sendButton").addEventListener("click", function(event){

    async function todo(){
      let receiver = document.getElementById("receiver").value;
      let content = document.getElementById("content").value;
      let checkedReceiver = validateReceiver(receiver);
      if(checkedReceiver > 0 && content != ""){
        let trueIfSuccess = ServerApi.sendMessage(content, userObject.getUserId(), checkedReceiver);
        if(trueIfSuccess){
          // clearing the textfields for the user
          //document.getElementById("receiver").value = "";
          document.getElementById("content").value = "";
          }
      }
      else if(checkedReceiver==-1){alert("Receiver does not seem to exist.");}
      else if(checkedReceiver==-2){alert("Can't text yourself. Please change receiver.");}
      else {alert("Please add a message.");}
    }

    todo();
  })

  document.getElementById("showAllChatsButton").addEventListener("click", function(event){

    async function todo(){
      // make call and table update visible table (method returns true if success, no tests for now)
      await ServerApi.showAllChats(userObject.getUserId());
      // set view
      showAllHideSpecificConcersationsTable();
    }
    
    todo();
  })

  document.getElementById("showSpecificChatButton").addEventListener("click", function(event){

    async function todo(){
      // read params
      let partner2id = document.getElementById("partner").value;
      // make call and table update visible table (method returns true if success, no tests for now)
      partnerIdIfValid = validateReceiver(partner2id)
      if(partnerIdIfValid>0){                                              // validateReceiver() checks if input is ok
        await ServerApi.showSpecificChat(userObject.getUserId(), partnerIdIfValid);
      }else if(partnerIdIfValid==-2){alert("this is you!");}
      else{alert("Please enter a valid name or id number.");}
      // set view
      showSpecificHideAllConversationsTable();
    }
    
    todo();
  })

  document.getElementById("showHideUniverseButton").addEventListener("click", function(event){

    async function todo(){
      // update tempMapsObject.contactMap and visible table
      await ServerApi.getUsersAndNames();
      // update the potentially visible table
      updateNameAndIdTable();
      // hide or show table
      let tableDiv = document.getElementById("nameAndIdTableDiv");
      if(tableDiv.style.display == "none"){tableDiv.style.display = "block";}
      else{tableDiv.style.display = "none";}
    }

    todo();
  })

// ------------add "press enter" event handlers to input fields------------

  var input = document.getElementById("passwordCreate");
  input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("createUserButton").click();
    }
  }); 

  var input = document.getElementById("passwordLogin");
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("loginButton").click();
    }
  }); 

  var input = document.getElementById("receiver");
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("sendButton").click();
    }
  }); 

  var input = document.getElementById("content");
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("sendButton").click();
    }
  });

  var input = document.getElementById("partner");
  input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("showSpecificChatButton").click();
    }
  }); 

});//on load event execution block ends


