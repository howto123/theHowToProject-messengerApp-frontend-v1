class ServerApi {

    static backendUrl = "https://messengerapp-v1.herokuapp.com";
    //static backendUrl = "http://localhost:8090";

    static async createAccount(name, password){

        // Creates account in database and creates corresponding user object at user

        console.log("createAccount called", name, password);

        // set request parameters
        const myInit = {
            method: 'POST',
            body: JSON.stringify({
                "name":name,
                "password":password
            })
        };

        await fetch(this.backendUrl + "/appUserController/", myInit)
          .then( wrappedData => {return wrappedData.text();})
          .then( data => {
            console.log(data);
            let idIfSuccess = parseInt(data, 10);
            if(isNaN(idIfSuccess)){
                console.log("account name already taken");
                alert("account name already taken");
            }
            else{
                console.log("user successfully created")
            }
        })
    }

    static async getUsersAndNames() {

        // Updates users id numbers and names, returns true if no error

        console.log("getUsersAndNames called");
        let returnBoolean = false;
        let tempMap = new Map();

        // make request
        await fetch(this.backendUrl + "/appUserController/all")
          .then( wrappedData => {return wrappedData.text();})
          .then( data => {
            let object = JSON.parse(data);
            for(let pair of object){
                tempMap.set(pair[0], pair[1]);
            }
            returnBoolean = true;
        })

        // load data into tempObject's map
        tempMapsObject.setContactMap(tempMap);

        console.log(tempMapsObject.getContactMap());

        return returnBoolean;

    } 

    static async checkLogin(name, password) {

        // Checks login, returns true if login is correct

        console.log("login called", name, password);
        let returnBoolean = false;

        // set request parameters
        const myInit = {
            method: 'POST',
            body: JSON.stringify({
                "name":name,
                "password":password
            })
        };

        // do request, wait for completion
        await fetch(this.backendUrl + "/appUserController/login", myInit)
          .then( wrappedData => {return wrappedData.text();})
          .then( data => {
            let idIfSuccess = parseInt(data, 10);
            if(isNaN(idIfSuccess)){
                console.log("Problem: " + data);
                alert("Sorry, there is a problem");
            }
            else{
                console.log("login completed");
                userObject.setUser(idIfSuccess, name, password)
                returnBoolean = true;
                // change view independent of buttonclick event in the login view
                showStandardViewHideLoginView();
            }
        })

        return returnBoolean;

    }

    static async sendMessage(message, senderId, receiverId) {

        // sends messages (does not update users conversations display), returns true in case of success

        console.log("sendMessage called", message, senderId, receiverId);
        let returnBoolean = false;

        // prepare request parameters
        const myInit = {
            method: 'POST',
            body: JSON.stringify({
                "message":message,
                "senderId":senderId,
                "receiverId":receiverId
            })
        };
        
        // do request, wait for completion
        await fetch(this.backendUrl + "/messageController/sendMessage", myInit)
          .then( wrappedData => {return wrappedData.text();})
          .then( data => {
            console.log("Send message request returns: " + data);
            let oneIfSuccess = parseInt(data, 10);
            if(isNaN(oneIfSuccess) || oneIfSuccess!=1){console.log("Problem: " + data)}
            else{
                console.log("message successfully sent");
                returnBoolean = true;
            }
        })

        if(returnBoolean){
            // make call and change view to show latest chat and new message immediately
            await ServerApi.showSpecificChat(senderId, receiverId);
            showSpecificHideAllConversationsTable();
            let map = tempMapsObject.getContactMap();
            console.log(map);
            console.log(map.get("1"));
            document.getElementById("partner").value = map.get(receiverId.toString());
        }
        

        return returnBoolean;

    }

    static async showSpecificChat(partner1, partner2) {

        // gets one specific conversation, returns true if success

        console.log("showSpecificChat called", partner1, partner2);
        let returnBoolean = false;
        let tempList = [];

        // prepare request parameters
        const myInit = {
            method: 'POST',
            body: JSON.stringify({
                "partner1":partner1,
                "partner2":partner2
            })
        };
        
        // do request, wait for completion
        await fetch(this.backendUrl + "/messageController/showSpecificChat", myInit)
          .then( wrappedData => {return wrappedData.text();})
          .then( data => {
            console.log("Send specificChatRequest returns: " + data);
            let object = JSON.parse(data);
            for(let pair of object){
                tempList.push([pair[0], pair[1]]);
            }
            returnBoolean = true;
            }
        )

        // load data into tempObject's map
        console.log(tempList);
        tempMapsObject.setSpecificConversationList(tempList);

        // update specificConversationTable from Utils.js
        updateSpecificConversationTable();

        console.log(tempMapsObject.getSpecificConversationList());

        return returnBoolean;

    }

    static async showAllChats(identity) {

        // gets partner name and most recent message of all of this users conversations
        // returns true if request succeeds

        console.log("showAllChats called", identity);
        let returnBoolean = false;
        let tempMap = new Map();

        // prepare request parameters
        const myInit = {
            method: 'POST',
            body: JSON.stringify({
                "identity":identity
            })
        };
        
        // do request, wait for completion
        await fetch(this.backendUrl + "/messageController/showAllChats", myInit)
          .then( wrappedData => {return wrappedData.text();})
          .then( data => {
            console.log("showAllChats request returns: " + data);

            // read data into tempMap
            let object = JSON.parse(data);
            for(let pair of object){
                tempMap.set(pair[0], pair[1]);
            }
            returnBoolean = true;
            }
        )

        // load data into tempObject's map
        tempMapsObject.setAllConversationsMap(tempMap);

        // update allConversationsTable from Utils.js
        updateAllConversationsTable();

        console.log(tempMapsObject.getAllConversationsMap());

        return returnBoolean;

    }

}