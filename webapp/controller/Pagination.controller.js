sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
    'use strict';
    return Controller.extend("ns.buinessparter.controller.Pagination", {
        onInit:function(){
            var data={
                items:[
                    { "productId": 1, "productName": "Apple iPhone 13" },
                    { "productId": 2, "productName": "Samsung Galaxy S21" },
                    { "productId": 3, "productName": "Google Pixel 6" },
                    { "productId": 4, "productName": "Sony WH-1000XM4" },
                    { "productId": 5, "productName": "Bose QuietComfort 35 II" },
                    { "productId": 6, "productName": "Dell XPS 13" },
                    { "productId": 7, "productName": "MacBook Pro 14-inch" },
                    { "productId": 8, "productName": "HP Spectre x360" },
                    { "productId": 9, "productName": "Microsoft Surface Pro 7" },
                    { "productId": 10, "productName": "Lenovo ThinkPad X1 Carbon" },
                    { "productId": 11, "productName": "Nintendo Switch" },
                    { "productId": 12, "productName": "Sony PlayStation 5" },
                    { "productId": 13, "productName": "Xbox Series X" },
                    { "productId": 14, "productName": "Apple iPad Pro" },
                    { "productId": 15, "productName": "Samsung Galaxy Tab S7" },
                    { "productId": 16, "productName": "Amazon Echo Dot" },
                    { "productId": 17, "productName": "Google Nest Hub" },
                    { "productId": 18, "productName": "Fitbit Charge 4" },
                    { "productId": 19, "productName": "Garmin Forerunner 245" },
                    { "productId": 20, "productName": "Apple Watch Series 6" },
                    { "productId": 21, "productName": "Canon EOS R5" },
                    { "productId": 22, "productName": "Nikon Z6 II" },
                    { "productId": 23, "productName": "Sony Alpha a7 III" },
                    { "productId": 24, "productName": "GoPro HERO9 Black" },
                    { "productId": 25, "productName": "DJI Mavic Air 2" },
                    { "productId": 26, "productName": "Roku Streaming Stick+" },
                    { "productId": 27, "productName": "Apple TV 4K" },
                    { "productId": 28, "productName": "Nvidia Shield TV" },
                    { "productId": 29, "productName": "Philips Hue White and Color Ambiance" },
                    { "productId": 30, "productName": "TP-Link Kasa Smart Plug" },
                    { "productId": 31, "productName": "Eufy RoboVac 11S" },
                    { "productId": 32, "productName": "iRobot Roomba 960" },
                    { "productId": 33, "productName": "Dyson V11 Torque Drive" },
                    { "productId": 34, "productName": "Shark Navigator Lift-Away" },
                    { "productId": 35, "productName": "KitchenAid Artisan Stand Mixer" },
                    { "productId": 36, "productName": "Instant Pot Duo" },
                    { "productId": 37, "productName": "Ninja Foodi" },
                    { "productId": 38, "productName": "Breville Barista Express" },
                    { "productId": 39, "productName": "Jura E8" },
                    { "productId": 40, "productName": "Keurig K-Elite" },
                    { "productId": 41, "productName": "Sonos One" },
                    { "productId": 42, "productName": "JBL Flip 5" },
                    { "productId": 43, "productName": "Anker Soundcore 2" },
                    { "productId": 44, "productName": "Marshall Kilburn II" },
                    { "productId": 45, "productName": "Sony SRS-XB23" },
                    { "productId": 46, "productName": "Logitech MX Master 3" },
                    { "productId": 47, "productName": "Razer DeathAdder V2" },
                    { "productId": 48, "productName": "SteelSeries Rival 600" },
                    { "productId": 49, "productName": "Corsair K95 RGB Platinum" },
                    { "productId": 50, "productName": "Logitech G Pro X" }
                ],
                total:50,
                currentPage:this.currentPage,
                totalPages:this.totalPages
            };
            this.nooftbrows=10;
            this.currentpg=1;
            this.totalPages=Math.ceil(data.total/this.nooftbrows)
            var oModel=new JSONModel(data)
            this.getView().setModel(oModel)
            this.loadPageData();
        },
        loadPageData:function(){
            var oModel=this.getView().getModel()
            var alldata=oModel.getProperty("/items");
            var start=(this.currentpg-1)*this.nooftbrows;
            var end=start+this.nooftbrows

            var pagedata=alldata.slice(start,end)

            oModel.setProperty("/currentPageData", pagedata);
            oModel.setProperty("/currentPage", this.currentpg);
            oModel.setProperty("/totalPages", this.totalPages);
            if(this.currentpg!=1){
                oModel.setProperty("/firstPageBtnEnable",true) 
            }else{
                oModel.setProperty("/firstPageBtnEnable",false) 
            }
            if(this.currentpg==this.totalPages){
                oModel.setProperty("/nextPageBtnEnable",false)
            }else{
                oModel.setProperty("/nextPageBtnEnable",true)
            }
        },
        previous:function(){
            if(this.currentpg>1){
                this.currentpg--;
                this.loadPageData()
            }
            
        },
        previousBack:function(){
            this.currentpg=1;
            this.loadPageData();
        },
        next:function(){
            if(this.currentpg<this.totalPages){
                this.currentpg++;
                this.loadPageData();
            }
        },
        nextend:function(){
            this.currentpg=this.totalPages
            this.loadPageData();
        }
    })
    
});