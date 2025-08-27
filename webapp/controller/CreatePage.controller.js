/*
***** CODE BY MARCIANO, ELMER H. 
*/ 
sap.ui.define([
    "ordermanagement/controller/BaseController",
    "sap/m/MessageToast"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     */
    function (BaseController, MessageToast) {
        "use strict";

        return BaseController.extend("ordermanagement.controller.CreatePage", {
            onInit: function () {
            },

              onRecPlantRequest: function(oEvent) {
                var oView = this.getView();
                this._valueHelpSource = oEvent.getSource();
 
                if (!this._oRecPlantHelp) {
                    this._oRecPlantHelp = new sap.m.SelectDialog({
                        title: "Select Receiving Plant",
                        items: {
                            path: "/RecPlants",
                            template: new sap.m.StandardListItem({
                            title: "{RecPlantID}",
                            description: "{RecPlantDesc}"
                            })
                        },
                        confirm: this.onValueHelpClose.bind(this),
                        cancel: this.onValueHelpClose.bind(this)
                    });
                    oView.addDependent(this._oRecPlantHelp);
                }
                this._oRecPlantHelp.open();
               
            },
 
            //Value Help for Delivering Plant
            onDelPlantRequest: function(oEvent) {
                var oViews = this.getView();
                this._valueHelpSource = oEvent.getSource();
 
                if (!this._oDelPlantHelp) {
                    this._oDelPlantHelp = new sap.m.SelectDialog({
                        title: "Select Delivering Plant",
                        items: {
                            path: "/DelPlants",
                            template: new sap.m.StandardListItem({
                                title: "{DelPlantID}",
                                description: "{DelPlantDesc}"
                            })
                        },
                        confirm: this.onValueHelpClose.bind(this),
                        cancel: this.onValueHelpClose.bind(this)
                    });
                    oViews.addDependent(this._oDelPlantHelp);
                }
                this._oDelPlantHelp.open();
            },
 
            onValueHelpClose: function (oEvent) {
                var oSelected = oEvent.getParameter("selectedItem");
                if (oSelected) {
                   // this.byID("inputDelPlant").setValue(oSelected.getTitle());
                   this._valueHelpSource.setValue(oSelected.getTitle());
                }
            },
 
            //Add Items Buttons
            onPressAddItem: function (oEvent) {
                var oViewItem = this.getView();
            //Adjust try to create Fragment
                if (!this._oItemsDialog) {
                    this._oItemsDialog = new sap.m.Dialog({
                        title: "Select Items",
                        resizeable: true,
                        draggable: true,
                        content: [
                            new sap.m.Table({
                                id: oViewItem.createId("itemTable"),
                                mode: "MultiSelect",
                            columns: [
                                new Column({ header: new Text({ text: "ProductName"})}),
                                new Column({ header: new Text({ text: "Quantity"})}),
                                new Column({ header: new Text({ text: "UnitPrice"})}),
                            ],
                            items: {
                                path: "/OrderItems",
                                template: new sap.m.ColumnListItem({
                                cells: [
                                    new Text({ text: "{ProductName}"}),
                                    new Text({ text: "{Quantity}"}),
                                    new Text({ text: "{UnitPrice}"}),
                                    ]
                                 })
                                }
                             })
                        ],
 
                        buttons: [
                            new Button({
                                text: "OK",
                                press: this.onDialogOK.bind(this)
                            }),
                            new Button({
                                text: "Cancel",
                                press: function () {
                                    this._oItemsDialog.close();
                                }.bind(this)
                            })
                        ]
                    });
                    oViewItem.addDependent(this._oItemsDialog);
                }
                this._oItemsDialog.open();
            },
 
        onPressDeleteItem: function(evt){
            const oTableOrders = this.byId("tabCreateList");
            const aTabOrdsPaths = oTableOrders._aSelectedPaths;
            if(aTabOrdsPaths.length < 1){
                MessageToast.show("Please select an item from the table");
            }else {
 
                if(!this.oDialog){
                    this.oDialog = this.loadFragment({
                        name: "ordermanagement.fragment.CreatePage"
                    });
                }
 
                this.oDialog.then(function(oDialog) {
                    oDialog.open();
                });
                    oDialog.open();
            }
        },
 
        //Confirmation Buttons
         onPressCancel: function(){
            this.getView().byId("idDelDialogs").close();
        },
 
            onPressConfirm: function(){
            this.getView().byId("idDelDialogs").close();
 
            const oTableOrders = this.byId("tabCreateList");
            const aTabOrdsPaths = oTableOrders._aSelectedPaths;
            let oModel = this.getOwnerComponent().getModel();
 
            aTabOrdsPaths.forEach(function(sPath) {
                oModel.remove(sPath, {
                    success: function (data) {
                        MessageToast.show("Item's Deleted");
                    },
                    error: function (data){
                        MessageToast.show("Error encountered during deletion process");
                    }
                })
            })
        },
 
 
            //Footer Button
            onPressCancelOrder: function(){
            var oTabitems0 = this.byId("tabCreateList");
            const oRouter0 = this.getOwnerComponent().getRouter();
             if(oTabitems0.getItems().length > 1){
                //Put Message Here
             }
 
            //insert create route here
            oRouter0.navTo("RouteMain");
        },
            onPressCreatOrder: function(){
            var oRouter1 = this.getOwnerComponent().getRouter();
            var oTabitems = this.byId("tabCreateList");
               
            // var oModels = this.getView().getModel();
            // var spath = "/Orders";
            // var aProducts = oModels.getProperty(spath);
            // const aItems = oModels.getData();
 
            // const oToday = new Date();
            // const oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({pattern : "yyy-MM-dd"});
            // const sDate = oDateFormatt.format(oToday);
 
            //  var oNewItem = {
            //     CreateDat: sDate,
            //     RecPlantDesc: "RecPlantDesc1",
            //     DelPlantDesc: "DelPlantDesc1",
            //           Status: "Created",
            //         OrderNum: Math.floor(Math.random() * 100000000),
            //       RecPlantID: "QAML",
            //      DelPlantID : "OYfI"
            //   };
 
            // aProducts.push(oNewItem);
 
            // oModels.setProperty(spath, aProducts);
 
            if(oTabitems.getItems().length > 1) {
            // oModels.create("/Orders", oNewItem, {
            //     success: function () {
            //         MessageToast.show("Order has been Created");
            //     },
            //     Error: function () {
            //         MessageToast.show("Order not Created");
            //     }
            // });
           
 
            MessageToast.show("Order has been Created");
            //insert create route here
               oRouter1.navTo("RouteMain");
            } else {
               MessageToast.show("Order cannot be Created withou item's");
            }
 
            }
 
 
        });
    });

