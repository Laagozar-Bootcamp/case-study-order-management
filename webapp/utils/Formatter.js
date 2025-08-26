sap.ui.define([
    "ordermanagement/utils/Constants",
	"sap/ui/core/format/DateFormat"
], function(Constants, DateFormat) {
	"use strict";

	const formatter = {
        /**
         * Method to format OData date format (yyyy-MM-dd) into medium date format (dd MMM yyyy)
         * @public
         * @param {String} [sDate] OData date
         * @returns {Date} Medium date format
         */
        formatDate: function(sDate) {			
	        if(sDate){
                const oDateFormatInput = DateFormat.getDateInstance({ pattern: Constants.DATE_FORMAT.Pattern01 });
                let oDate = oDateFormatInput.parse(sDate);

                const oDateFormatOutput = DateFormat.getDateInstance({ pattern: Constants.DATE_FORMAT.Pattern02 });
                return oDateFormatOutput.format(oDate);
            }
        },
        /**
         * Method to format color to its corresponding state
         * @public
         * @param {String} [sStatus] Status value
         * @returns {ObjectStatus} Color for status
         */
        statusColor: function(sStatus) {
            switch(sStatus){
                case Constants.STATUS.Created:
                    return Constants.STATUS_COLOR.None;
                case Constants.STATUS.Released:
                    return Constants.STATUS_COLOR.Warning;
                case Constants.STATUS.PartiallyCompleted:
                    return Constants.STATUS_COLOR.Information;
                case Constants.STATUS.Delivered:
                    return Constants.STATUS_COLOR.Success;
                default:
                    return Constants.STATUS_COLOR.None;
            }
        },
        /**
         * Calculates the total price by multiplying quantity and unit price.
         * @public
         * @param {String|Number} [vQuantity] The quantity of the item.
         * @param {String|Number} [vUnitPrice] The price per quantity.
         * @returns {String} Formatted total price.
         */
        formatTotalPrice: function(vQuantity, vUnitPrice) {			
	        const fQty   = parseFloat(vQuantity),
                  fPrice = parseFloat(vUnitPrice);
                  
            let fTotal;
            
            if (isNaN(fQty) || isNaN(fPrice)){
                return "0";
            }

            fTotal = fQty * fPrice;
            return `${fTotal.toFixed(0)}`;
        }
	};

	return formatter;
});
