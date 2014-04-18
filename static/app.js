$(document).ready(function () {

    function displayData(result) {
        $('#results').append('<h1>' + result + '</h1>');
    }

    function showButton(response) {
        $('#submit').show();
        $('#loading').hide();
    }

    $('#submit').on('click', function () {
        callOperation('suprise_cow', [], displayData);
    });

    initializeModel('Moo.jl', showButton);

});
