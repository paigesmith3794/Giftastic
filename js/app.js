
$(document).ready(function () {

    var topics = ["Alyssa Edwards", "Shangela", "BeBe Zahara Benet", "Naomi Smalls", "Trixie Mattel", "Valentina", "Bob the Drag Queen", "Bianca del Rio", "Vanjie", "Kim Chi", "Latrice Royale", "Acid Betty", "Sharon Needles", "Aquaria"];

    function makeButtons() {

        $('#buttonsView').empty();

        for (var i = 0; i < topics.length; i++) {

            var button = $('<button>')
            button.addClass('queen');
            button.attr('data-name', topics[i]);
            button.text(topics[i]);
            $('#buttonsView').append(button);

        }
    }

    $(document).on("click", "#addQueen", function () {

        event.preventDefault();
        console.log("click");
        var input = $("#queen-input").val().trim();
        topics.push(input);
        console.log(topics);
        makeButtons();
        return false;

    })

    function displayGifs() {
        var topics = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&limit=9&api_key=dc6zaTOxFJmzC";

        $.ajax({ url: queryURL, method: "GET" }).done(function (response) {
            console.log(response.data);

            var results = response.data;

            $('.gifs').empty();

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $('<div class=gifs>');
                var topicsGif = $('<img>');
                topicsGif.attr('src', results[i].images.fixed_height_still.url);
                topicsGif.attr('title', "Rating: " + results[i].rating);
                topicsGif.attr('data-still', results[i].images.fixed_height_still.url);
                topicsGif.attr('data-state', 'still');
                topicsGif.addClass('gif');
                topicsGif.attr('data-animate', results[i].images.fixed_height.url);

                gifDiv.append(topicsGif)

                $("#gifsView").prepend(gifDiv);
            }

        });
    }

    $(document).on('click', '.gif', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        };
    });

    $(document).on("click", ".queen", displayGifs);

    makeButtons();

});