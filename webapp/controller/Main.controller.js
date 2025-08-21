sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ordermanagement.controller.Main", {
        onInit() {
        },

        onPressCreate: function(){
            const oRouter = this.getOwnerComponent().getRouter();
            //insert create route here
            oRouter.navTo("RouteCreatePage");
        },

        onPressOrder: function(oEvent){
            const oSelectedOrder = oEvent.getSource();
            const oContext = oSelectedOrder.getBindingContext();
            const sOrderNumber = oContext.getProperty("OrderNum");

            const oRouter = this.getOwnerComponent().getRouter();
            //oRouter.navTo("RouteDetailPage", {
                //passing : OrderNum
            //});
        },

        onPressDelete: function(evt){
            const oTableOrders = this.byId("tabOrderList");
            const aTabOrdsPaths = oTableOrders._aSelectedPaths;
            if(aTabOrdsPaths.length < 1){
                MessageToast.show("Please select an item from the table");
            }else {
                if(!this.oDialog){
                    this.oDialog = this.loadFragment({
                        name: "ordermanagement.fragment.DeleteDialog"
                    });
                }

                this.oDialog.then(function(oDialog) {
                    oDialog.open(); 
                });
            }
        },

        onPressCancel: function(){
            this.getView().byId("idDelDialog").close();
        },

        onPressConfirm: function(){
            this.getView().byId("idDelDialog").close();

            const oTableOrders = this.byId("tabOrderList");
            const aTabOrdsPaths = oTableOrders._aSelectedPaths;
            let oModel = this.getOwnerComponent().getModel();

            aTabOrdsPaths.forEach(function(sPath) {
                oModel.remove(sPath, { 
                    success: function (data) {
                        },
                    error: function (data){
                        }
                    })
                })
        },

    });
});