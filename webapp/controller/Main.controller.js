sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ordermanagement.controller.Main", {
        onInit() {
        },

        onPressDelete: function(){
            /*
            let aSelectedOrders = this.getView().byId("tabOrderList").getSelectedIndices();

            if(aSelectedOrders.length = "0"){
                MessageToast.show("Please select an item from the table");
            }else {
                let oModel = this.getOwnerComponent().getModel();
                let sSelItemPath = aSelectedOrders.getBindingContextPath();

                oModel.remove(sSelItemPath,{
                success: function (data) {
                },
                error: function (data){
                }
                })
            }*/
        }
    });
});