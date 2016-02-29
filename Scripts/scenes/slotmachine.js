/*
#######################################################################################
The name of source file : slotmachine.ts
The information of author :  Giho Kim #300738697
Last Modified by: Giho Kim
Last Modified date: 29 Feb 2016
Program Description: This game is slotmachine developed by TypeScript, JavaScript,
HTML,CSS and JQeury.
Revision History: 1.2
#######################################################################################
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this.fruits = "";
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            //Add music
            createjs.Sound.play("beginSound");
            // Reset the Game to initial values 
            this._resetAll();
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 40, 505, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);
            // add Bet10Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 130, 505, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this);
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 220, 505, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 310, 505, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            // add ResetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 400, 505, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            // add ExitButton to the scene
            this._exitButton = new objects.Button("ExitButton", 400, 440, false);
            this.addChild(this._exitButton);
            this._exitButton.on("click", this._exitButtonClick, this);
            // add JackPot Text to the scene
            this._jackpotText = new objects.Label(this.jackpot.toString(), "16px Consolas", "#ff0000", 258, 113, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
            // add Credits Text to the scene
            this._creditsText = new objects.Label(this.playerMoney.toString(), "16px Consolas", "#ff0000", 115, 464, false);
            this._creditsText.textAlign = "right";
            this.addChild(this._creditsText);
            // add Bet Text to the scene
            this._betText = new objects.Label(this.playerBet.toString(), "16px Consolas", "#ff0000", 225, 464, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            // add Result Text to the scene
            this._resultText = new objects.Label(this.winnings.toString(), "16px Consolas", "#ff0000", 338, 464, false);
            this._resultText.textAlign = "right";
            this.addChild(this._resultText);
            // Initialize Array of Bitmaps 
            this._initializeBitmapArray();
            // Setup Background
            this._setupBackground("WhiteBackground");
            // FadeIn
            this._fadeIn(500);
            // add this scene to the global stage container
            stage.addChild(this);
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        // The function to reset all data.
        SlotMachine.prototype._resetAll = function () {
            this.playerMoney = 1000;
            this.winnings = 0;
            this.jackpot = 5000;
            this.playerBet = 0;
            this.turn = 0;
            this.winNumber = 0;
            this.lossNumber = 0;
            this.winRatio = 0;
        };
        /* Check to see if the player won the jackpot */
        SlotMachine.prototype.checkJackPot = function () {
            /* compare two random values */
            var jackPotTry = Math.floor(Math.random() * 51 + 1);
            var jackPotWin = Math.floor(Math.random() * 51 + 1);
            if (jackPotTry == jackPotWin) {
                createjs.Sound.play("jackpotSound");
                alert("You Won the $" + this.jackpot + " Jackpot!!");
                this.playerMoney += this.jackpot;
                this.jackpot = 1000;
            }
        };
        /* Utility function to show a win message and increase player money */
        SlotMachine.prototype.showWinMessage = function () {
            this.playerMoney += this.winnings;
            alert("You won $" + this.winnings);
            this._resetFruitTally();
            this.checkJackPot();
        };
        /* Utility function to show a loss message and reduce player money */
        SlotMachine.prototype.showLossMessage = function () {
            this.playerMoney -= this.playerBet;
            alert("You lost $" + (this.winnings * -1) + "bets");
            this._resetFruitTally();
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._spinReels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };
        /* This function calculates the player's winnings, if any */
        SlotMachine.prototype._determineWinnings = function () {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this._bananas == 3) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this._oranges == 3) {
                    this.winnings = this.playerBet * 30;
                }
                else if (this._cherries == 3) {
                    this.winnings = this.playerBet * 40;
                }
                else if (this._bars == 3) {
                    this.winnings = this.playerBet * 50;
                }
                else if (this._bells == 3) {
                    this.winnings = this.playerBet * 75;
                }
                else if (this._sevens == 3) {
                    this.winnings = this.playerBet * 100;
                }
                else if (this._grapes == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this._bananas == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this._oranges == 2) {
                    this.winnings = this.playerBet * 3;
                }
                else if (this._cherries == 2) {
                    this.winnings = this.playerBet * 4;
                }
                else if (this._bars == 2) {
                    this.winnings = this.playerBet * 5;
                }
                else if (this._bells == 2) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this._sevens == 2) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this._sevens == 1) {
                    this.winnings = this.playerBet * 5;
                }
                else {
                    this.winnings = this.playerBet * 1;
                }
            }
            else {
            }
            // To display 3 labels on the screen 
            this._resultText.text = this.winnings.toString();
            this.playerMoney += this.winnings;
            this._creditsText.text = this.playerMoney.toString();
            this._resetFruitTally();
        };
        /* Utility function to show Player Stats */
        SlotMachine.prototype.showPlayerStats = function () {
            this.winRatio = this.winNumber / this.turn;
            $("#jackpot").text("Jackpot: " + this.jackpot);
            $("#playerMoney").text("Player Money: " + this.playerMoney);
            $("#playerTurn").text("Turn: " + this.turn);
            $("#playerWins").text("Wins: " + this.winNumber);
            $("#playerLosses").text("Losses: " + this.lossNumber);
            $("#playerWinRatio").text("Win Ratio: " + (this.winRatio * 100).toFixed(2) + "%");
        };
        SlotMachine.prototype._resetFruitTally = function () {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        };
        // To show blank as default on the screen.
        SlotMachine.prototype._initializeBitmapArray = function () {
            this._reels = new Array();
            for (var reel = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Blank"));
                this._reels[reel].x = 100 + (reel * 114);
                this._reels[reel].y = 280;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }
        };
        SlotMachine.prototype._placeBet = function (playerBet) {
            // ensure player's bet is less than or equal to players money
            if (playerBet <= this.playerMoney) {
                this.playerBet += playerBet;
                this.playerMoney -= playerBet;
                this._creditsText.text = this.playerMoney.toString();
                this._betText.text = this.playerBet.toString();
            }
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            createjs.Sound.play("betSound");
            console.log("Bet 1 Credit");
            this._placeBet(1);
        };
        SlotMachine.prototype._bet10ButtonClick = function (event) {
            createjs.Sound.play("betSound");
            console.log("Bet 10 Credit");
            this._placeBet(10);
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            createjs.Sound.play("betSound");
            console.log("Bet 100 Credit");
            this._placeBet(100);
        };
        // SpinButton Event handler 
        SlotMachine.prototype._spinButtonClick = function (event) {
            if (this.playerMoney > 0) {
                if (this.playerBet == 0) {
                    alert("Add bets to play the game!");
                }
                else if (this.playerBet > this.playerMoney) {
                    this.removeChild(this._spinButton);
                    this._spinButton = new objects.Button("DisSpinButton", 310, 505, false);
                    this.addChild(this._spinButton);
                    alert("You don't have money, Go home !");
                }
                else if (this.playerBet <= this.playerMoney) {
                    createjs.Sound.play("spindSound");
                    var bitmap = this._spinReels();
                    for (var reel = 0; reel < 3; reel++) {
                        this._reels[reel].image = assets.getResult(bitmap[reel]);
                    }
                    this._determineWinnings(); // to check win and lose probability
                    // reset player's bet to zero
                    this.playerBet = 0;
                    this._betText.text = this.playerBet.toString();
                }
            }
            else if (this.playerMoney == 0) {
                if (confirm("Do you wannt to play again?!")) {
                    console.log("Play Again");
                    createjs.Sound.play("resetSound");
                    scene = config.Scene.SLOT_MACHINE;
                    changeScene();
                }
                else {
                    console.log("Empty");
                }
            }
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            createjs.Sound.play("resetSound");
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
            console.log("Rest Game");
        };
        SlotMachine.prototype._exitButtonClick = function (event) {
            scene = config.Scene.GAME_OVER;
            changeScene();
            console.log("Game Over");
            /*
            window.open('', '_self', '');
            window.close();
            console.log("Game_Over");
            */
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map