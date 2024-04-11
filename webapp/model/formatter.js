sap.ui.define([], function(){
    'use strict';
    return {
        statusText(oStatus){
            console.log("yes");
            switch(oStatus){
                case "A":
                    return "New"
                case "B":
                    return "In Progress"
                case "C":
                    return "Done"
                default:
                    return oStatus
            }
        }
    }
    
});