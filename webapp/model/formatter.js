sap.ui.define([
    "sap/m/library",
    "sap/ui/model/type/Currency",
    "sap/ui/core/format/DateFormat"
], function (mobileLibrary, Currency, DateFormat) {
    "use strict";
    return {            
        formatDate: function (sDate) {
            if(sDate){
                //extract msec string
                const nMilliseconds = parseInt(sDate.replace(/\/Date\((\d+)\)\//, '$1'), 10);
                const oDate = new Date(nMilliseconds);
                const oDateFormat = sap.ui.core.format.DateFormat.getInstance();
                return oDateFormat.format(oDate);
            }
            return "";
        },

        formatTotalPrice: function (fUnitPrice, fQty) {
            var oCurrency = new Currency();
            return oCurrency.formatValue([fUnitPrice * fQty], "string");
        },

        /*
        Apply conditional styling (?)
        formatStatus: function (sStatus) { 
            if("Released"){

            }else if("Partially Completed"){

            }else { //Delivered

            }
        }*/
    };
});