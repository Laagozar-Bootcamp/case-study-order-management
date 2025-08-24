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

        onSearch: function(oEvent){
            // this will retrieve all filters in an array, with / without entries
            let aEvtParameters = oEvent.getParameter("selectionSet"); 
            let oOrderNum = aEvtParameters[0].getValue();
            let oDate = aEvtParameters[1].getDateValue();
            let aSelectedKeys = aEvtParameters[2].getSelectedKeys();

            //apply filters
            const aFilters = [];
            if (oOrderNum){
                aFilters.push(new Filter("OrderNum", FilterOperator.Contains, oOrderNum));
            }
            
            //Date needs to be converted back to JSON ms format
            //if (oDate){
            //    aFilters.push(new Filter("CreateDat", FilterOperator.EQ, oDate));
            //}

            //Status keys
            aSelectedKeys.forEach( function(oKey){
                if(oKey === "created"){
                    aFilters.push(new Filter("Status", FilterOperator.EQ, "Created"));
                }else if(oKey === "released"){
                    aFilters.push(new Filter("Status", FilterOperator.EQ, "Released"));
                }else if(oKey === "partComp"){
                    aFilters.push(new Filter("Status", FilterOperator.EQ, "Partially Completed"));
                }else{
                    aFilters.push(new Filter("Status", FilterOperator.EQ, "Delivered"));
                }
            });

            let oCombinedFilter = null;
            oCombinedFilter = new Filter(aFilters, false);

            const oTable = this.byId("tabOrderList");
            const oBinding = oTable.getBinding("items");
            //oBinding.filter(aFilters);
            oBinding.filter(oCombinedFilter);
        },
        /* 
        Keeping this part for now:

        onSelectionFinish: function (oEvent){
            let aSelectedStats = oEvent.getParameter("selectedItems");
            let aStatsFilters = [];

            aSelectedStats.forEach( function (oItem) {
                aStatsFilters.push(new Filter("Status", FilterOperator.EQ, oItem.getText()));
            });

            let oCombinedFilter = null;
            if (aStatsFilters.length > 0) {
                oCombinedFilter = new Filter(aStatsFilters, false); //if multiple are selected, false = OR
            }

            const oTable = this.byId("tabOrderList");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(oCombinedFilter); //this should apply the filter
        },
        
        //This does not work, could be due to operator = contains (?)
        onLiveChange: function(oEvt){
            const oTable = this.byId("tabOrderList");
            const oBinding = oTable.getBinding("items");

            const sQuery = oEvt.getParameter("newValue");

            let aFilters = [];
            if (sQuery){
                aFilters.push(new Filter("OrderNum", FilterOperator.Contains, sQuery));
            }

            oBinding.filter(aFilters);
        },*/

        onPressCreate: function(){
            const oRouter = this.getOwnerComponent().getRouter();
            //insert create route here
            oRouter.navTo("RouteCreatePage");
        },

        onPressOrder: function(oEvent){
            
            const oSelectedOrder = oEvent.getSource();
            const oContext       = oSelectedOrder.getBindingContext();
            const sOrderNumber   = oContext.getProperty("OrderNum");
            const oRouter        = this.getOwnerComponent().getRouter();            

            const oTableOrders  = this.byId("tabOrderList");
            const aTabOrdsPaths = oTableOrders._aSelectedPaths;
            
            // Add Validation to display message if user selects multiple order/items
            if(aTabOrdsPaths.length > 1){
                MessageToast.show("Please select only one item from the table");
            }else {                
                oRouter.navTo("RouteDetailPage", {
                    // To Follow: Logic to pass the selected row data to Detail page
                });
            }
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