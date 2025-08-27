sap.ui.define([
    "ordermanagement/controller/BaseController",
    "ordermanagement/utils/Constants",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
    ], 
    /**
     * @param {typeof sap.ui.core.mvc.Controller} BaseController
     */
    (BaseController, Constants, MessageBox, Filter, FilterOperator) => {
    "use strict";

    return BaseController.extend("ordermanagement.controller.EditPage", {
        /**
         * Called once after the controller is instantiated.
         * @public
         */
        onInit() {
            this.getComponentRouter().getRoute(Constants.ROUTE.Edit.Name).attachPatternMatched(this._onPatternMatched, this);

            // Update the Table's title
            this.updateTableTitle(Constants.CONTROLS.ProductsTable, Constants.CONTROLS.ProductsTableTitle, this.getText("product.tableTitle"));
        },
        /**
         * Navigates back using browser history.
         * If no previous hash exists, falls back to a default route.
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        _onPatternMatched: function(oEvent){
            const sRouteName = oEvent.getParameter(Constants.PARAM.Name),
                  oParam     = oEvent.getParameter(Constants.PARAM.Arguments),
                  oTable     = this.byId(Constants.CONTROLS.ProductsTable);

            this.initViewStateModel(Constants.ROUTE.Edit.View);

            this.updateViewStateFromRoute(sRouteName);

            // Bind the view to the specific order data
            if(oParam){
                this.bindViewToEntity(this.getView(), Constants.ENTITY.Orders, oParam.OrderNum);

                // Initialize Status model
                this.initStatusModel(this.getBindingContextValue(Constants.FIELD.Status));
            }

            // Bind the table to the order items
            if(oTable){
                this.bindTable(
                    oTable, 
                    Constants.ENTITY.Orders, 
                    oParam.OrderNum, 
                    this.setTableTemplate(Constants.TABLE.Product),
                    Constants.ENTITY.OrderItem
                );
            }
        },
        /**
         * Opens a product search dialog.
         * @public
         */
        _onBtnPressProductCreate: function(){
            const _this = this,
                  oView = this.getView();
            
            if (!_this.oProductDialog) {
                _this.oProductDialog = _this.loadFragment({
                    id: oView.getId(),
                    name: Constants.FRAGMENT.ProductDialog,
                    controller: _this
                }).then(function(oDialog){
                    oView.addDependent(oDialog);

                    oDialog.attachSelectionChange(_this._onSelectionChange, this);

					return oDialog;
                });
            } 
            
            _this.oProductDialog.then(function(oProductDialog) {
                _this._configDialog(oProductDialog, oView);

                oProductDialog.bindAggregation(Constants.PARAM.Items, {
                    path: `/${Constants.ENTITY.Products}`,
                    template: this.setTableTemplate(Constants.TABLE.ProductSearch),
                    filters: [new Filter(
                        Constants.FIELD.DelPlantID, //The field
                        FilterOperator.EQ, //Operator
                        this.getBindingContextValue(Constants.FIELD.DelPlantID)) //The value
                    ]
                });

                oProductDialog.open();
            }.bind(this));
        },
        /**
         * Sets configuration for the Dialog.
         * @public
         * @param {sap.m.TableSelectDialog} [oDialog] The TableSelectDialog.
         */
        _configDialog: function(oDialog){
            // Set MultiSelect property
            oDialog.setMultiSelect(true);

            // Set Remember selection
        	oDialog.setRememberSelections(false);
            
			// Set custom text for the confirmation button
			oDialog.setConfirmButtonText(this.getText("button.add"));
        },
        /**
         * Performs search on product
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        _onSearchProduct: function(oEvent){
            let sValue   = oEvent.getParameter(Constants.PARAM.Value),
                oBinding = oEvent.getSource().getBinding(Constants.PARAM.Items),
                aFilters = [];

            aFilters = [
                new Filter({
                    filters: [
                        new Filter(Constants.FIELD.ProductID, FilterOperator.Contains, sValue),
                        new Filter(Constants.FIELD.ProductName, FilterOperator.Contains, sValue)
                    ],
                    and: false
                })
            ];

			oBinding.filter(aFilters);
        },
        /**
         * Performs add of product to the table list.
         * @public
         * @param {sap.ui.base.Event} [oEvent] Event handler
         */
        _onAddProduct: function(oEvent){
            const _this = this;

            const oModel = this.getModel(),
                  sPath  = this.getView().getBindingContext().getPath();

            let aSelectedItems = oEvent.getParameter(Constants.PARAM.SelectedItems);

            if (aSelectedItems.length === 0){
                MessageBox.information(this.getText("info.noItemSelected"));
                return;
            }

            aSelectedItems.forEach(function (oItem){
                const oContext = oItem.getBindingContext();

                const sProductAddedMsg = _this.getText("info.productAdded", oContext.getObject().ProductID);
                
                let oStepInput = oItem.getCells()[2],
                    iQty       = oStepInput.getValue() || 1;

                let oNewItem = {
                    OrderNum: oContext.getObject().OrderNum,
                    ProductID: oContext.getObject().ProductID,
                    Quantity: iQty
                };

                oModel.create(sPath + `/${Constants.ENTITY.OrderItem}`, oNewItem, {
                    success: function(){
                        sap.m.MessageToast.show(sProductAddedMsg);
                    }
                });
            });
        },
        /**
         * Performs delete to the dataset of the selected items in table.
         * Since we are working on a local OData, this just simulates 
         * deletion In-memory only.
         * @public
         */
        _onBtnPressProductDelete: function(){
            let oTable         = this.byId(Constants.CONTROLS.ProductsTable),
                aSelectedItems = oTable.getSelectedContexts(),
                oModel         = this.getModel();

            if (aSelectedItems.length === 0){
                MessageBox.error(this.getText("error.noSelection"));
                return;
            }

            const sConfirmMsg = this.getText("confirm.deleteItems", [aSelectedItems.length]);

            MessageBox.confirm(sConfirmMsg, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (sAction){
                    if (sAction === MessageBox.Action.YES){
                        // Remove selected items from UI only
                        aSelectedItems.forEach(function (oItem){
                            oModel.remove(oItem.getPath());
                        });
                    }
                }.bind(this)
            });
        },
        /**
         * Commit changes done in this page
         * Since we are working on a local OData, this just simulates 
         * deletion In-memory only.
         * @public
         */
        onBtnPressOrderSave: function(){
            const _this = this;

            const oModel      = this.getModel(),
                  sOrderNum   = this.getBindingContextValue(Constants.FIELD.OrderNum),
                  sPath       = this.getView().getBindingContext().getPath();
            
            const sConfirmMsg       = this.getText("confirm.saveChanges"),
                  sSuccessUpdateMsg = this.getText("info.orderUpdated", sOrderNum);

            // Get selected status from statusModel
            let sStatus = this.getModel(Constants.MODEL.Status).getProperty(Constants.PROPERTY.SelectedStatus);

            // Commit changes
            MessageBox.confirm(sConfirmMsg, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (sAction){
                    if (sAction === MessageBox.Action.YES){
                        // Update Status from statusModel
                        oModel.update(sPath, { Status: sStatus }, {
                            success: function(){
                                MessageBox.information(sSuccessUpdateMsg,{
                                    onClose: function(){
                                        oModel.refresh(true);

                                        _this.navigateToMain(Constants.ROUTE.Main.Name);
                                    }.bind(this)
                                });
                            }.bind(this)
                        });
                    }
                }
            });
        },
        /**
         * Cancel the operation and go back to main page.
         * @public
         */
        onBtnPressCancel: function(){
            const _this = this;
            const sConfirmMsgCancel = this.getText("confirm.cancelEdit");

            MessageBox.confirm(sConfirmMsgCancel, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (sAction){
                    if (sAction === MessageBox.Action.YES){
                        _this.navigateToMain(Constants.ROUTE.Main.Name);
                    }
                }
            });
        }
    });
});