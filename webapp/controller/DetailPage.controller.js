sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, History) {
        "use strict";

        return Controller.extend("ordermanagement.controller.DetailPage", {
            onInit: function () {                
                // Get the router object
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetailPage").attachPatternMatched(this._onObjectMatched, this);
                },
                
            _onObjectMatched: function (oEvent) {
                // Get the passed value from arguments
                var aArgs = oEvent.getParameter("arguments");                
                // For Testing only: To check if Order Number is passed to next page
                },

            //Add Route Navigation function when user click the Cancel button
            onPressDetailCancel: function() {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
                var oRouter = this.getOwnerComponent().getRouter();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    oRouter.navTo("Main", {}, true);
                }
            },
            
            //Add Route Navigation function when user click the Edit button
            onPressDetailEdit: function(oEvent){
                // const oRouter = this.getOwnerComponent().getRouter();            
                //     oRouter.navTo("RouteEditPage", {
                //     // }
                // });
            }

        });
    });
