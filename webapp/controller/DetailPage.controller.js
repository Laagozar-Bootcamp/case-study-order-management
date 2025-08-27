sap.ui.define([
    "ordermanagement/controller/BaseController",
    "ordermanagement/utils/Constants",
    "sap/m/MessageToast",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     */
    function (BaseController, Constants, MessageToast, History) {
        "use strict";

        return BaseController.extend("ordermanagement.controller.DetailPage", {
            onInit: function () {               
                 
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteDetailPage").attachPatternMatched(this._onObjectMatched, this);
                },
                
            _onObjectMatched: function (oEvent) {
                const oParam = oEvent.getParameter(Constants.PARAM.Arguments);

                // Bind the view to the specific order data
                if(oParam){
                    this.bindViewToEntity(this.getView(), Constants.ENTITY.Orders, oParam.OrderNum);
                }
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
            /**
             * Navigate to Edit page of the order.
             * @public
             */
            onPressDetailEdit: function(){
                const sOrderNum = this.getBindingContextValue(Constants.FIELD.OrderNum);

                if (sOrderNum){

                    this.navigateTo(Constants.ROUTE.Edit.Name, { OrderNum: sOrderNum });
                }
            }

        });
    });
