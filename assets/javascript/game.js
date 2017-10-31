$(document).ready(function () {

    var isGameOver = false;
    var isPlayerSelected = false;
    var strCharList = ["Obi", "Luke", "DMaul", "Sith"];
    var enemiesLeft = [];
    var defenderChar;
    var playerChar;


    var Obi = {
        health: 120,
        attack: 6,
        cAttack: 6,
        str: "Obi",
        isAlive: true,
        imgLink: "Obiwan.jpg",


        atkClicked: function (enemy) {
            this.health -= enemy.cAttack;
            addition = this.attack;
            console.log(addition);
            this.attack += addition;
        },

        takeDamage: function (playerChar) {
            this.health -= playerChar.attack;
        },

        checkAlive: function () {
            if (this.health <= 0) {
                this.isAlive = false;
            }

        },

        reset: function () {
            this.health = 120;
            this.attack = 6;
            this.cAttack = 6;
            this.isAlive = true;
        },
    }

    var Luke = {
        health: 100,
        attack: 9,
        cAttack: 4,
        str: "Luke",
        isAlive: true,
        imgLink: "LukeSkywalker.jpg",

        atkClicked: function (enemy) {
            this.health -= enemy.cAttack;
            this.attack = (this.attack + this.attack);
        },

        checkAlive: function () {
            if (this.health <= 0) { this.isAlive = false }
        },
        takeDamage: function (playerChar) {
            this.health -= playerChar.attack;
        },
        reset: function () {
            this.health = 100;
            this.attack = 9;
            this.cAttack = 4;
            this.isAlive = true;
        },
    }

    var DMaul = {
        health: 180,
        attack: 4,
        cAttack: 17,
        str: "DMaul",
        isAlive: true,
        imgLink: "DarthMaul.jpg",

        atkClicked: function (enemy) {
            this.health -= enemy.cAttack;
            this.attack = (this.attack + this.attack);
        },

        checkAlive: function () {
            if (this.health <= 0) { this.isAlive = false }
        },
        takeDamage: function (playerChar) {
            this.health -= playerChar.attack;
        },
        reset: function () {
            this.health = 120;
            this.attack = 4;
            this.cAttack = 17;
            this.isAlive = true;
        },
    }

    var Sith = {
        health: 70,
        attack: 10,
        cAttack: 20,
        str: "Sith",
        isAlive: true,
        imgLink: "SithLord.jpg",

        atkClicked: function (enemy) {
            this.health -= enemy.cAttack;
            this.attack = (this.attack + this.attack);
        },
        takeDamage: function (playerChar) {
            this.health -= playerChar.attack;
        },
        checkAlive: function () {
            if (this.health <= 0) { this.isAlive = false }
        },
        reset: function () {
            this.health = 70;
            this.attack = 10;
            this.cAttack = 20;
            this.isAlive = true;
        },
    }
    var charList = [Obi, Luke, DMaul, Sith];

    function startOver() {
        charList = [Obi, Luke, DMaul, Sith];
        strCharList = ["Obi", "Luke", "DMaul", "Sith"];
        Obi.reset();
        Luke.reset();
        DMaul.reset();
        Sith.reset();
        playerChar = undefined;
        isGameOver = false;
        enemiesLeft = undefined;
        defenderChar = undefined;

    }


    //imgs for starting setup
    for (var i = 0; i < charList.length; i++) {
        var imgList = $("<img>");
        imgList.addClass("charImage");
        imgList.attr("src", "assets/images/" + charList[i].imgLink);
        imgList.attr("value", charList[i].str);
        $("#yourCharacter").append(imgList);

    }


    function chooseChar() {
        $(".charImage").on("click", function () {
            var char = $(this).attr("value");

            var index = strCharList.indexOf(char);
            strCharList.splice(index, 1);
            playerChar = charList.splice(index, 1)[0];

            var heroImg = $("<img>");
            heroImg.addClass("charImage");
            heroImg.attr("src", "assets/images/" + playerChar.imgLink);
            heroImg.attr("value", playerChar.str);
            heroImg.addClass("enemies");
            $("#yourCharacter").html(heroImg);

            $("#status").html("- Your stats - HP: " + playerChar.health + "   Attack Power: " + playerChar.attack);

            isPlayerSelected = true;

            for (var i = 0; i < charList.length; i++) {
                var imgEnemies = $("<img>");
                imgEnemies.addClass("charImage");
                imgEnemies.attr("src", "assets/images/" + charList[i].imgLink);
                imgEnemies.attr("value", charList[i].str);
                imgEnemies.addClass("enemies");
                $("#enemiesList").append(imgEnemies);
            }
            chooseDefender();

        })

    }

    function chooseDefender() {
        console.log("running chooseDefender");
        $(".enemies").on("click", function () {
            console.log("clicked on enemy");
            var enemyChar = $(this).attr("value");
            var index = strCharList.indexOf(enemyChar);
            defenderChar = charList[index];

            var defImg = $("<img>");
            defImg.addClass("charImage");
            defImg.attr("src", "assets/images/" + defenderChar.imgLink);
            defImg.attr("value", defenderChar.str);
            defImg.addClass("enemies");
            $("#defender").html(defImg);
            isPlayerSelected = true;
        })
    }

    function clickFight() {
        $("#fightButton").on("click", function () {
            //fight player with defender
            console.log("attack!");
            if (playerChar != undefined) {
                if (defenderChar != undefined) {
                    if (playerChar.isAlive) {
                        if (charList.length !== 0) {
                            playerChar.atkClicked(defenderChar);
                            playerChar.checkAlive();
                            defenderChar.takeDamage(playerChar);
                            defenderChar.checkAlive();

                            clickReset();
                            $("#endingArea").append("You have attacked! \nYour Attack Power is now at: " + playerChar.attack);
                            $("#status").html("- Your stats - HP: " + playerChar.health + "   Attack Power: " + playerChar.attack);

                            if (!defenderChar.isAlive) {
                                $("#endingArea").append("The enemy has fallen! Pick another enemy to fight");
                                var index = strCharList.indexOf(defenderChar.str);
                                strCharList.splice(index, 1);
                                charList.splice(index, 1);
                                defenderChar = undefined;

                                $("#enemiesList").empty();

                                for (var i = 0; i < charList.length; i++) {
                                    var imgEnemies = $("<img>");
                                    imgEnemies.addClass("charImage");
                                    imgEnemies.attr("src", "assets/images/" + charList[i].imgLink);
                                    imgEnemies.attr("value", charList[i].str);
                                    imgEnemies.addClass("enemies");
                                    $("#enemiesList").append(imgEnemies);
                                }
                                $("#defender").empty();
                                if(charList.length == 0){
                                    alert("You won! press reset to play again");
                                    isGameOver = true;
                                    return;
                                }
                                chooseDefender();
                            }
                        }
                        

                    }

                    else {
                        $("endingArea").append("You died! GAME OVER");
                        isGameOver = true;
                    }
                }
                else {
                    alert("You can't attack thin air! What's the point...Choose an enemy");
                }

            }
            else {
                alert("Choose a Character to play first before attacking");
            }


        });
    }

    function clickReset() {
        $("#resetButton").on("click", function () {
            $("#yourCharacter, #enemiesList, #defender, #status, #endingArea").empty();
            startOver();
            for (var i = 0; i < charList.length; i++) {
                var imgList = $("<img>");
                imgList.addClass("charImage");
                imgList.attr("src", "assets/images/" + charList[i].imgLink);
                imgList.attr("value", charList[i].str);
                $("#yourCharacter").append(imgList);
            }
            chooseChar();
        });

    }
    clickFight();
    chooseChar();


});