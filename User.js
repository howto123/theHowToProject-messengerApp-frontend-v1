class User {
    constructor(userId, userName, password, contactMap) {
      this.userId = userId;
      this.userName = userName;
      this.password = password;
    }

    setUser (userId, userName, password){
      this.userId = userId;
      this.userName = userName;
      this.password = password;
    }

    getUserId() {
      return this.userId;
    }

    getUserName(){
      return this.userName;
    }

    getPassword(){
      return this.password;
    }

    
    
  }