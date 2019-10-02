console.log("unicorns are here");

(function() {
    var currentPlayer = "player1";
    var popUp = $("#modal-wrapper");
    var button = $("#dialog-button");
    popUp.hide();

    //DEFINES HOW MANY SLOTS MUST BE CLICKED IN ORDER TO RESULT IN A VICTORY

    $(".column").on("click", function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");

        for (var i = 5; i >= 0; i--) {
            var slotInColumn = slotsInColumn.eq(i);
            if (
                !slotInColumn.hasClass("player1") &&
                !slotInColumn.hasClass("player2")
            ) {
                slotInColumn.addClass(currentPlayer);
                break;
            }
        }

        if (i == -1) {
            //column was full
            return;
        }

        // POPS UP VICTORY ANNOUNCEMENT

        if (checkForVictory(slotsInColumn)) {
            popUp.show();
        } else if (checkForVictory($(".row" + i))) {
            popUp.show();
        } else if (checkDiagonal()) {
            popUp.show();
        }

        button.on("click", function() {
            popUp.hide();
            $(".player1").removeClass("player1");
            $(".player2").removeClass("player2");
        });
        switchPlayers();
    });

    // RESETS THE GAME


    // DEFINES WHEN TO SWITCH A PLAYER

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    // DEFINES WHEN A VICTORY OCCURS

    function checkForVictory(slots) {
        var str = "";
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                str += "o";
            } else {
                str += "x";
            }
        }
        return str.indexOf("oooo") > -1;
    }

    // DEFINES A DIAGONAL VICTORY

    function checkDiagonal() {
        var allCollumns = $(".column");
        for (var i = 0; i < allCollumns.length; i++) {
            for (var row = 0; row < 6; row++) {
                if (
                    allCollumns
                        .eq(i)
                        .find(".row" + row)
                        .hasClass(currentPlayer) &&
                    allCollumns
                        .eq(i + 1)
                        .find(".row" + (row + 1))
                        .hasClass(currentPlayer) &&
                    allCollumns
                        .eq(i + 2)
                        .find(".row" + (row + 2))
                        .hasClass(currentPlayer) &&
                    allCollumns
                        .eq(i + 3)
                        .find(".row" + (row + 3))
                        .hasClass(currentPlayer)
                ) {
                    return true;
                } else if (
                    allCollumns
                        .eq(i)
                        .find(".row" + row)
                        .hasClass(currentPlayer) &&
                    allCollumns
                        .eq(i + 1)
                        .find(".row" + (row - 1))
                        .hasClass(currentPlayer) &&
                    allCollumns
                        .eq(i + 2)
                        .find(".row" + (row - 2))
                        .hasClass(currentPlayer) &&
                    allCollumns
                        .eq(i + 3)
                        .find(".row" + (row - 3))
                        .hasClass(currentPlayer)
                ) {
                    return true;
                }
            }
        }
    }

    checkDiagonal();
})();
