sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend("ns.buinessparter.controller.User", {
        onInit(){
            this.getRouter().getRoute("User").attachPatternMatched(this.ifMatched, this);
            this.ifMatched();
        },
        getRouter(){
            return sap.ui.core.UIComponent.getRouterFor(this)
        },
        ifMatched(oEvent){
            if(oEvent){
                var id=oEvent.getParameter("arguments").userId;
                // var UserN=this.getView().byId("uname")
                // UserN.setText(name)
                var oModel=this.getView().getModel("allUsers")
                // console.log(oModel.getProperty(`/users/${id}/userName`));
                var mo=oModel.getProperty(`/users/${id}`)
                // console.log(mo);
                var oViewModel = new JSONModel(mo);
                this.getView().setModel(oViewModel,"user");
            }
        },
        
    })
});