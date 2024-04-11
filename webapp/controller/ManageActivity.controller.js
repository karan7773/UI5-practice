sap.ui.define([
    "sap/ui/core/mvc/Controller",
], function(Controller) {
    'use strict';
    return Controller.extend("ns.buinessparter.controller.ManageActivity", {
        onInit(){
            this.getRouter().getRoute("ManageActivity").attachPatternMatched(this.ifMatched, this);
            this.ifMatched();
        },
        getRouter(){
            return sap.ui.core.UIComponent.getRouterFor(this)
        },
        ifMatched(oEvent){
            if(oEvent){
                var name=oEvent.getParameter("arguments").userName;
                console.log(name);
            }
        },
        onBack(){
            console.log("yes");
            this.getOwnerComponent().getRouter().navTo("RouteSuppliers");
        },
        onClick(){
            console.log("cell");
            const oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("User")
        }
        
    })
    
});