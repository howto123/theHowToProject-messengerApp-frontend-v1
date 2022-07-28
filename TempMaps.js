class TempMaps {

    constructor(contactMap, specificConversationList, allConversationsMap) {
        // holds identity number, corresponding user name
        this.contactMap = contactMap

        // holds name of sender, message
        this.specificConversationList = specificConversationList;   // map needs to have destinct keys,
                                                                    // here we have the same sender mulitple times
                                                                    // therefore: list of Arrays of 2 Strings
        // holds name of conversation partner, most recent message
        this.allConversationsMap = allConversationsMap;
    }

    // getters, setters, no other methods
    setTempMaps (contactMap, specificConversationList, allConversationsMap){
        this.contactMap = contactMap
        this.specificConversationList = specificConversationList;
        this.allConversationsMap = allConversationsMap;
    }

    setContactMap (newMap){
      this.contactMap = newMap;
    }

    getContactMap (){
      return this.contactMap;
    }

    setSpecificConversationList (newList){
        this.specificConversationList = newList;
    }
  
    getSpecificConversationList (){
        return this.specificConversationList;
    }

    setAllConversationsMap (newMap){
        this.allConversationsMap = newMap;
    }
  
    getAllConversationsMap (){
        return this.allConversationsMap;
    }

  }