$(document).ready(function() {
    //prevent value
    function presentValue(futureWorth, rate, month) {
        return futureWorth / Math.pow((1 + rate), month);
    }

    //future worth
    function futureWorth(presentValue, rate, month) {
     return presentValue * Math.pow((1 + rate), month);
    }

    //cash flow
    function cashFlow(investment, cost) {
     return investment - cost;
    }

    function calculatePV(event){
        var $form = $(event.target).closest('form');
        var futureWorth = parseFloat($form.find('input[name="future_worth"]').val());
        var month = parseFloat($form.find('input[name="month"]').val());
        var rate = parseFloat($form.find('input[name="rate"]').val());
        var PV = presentValue(futureWorth, rate, month);
        $('.prevent_value').text(PV + "$");
    }

    function calculateFW(event){
        var $form = $(event.target).closest('form');
        var presentValue = parseFloat($form.find('input[name="present_value"]').val());
        var month = parseFloat($form.find('input[name="month"]').val());
        var rate = parseFloat($form.find('input[name="rate"]').val());
        var FW = futureWorth(presentValue, rate, month);
        $('.future_worth').text(FW + "$");
    }

    
    //Add event to DOM
    $('button[name="calculate_present_value"]').click(calculatePV);
    $('button[name="calculate_future_worth"]').click(calculateFW);
});