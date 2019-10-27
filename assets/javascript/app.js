$(document).ready(function () {
    var countries = ["Africa", "Armenia", "Argentina", "Belgium", "Bulgaria", "Cambodia", "Cameroon", "	Chile", "China", "	Colombia",
        "Cyprus", "Denmark", "Egypt", "	Finland", "	France", "Germany", "Greece", "Haiti", "India", "Jamaica", "Madagascar", "Malta", "	New Zealand"];
    var still = "";
    var animated = "";
    function addButtons() {
        $("#animalBtnSection").empty();
        //  create buttons 

        for (var i = 0; i < countries.length; i++) {

            // create new buttons and give a class and add to Page
            var newButtons = $("<button class=btn-success>");
            newButtons.attr("animal-type", countries[i]);
            newButtons.attr("class", "gifs btn-success");
            newButtons.text(countries[i]);
            //    Add button to DOM
            $("#animalBtnSection").append(newButtons);

        }


    }

    function submitButton() {
        // when clicked on submit button
        $("#submit-btn").on("click", function (event) {
            event.preventDefault();
            // get input text value
            var userInput = $("#userInputs").val().trim();

            // push user input to array
            countries.push(userInput);

            // Create new buttons for userInputs
            addButtons();
        });

    }

    function displayGifs() {
        // gets the value of button clicked
        var buttonValue = $(this).attr("animal-type");

        var apiKey = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            buttonValue + "&api_key=" + apiKey + "&limit=10";

        $.ajax({
            url: queryURL,
            type: "GET"

        }).then(function (response) {
            $(".gifImages").empty();
            for (var i = 0; i < 10; i++) {
                // removes images when button is clicked

                var results = response.data;
                animated = results[i].images.fixed_height.url;
                still = results[i].images.fixed_height_still.url;

              console.log(results);

                // create image element

                var animalImage = $("<img>");
                animalImage.attr("src", still);
                animalImage.attr("data-still", still);
                animalImage.attr("data-animate", animated);
                animalImage.attr("data-state", "still");
                animalImage.addClass("animal-image");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                // Adds images to DOM

                $(".gifImages").append(p)
                $(".gifImages").append(animalImage);


            }
        });
    }

    function gifAnimate() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");

        }
    }

    addButtons();
    submitButton();
    $(document).on("click", ".gifs", displayGifs);
    $(document).on("click", ".animal-image", gifAnimate);

});