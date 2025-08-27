sap.ui.define([], () => {
    "use strict";

    var constants = {
        EMPTY : "",
        SPACE : " ",
        ROUTE : {
            "Main" : {
                "View" : "Main",
                "Name" : "RouteMain"
            },
            "Create" : {
                "View" : "CreatePage",
                "Name" : "RouteCreatePage"
            },
            "Details" : {
                "View" : "DetailPage",
                "Name" : "RouteDetailPage"
            },
            "Edit" : {
                "View" : "EditPage",
                "Name" : "RouteEditPage"
            },
        },
        CONTROLS : {
            "OrdersTable"           : "ordersTable",
            "OrdersTableTitle"      : "ordersTableTitle",
            "ProductsTable"         : "productsTable",
            "ProductsTableSearch"   : "productsTableSearch",
            "ProductsTableTitle"    : "productsTableTitle",
            "InpOrderNumber"        : "inpOrderNumber",
            "DateRangeCreationDate" : "dateRangeCreationDate",
            "MultiSelectStatus"     : "multiSelectStatus"
        },
        MODEL : {
            "Status"    : "statusModel",
            "i18n"      : "i18n",
            "ViewState" : "viewState",
            "Local"     : "local"
        },
        PARAM : {
            "SelectionSet"     : "selectionSet",
            "Items"            : "items",
            "Name"             : "name",
            "Arguments"        : "arguments",
            "Total"            : "total",
            "Value"            : "value",
            "Selected"         : "selected",
            "ListItem"         : "listItem",
            "SelectedItems"    : "selectedItems",
            "SelectedContexts" : "selectedContexts"
        },
        DATE_FORMAT : {
            "Pattern01" : "yyyy-MM-dd",
            "Pattern02" : "dd MMM yyyy"
        },
        STATUS : {
            "Created"            : "Created",
            "Released"           : "Released",
            "PartiallyCompleted" : "Partially Completed",
            "Delivered"          : "Delivered"
        },
        STATUS_COLOR : {
            "None"        : "None",
            "Warning"     : "Warning",
            "Information" : "Information",
            "Success"     : "Success"
        },
        FIELD : {
            "OrderNum"    : "OrderNum",
            "ProductID"   : "ProductID",
            "ProductName" : "ProductName",
            "DelPlantID"  : "DelPlantID",
            "Status"      : "Status",
            "Quantity"    : "Quantity"
        },
        FILTER_FIELD : {
            "OrderNum"  : "OrderNum",
            "CreateDat" : "CreateDat",
            "Status"    : "Status"
        },
        PROPERTY : {
            "Mode"           : "/mode",
            "SelectedStatus" : "/selectedStatus"
        },
        ENTITY : {
            "Orders"    : "Orders",
            "OrderItem" : "OrderItem",
            "Products"  : "Products",
            "Product"   : "Product"
        },
        EVENT : {
            "UpdateFinished" : "updateFinished"
        },
        TABLE : {
            "Product"       : "Product",
            "ProductSearch" : "ProductSearch"
        },
        FRAGMENT : {
            "ProductDialog" : "ordermanagement.fragment.ProductDialog"
        },
        BATCH_ID : {
            "OrderChanges" : "OrderChanges"
        }
    };

    return constants;
    
});