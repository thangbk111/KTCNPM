$(document).ready(function() {
    //prevent value
    function presentValue(futureWorth, rate, month) {
        return futureWorth / Math.pow((1 + rate), month);
    }

    //future worth
    function futureWorth(presentValue, rate, month) {
     return presentValue * Math.pow((1 + rate), month);
    }

    function calculatePV(event){
        var $form = $(event.target).closest('form');
        var futureWorth = parseFloat($form.find('input[name="future_worth"]').val());
        var month = parseFloat($form.find('input[name="month"]').val());
        var rate = parseFloat($form.find('input[name="rate"]').val());
        var PV = presentValue(futureWorth, rate, month).toFixed(2);
        $('.prevent_value').text(PV + "$");
    }

    function calculateFW(event){
        var $form = $(event.target).closest('form');
        var presentValue = parseFloat($form.find('input[name="present_value"]').val());
        var month = parseFloat($form.find('input[name="month"]').val());
        var rate = parseFloat($form.find('input[name="rate"]').val());
        var FW = futureWorth(presentValue, rate, month).toFixed(2);
        $('.future_worth').text(FW + "$");
    }

    function getAllProceeds(event) {
        var proceeds = [];
        var $table = $(event.target).closest('table');
        $table.find('.proceed').each(function() {
            proceeds.push(parseFloat($(this).val()));
        });
        return proceeds;
    }

    function getAllCosts(event) {
        var costs = [];
        var $table = $(event.target).closest('table');
        $table.find('.cost').each(function() {
            costs.push(parseFloat($(this).val()));
        });
        return costs;
    }

    function calculateCashFlow(proceeds, costs) {
        var cashFlow = [];
        for (var i = 0; i < costs.length; i++) {
            cashFlow.push(proceeds[i] - costs[i]);
        }
        return cashFlow;
    }

    function calculatePVs(cashFlow, rate) {
        var values = [];
        for (var i = 0; i < cashFlow.length; i++) {
            values.push(presentValue(cashFlow[i], rate, i));
        }
        return values;
    }

    function calculateNPV(event) {
        var $table = $(event.target).closest('table');
        var rate = parseFloat($table.find('.rate').val());
        console.log(rate);
        var proceeds = getAllProceeds(event);
        var costs = getAllCosts(event);
        var cashFlow = calculateCashFlow(proceeds, costs);
        var presentValues = calculatePVs(cashFlow, rate);
        var npv = 0;
        for (var i = 0; i < presentValues.length; i++) {
            npv += presentValues[i];
            //genarate DOM
            $table.find(".cash_flow").eq(i).text(cashFlow[i]);
            $table.find(".present_value").eq(i).text(presentValues[i].toFixed(2));
        }
        $table.find('.npv').text(npv.toFixed(2) + "$");
    }
    //Add event to DOM
    $('button[name="calculate_present_value"]').click(calculatePV);
    $('button[name="calculate_future_worth"]').click(calculateFW);
    $('button[name="calculate_npv"]').click(calculateNPV);
});