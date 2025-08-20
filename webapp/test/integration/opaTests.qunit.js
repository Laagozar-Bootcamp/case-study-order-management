/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["ordermanagement/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
