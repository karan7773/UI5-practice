sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function(Controller) {
    'use strict';
    return Controller.extend("ns.buinessparter.controller.ManageActivity", {
        onInit(){},
        onBack(){
            console.log("yes");
            this.getOwnerComponent().getRouter().navTo("RouteSuppliers");
        },
        onClick(oEvent){
            var userid=this.getView().byId("userTable")._aSelectedPaths[0];
            var parts = userid.split("/");
            var id = parts[2];
            // console.log(id);
            const oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("User",{
                userId:id
            })
        }
        
    })
    
});