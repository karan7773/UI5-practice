sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend("ns.buinessparter.controller.OEEdashboard", {
        onInit: function () {
            var oModel = new JSONModel({
                data: [
                    { time: "10/10/2018", value: 53 },
                    { time: "10/11/2018", value: 57 },
                    // Add more data points
                ]
            });
            this.getView().setModel(oModel);
        }
    })
    
});