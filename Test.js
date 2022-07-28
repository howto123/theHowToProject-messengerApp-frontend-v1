
/*

What happens here is supposed to test specific apects of the app and
to initialize before doing a specific action manually

*/
async function test(){

    // createAccount tests
    await ServerApi.createAccount("Bob", "Bob's password");
    await ServerApi.createAccount("Tilde", "Tilde's password");
    await ServerApi.createAccount("Sebastian", "password3");
    await ServerApi.createAccount("Margret", "passwort3");
    await ServerApi.createAccount("Margret", "passwort4");
    //alert("Second creation of Margret should create an error.");

    // login tests
    await ServerApi.checkLogin("Error?", "Bob's password");
    await ServerApi.checkLogin("Bob", "Error?");
    //alert("Loggin should not have happened yet.")
    await ServerApi.checkLogin("Bob", "Bob's password");
    //alert("Bob should be logged in only now, not before.");
    
    // getUsersAndNames
    await ServerApi.getUsersAndNames();

    // sendMessage
    await ServerApi.sendMessage("Hello, this is a message", 1, 2);
    await ServerApi.sendMessage("Hi, how are you", 1, 3);
    await ServerApi.sendMessage("Pretty good actually.", 3, 1);
    await ServerApi.sendMessage("I'm glad to hear that", 1, 3);
    await ServerApi.sendMessage("How are you?", 3, 1);

    

}

// test();