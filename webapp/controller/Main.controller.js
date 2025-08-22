sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "ordermanagement/model/formatter"
], (Controller, MessageToast, Filter, FilterOperator, formatter) => {
    "use strict";

    return Controller.extend("ordermanagement.controller.Main", { formatter: formatter,
        onInit() {
            
        },

        onSearch: function(){
            const oView = this.getView();
            const sOrderNumber = oView.byId("inpOrderNumber").getValue();

            //add filters
            const aFilters = [];
            if(sOrderNumber){
                aFilters.push(new Filter("OrderNum", FilterOperator.Contains, sOrderNumber));
            }

            //apply filters
            const oTable = oView.byId("tabOrderList");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
            
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
                        MessageToast.show("Orders Deleted");
                    },
                    error: function (data){
                        MessageToast.show("Error encountered during deletion process");
                    }
                })
            })
        },

    });
});