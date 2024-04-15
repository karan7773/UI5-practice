sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/base/Log"
], function (Controller, Device, Log) {
"use strict";
    return Controller.extend("ns.buinessparter.controller.SplitApp", {
        onInit: function () {
			this.getSplitAppObj().setHomeIcon({
				'icon': 'desktop.ico'
			});

			Device.orientation.attachHandler(this.onOrientationChange, this);
		},
        onListItemPress: function (oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},
        getSplitAppObj: function () {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
		}
    })
    
});