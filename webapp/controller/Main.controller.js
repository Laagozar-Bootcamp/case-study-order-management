sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ordermanagement.controller.Main", {
        onInit() {
        },

        onPressDelete: function(evt){
            const oTableOrders = this.byId("tabOrderList");
            const aTabOrdsPaths = oTableOrders._aSelectedPaths;
            
            if(aTabOrdsPaths.length < 1){
                MessageToast.show("Please select an item from the table");
            }else {
                let oModel = this.getOwnerComponent().getModel();
                aTabOrdsPaths.forEach(function(sPath) {
                    oModel.remove(sPath, {
                        success: function (data) {

                        },
                        error: function (data){

                        }
                    })
                })
            }
        }
    });
});