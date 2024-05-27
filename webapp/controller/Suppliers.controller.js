sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "ns/buinessparter/model/formatter",
	"sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast,Fragment,Filter,FilterOperator,formatter,JSONModel) {
        "use strict";

        return Controller.extend("ns.buinessparter.controller.Suppliers", {
            formatter: formatter,
            onInit: function () {
                this._iVisibleRowIndex=1;
                this.oModel = new JSONModel({
                    child1: true,
                    child2: false,
                    child3: true
                });
                // this.onDataReceived()
            },
            onShowHello() {
                MessageToast.show("Manage Activity is Pressed");
                window.open("https://sapui5.hana.ondemand.com/", "_blank");
            },
            handleLiveChange:function(oevent){
                console.log(oevent);
                console.log(oevent.mParameters.value);
                console.log(oevent.getParameters("value"));
                var val=this.getView().byId("i3").getValue();
                // console.log(val);
            },
            onPress: function (evt) {
                MessageToast.show("Product cost!");
            },
            getP:function(){
                var data=this.getView().byId("Col1").getValue();
                console.log(data);
            },
            onpress_Toggle:function(oevent){
                if(oevent.getSource().getPressed()){
                    MessageToast.show("pressed")
                }else{
                    MessageToast.show("Unpressed")
                }
                var btn=this.getView().byId("t_btn")
                if(btn.getText()==="Light"){
                    btn.setText("Dark")
                }else{
                    btn.setText("Light")
                }
            },
            onButtonClick: function() {
                // this.byId("myButton").setVisible(false);
                var btn=this.byId("myButton");
                btn.setProperty("visible",false);

                this.byId("myInputField").setVisible(true);
                this.byId("myInputField_b").setVisible(true);
            },
            Submit_btn:function(){
                var oButton = this.byId("myButton");
                var oInput = this.byId("myInputField");
                
                oButton.setText(oInput.getValue())
                oButton.setVisible(true);
                oInput.setVisible(false);
                this.byId("myInputField_b").setVisible(false);
            },
            btn_img:function(oevent){
                var img=this.getView().byId("img")
                if(oevent.getSource().getPressed()){
                    img.setVisible(true)
                }else{
                    img.setVisible(false)
                }
            },
            handleOpen: function () {
                var oDialog = this.byId("helloDialog");
                oDialog.open();
            },
            handleClose:function(){
                var oDialog=this.byId("helloDialog")
                oDialog.close()
            },
            openBarcodeScannerDialog:function(){
                this.byId("bsd").show();
            },
            handleScanError: function(oEvent) {
                this.byId("scanResultLabel").setText("Error result: " + oEvent.getParameter("message"));
                this.byId("bsd").close();
            },
            handleScanSuccess: function(oEvent) {
                this.byId("scanResultLabel").setText("Success result: " + oEvent.getParameter("text"));
                this.byId("bsd").close();
            },
            // openDialogFragments(){
            //     if(!this.isDialog){
            //         this.isDialog=this.loadFragment({
            //             id:this.byId(),
            //             name:"ns.buinessparter.view.Dialog"
            //         })
            //     }
            //     this.isDialog.then(((oDialog)=>oDialog.open()))
            // },
            // handleDClose:function(){
            //     this.byId("fragment").close()
            // }
            // onMenuAction:function(oevent){
            //     var menu_val=oevent.getParameter("item").mProperties.text;

            //     console.log(menu_val);
            // },
            
            onMenuAction: function(oEvent) {
                var selectedItem = oEvent.getParameter("item").getText();
                var trimmedKey = selectedItem.replace(/\s/g, "");
                this.selectedValue = trimmedKey;
            },
            onDownloadPress: function() {
                console.log(this.selectedValue);
                var selectedVal=this.selectedValue;
                var url = `assets/${selectedVal}.xlsx`;
                var filename = `${selectedVal}.xlsx`;
                
                var link = document.createElement("a");
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            
            onSearch:function(){
                // debugger;
                var table=this.getView().byId("table");
                var oItemBindings = table.getBinding("items");
                
                var bookKey=this.getView().byId("s1").mProperties.selectedKeys;
                var authorKey=this.getView().byId("s2").mProperties.selectedKeys;
                var genreKey=this.getView().byId("s3").mProperties.selectedKeys;

                console.log(bookKey,authorKey,genreKey);
                
                var oFilters = [];

                var headings=["title","author","genre"];
                var checking=[bookKey,authorKey,genreKey]

                for(let i=0;i<headings.length;i++){
                    for(let j=0;j<checking[i].length;j++){ 
                        oFilters.push(new Filter(headings[i],FilterOperator.EQ,checking[i][j]))
                    }
                }
                
                // console.log(bookKey,bookKey.length)
                // for(let i=0;i<booklen;i++){
                //     if(bookKey[i]!==undefined){
                //         oFilters.push(new Filter("title", FilterOperator.EQ, bookKey[i]))
                //     }
                // }
                // for(let i=0;i<authorlen;i++){
                //     if(authorKey[i]!==undefined){
                //         oFilters.push(new Filter("author", FilterOperator.EQ, authorKey[i]))
                //     }
                // }
                // for(let i=0;i<genrelen;i++){
                //     if(genreKey[i]!==undefined){
                //         oFilters.push(new Filter("genre", FilterOperator.EQ, genreKey[i]))
                //     }
                // }

                console.log("Applied filters:", oFilters);

                if (oFilters.length>0) {
                    oItemBindings.filter(oFilters,true);
                } else {
                    oItemBindings.filter([]);
                }
                // debugger;

            },
            onSelectionChange1:function(){
                // debugger;
                var table=this.getView().byId("table");
                var oItemBindings = table.getBinding("items");
                var bookName=this.getView().byId("s1").mProperties.selectedKeys;
                var booklen=bookName.length;
                var oFilters=[]
                for(let i=0;i<booklen;i++){
                    oFilters.push(new Filter("title",FilterOperator.EQ,bookName[i]))
                }
                oItemBindings.filter(oFilters);
                // debugger;
            },
            onSelectionChange2:function(){
                // debugger;
                var table=this.getView().byId("table");
                var oItemBindings = table.getBinding("items");
                var authorName=this.getView().byId("s2").mProperties.selectedKeys[0];
                var authorlen=authorKey.length
                var oFilters=[]
                for(let i=0;i<authorlen;i++){
                    oFilters.push(new Filter("author",FilterOperator.EQ,authorName[i]))
                }
                oItemBindings.filter(oFilters);
                // debugger;
            },
            onSelectionChange3:function(){
                // debugger;
                var table=this.getView().byId("table");
                var oItemBindings = table.getBinding("items");
                var genreName=this.getView().byId("s3").mProperties.selectedKeys;
                var genrelen=genreKey.length;
                var oFilters=[]
                for(let i=0;i<genrelen;i++){
                    oFilters.push(new Filter("genre",FilterOperator.EQ,genreName[i]))
                }
                oItemBindings.filter(oFilters);
                // debugger;
            },
            onInvSearch:function(oevent){
                var oFilters=[];
                var data=oevent.getParameter("query")
                
                if(data){
                    if(data>0){
                        oFilters.push(new Filter("quantity",FilterOperator.EQ,data))
                    }else{
                        oFilters.push(new Filter("title",FilterOperator.Contains,data))
                    }
                }

                const oList = this.byId("invoiceList");
                const oBinding = oList.getBinding("items");
                oBinding.filter(oFilters);
            },
            openNav:function(){
                const oRouter = this.getOwnerComponent().getRouter();
			    oRouter.navTo("ManageActivity");
            },
            openSplitApp(){
                const oRouter=this.getOwnerComponent().getRouter()
                oRouter.navTo("SplitApp")
            },
            onParentClicked(oEvent) {
                var bSelected = oEvent.getParameter("selected");
                this.oModel.setData({ child1: bSelected, child2: bSelected, child3: bSelected });
            },
            goToPaymentStep: function () {
                this.byId("PaymentTypeStep").setNextStep(this.getView().byId("CashOnDeliveryStep"));

                // var selectedKey = this.model.getProperty("/selectedPayment");
    
                // switch (selectedKey) {
                //     case "Credit Card":
                //         this.byId("PaymentTypeStep").setNextStep(this.getView().byId("CreditCardStep"));
                //         break;
                //     case "Bank Transfer":
                //         this.byId("PaymentTypeStep").setNextStep(this.getView().byId("BankAccountStep"));
                //         break;
                //     case "Cash on Delivery":
                //     default:
                //         this.byId("PaymentTypeStep").setNextStep(this.getView().byId("CashOnDeliveryStep"));
                //         break;
                // }
            },
            click: function() {
                var oTable = this.getView().byId("table2");
                var oItems = oTable.getItems();
                var iTotalItems = oItems.length;
                if (this._iVisibleRowIndex < iTotalItems) {
                    var prev=oItems[this._iVisibleRowIndex-1];
                    prev.setType("Inactive");
                    prev.addStyleClass("blur");
                    var oCurrentItem = oItems[this._iVisibleRowIndex];
                    oCurrentItem.setVisible(true);
                    this._iVisibleRowIndex++;
                }
                if(this._iVisibleRowIndex===iTotalItems){
                    this.getView().byId("tb").setVisible(false)
                }
                this.onDataReceived()
            },
            onDataExportPDF: async function() {
                var rows = [];
                var aItems = this.getView().byId("tbs").getSelectedItems();
            
                aItems.forEach(item => {
                    var oContext = item.getBindingContext("data");
                    var oData = oContext ? oContext.getObject() : null;
                    if (oData) {
                        rows.push({
                            title: oData.title,
                            author: oData.author,
                            genre: oData.genre
                        });
                    }
                });
            
                if (rows.length === 0) {
                    console.error("No valid data selected for export.");
                    return;
                }

                const XLSX = await import("https://cdn.sheetjs.com/xlsx-0.20.2/package/xlsx.mjs");
            
                var wrkshet = XLSX.utils.json_to_sheet(rows);
                var wrkbk = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wrkbk, wrkshet, "Book excel");
                XLSX.writeFile(wrkbk, "Book Data.xlsx", { compression: true });
            },
            onDataReceived: function() {
                var oTable = this.getView().byId("myTable");
                
                // Retrieve the "books" JSON array from the current view's model
                var aBooks = this.getView().getModel("datas").getProperty("/books");
            
                // Retrieve the property names from the first item in the array
                var oFirstBook = aBooks[0];
                var aColumnProperties = Object.keys(oFirstBook);
            
                // Define the columns for the table based on the property names
                var oColumns = [];
                aColumnProperties.forEach(function(property) {
                    oColumns.push({
                        label: property.charAt(0).toUpperCase() + property.slice(1), // Capitalize the first letter
                        property: property
                    });
                });
            
                // Clear existing columns
                oTable.removeAllColumns();
                
                // Add new columns
                oColumns.forEach(function(column) {
                    var oColumn = new sap.ui.table.Column({
                        label: new sap.m.Text({ text: column.label }),
                        template: new sap.m.Text({ text: "{" + column.property + "}" })
                    });
                    oTable.addColumn(oColumn);
                });
            
                // Create a JSON model for the books data
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({ books: aBooks });
            
                // Set the model for the table
                oTable.setModel(oModel);
            
                // Bind the rows of the table to the "/books" path of the model
                oTable.bindRows("/books");
            },
            open:function(){
                const oRouter=this.getOwnerComponent().getRouter()
                oRouter.navTo("OEEdashboard")
                window.open("https://sapui5.hana.ondemand.com/", "_blank");
            }
        });
    });
