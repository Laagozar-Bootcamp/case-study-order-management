sap.ui.define([
    "ordermanagement/controller/BaseController",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
],
    function (BaseController, MessageToast, History) {
        "use strict";

        return BaseController.extend("ordermanagement.controller.DetailPage", {
            onInit: function () {               
                 
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetailPage").attachPatternMatched(this._onObjectMatched, this);
                },
                
            _onObjectMatched: function (oEvent) {

                var sOrderNumber = oEvent.getParameter("arguments").idOrderNo;      

                var sPath = "/Orders(" + sOrderNumber + ")";
                this.getView().bindElement({
                    path: sPath
                    })
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
                this.getOwnerComponent().getRouter().navTo("RouteEditPage");
            }

        });
    });
