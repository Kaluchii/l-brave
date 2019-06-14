$(function () {

    var $pluralItem = $('.js_plural');

    $pluralItem.each(function () {
        var thisPluralText = $(this).text(),
            thisArrText = thisPluralText.split('/'),
            thisQuantity = +thisArrText[0],
            thisCount;

        thisArrText.shift();
        if ((thisQuantity % 100 >= 11 && thisQuantity % 100 <= 20) || (thisQuantity % 10 >= 5)){
            thisCount = 2;
        } else if (thisQuantity % 10 === 1) {
            thisCount = 0;
        } else {
            thisCount = 1;
        }
        $(this).html(thisQuantity + ' ' + thisArrText[thisCount]);
        $(this).removeClass('hidden');
    });
});