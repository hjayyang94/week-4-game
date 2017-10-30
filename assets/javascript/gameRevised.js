$(document).ready(function () {

    var isGameOver = false;
    var isPlayerChosen = false;
    var isDefenderChosen = false;
    var isDefenderAlive = false;


    var enemiesLeft = [];
    var defenderChar;
    var playerChar;

    var Obi = {
        hp: 120,
        atk: 6,
        cAtk: 6,
        isAlive: true,
        str: "Obiwan Kinobi",

        thisAttacks: function (defender) {
            this.hp -= defender.cAtk;
            this.atk += this.atk;
        },

        thisDefends: function (player) {
            this.hp -= player.atk;
        },

        checkAlive: function () {
            if (this.hp < 1) {
                this.isAlive = false;
            }
        },

        reset: function () {
            hp = 120;
            atk = 6;
            cAtk = 6;
            isAlive = true;
            str = "Obiwan Kinobi";
        }
    }

    var Luke = {
        hp: 120,
        atk: 6,
        cAtk: 6,
        isAlive: true,
        str: "Luke Skywalker",

        thisAttacks: function (defender) {
            this.hp -= defender.cAtk;
            this.atk += this.atk;
        },

        thisDefends: function (player) {
            this.hp -= player.atk;
        },

        checkAlive: function () {
            if (this.hp < 1) {
                this.isAlive = false;
            }
        },

        reset: function () {
            hp = 120;
            atk = 6;
            cAtk = 6;
            isAlive = true;
            str = "Luke Skywalker";
        }
    }

    var DMaul = {
        hp: 120,
        atk: 6,
        cAtk: 6,
        isAlive: true,
        str: "Darth Maul",

        thisAttacks: function (defender) {
            this.hp -= defender.cAtk;
            this.atk += this.atk;
        },

        thisDefends: function (player) {
            this.hp -= player.atk;
        },

        checkAlive: function () {
            if (this.hp < 1) {
                this.isAlive = false;
            }
        },

        reset: function () {
            hp = 120;
            atk = 6;
            cAtk = 6;
            isAlive = true;
            str = "DarthMaul";
        }
    }

    var Sith = {
        hp: 120,
        atk: 6,
        cAtk: 6,
        isAlive: true,
        str: "Sith Lord",

        thisAttacks: function (defender) {
            this.hp -= defender.cAtk;
            this.atk += this.atk;
        },

        thisDefends: function (player) {
            this.hp -= player.atk;
        },

        checkAlive: function () {
            if (this.hp < 1) {
                this.isAlive = false;
            }
        },

        reset: function () {
            hp = 120;
            atk = 6;
            cAtk = 6;
            isAlive = true;
            str = "Sith Lord";
        }
    }

    var charList = [Obi, Luke, DMaul, Sith];

    function startOver() {
        Obi.reset();
        var isGameOver = false;
        var isPlayerChosen = false;
        var isDefenderChosen = false;
        var isDefenderAlive = false;

        var enemiesLeft = [];
        var defenderChar;
        var playerChar;

    }

    function choosePlayer(index) {
        if (!isPlayerChosen) {
            playerChar = charList[index];
            console.log("playerChar is "+playerChar);
        }
    }

    function chooseDefender(event) {
        var index = event.value;
        defenderChar = charList[index];
    }

    $(".chooseChar").on("click", function () {
        
        if (!isPlayerChosen) {
            isPlayerChosen = true;
            console.log("this is 'this' "+this);
            choosePlayer(this.value);
            
            this.addClass("chosenOne");

            $("#endingArea").append("You chose "+playerChar.str+" as your character.");
        }
    })

    $(".chooseEnemy").on("click", function(){
        chooseDefender(this);
        $("#endingArea").append("You chose "+defenderChar.str+" to fight.");
    })

    $("#fightButton").on("click", function () {
            if (playerChar != undefined) {
                if (defenderChar != undefined) {
                    playerChar.thisAttacks(defenderChar);
                    defenderChar.thisDefends(playerChar);
                    defenderChar.checkAlive();
                    playerChar.checkAlive();

                    $("#endingArea").append("\nYou attacked "+defenderChar.str+".");
                    $("#endingArea").append("\nYour Attack Power is now: +"+playerChar.atk);
                    if (!playerChar.isAlive) {
                        isGameOver = true;
                    }
                    if (!defenderChar.isAlive) {
                        isDefenderChosen = false;
                        isDefenderAlive = false;
                    }

                }
            }
        })




});




