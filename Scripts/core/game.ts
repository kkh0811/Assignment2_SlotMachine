/*
#######################################################################################
The name of source file : Game.ts
The information of author :  Giho Kim #300738697
Last Modified by: Giho Kim
Last Modified date: 29 Feb 2016
Program Description: This game is slotmachine developed by TypeScript, JavaScript,
HTML,CSS and JQeury. 
Revision History: 1.2
#######################################################################################
*/
/// <reference path = "_reference.ts" />

// global variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;

var currentScene: objects.Scene;
var scene: number;

// Game Scenes
var menu: scenes.Menu;
var slotMachine: scenes.SlotMachine;
var gameOver: scenes.GameOver;


var assetData: objects.Asset[] = [
    {id: "Logo", src: "../../Assets/images/Logo.png"},
    {id: "Gameover", src: "../../Assets/images/Gameover.png"},
    {id: "BackButton", src:"../../Assets/images/BackButton.png"},
    {id: "Nextbutton", src:"../../Assets/images/Nextbutton.png"},
    {id: "StartButton", src:"../../Assets/images/StartButton.png"},
    {id: "StartOverButton", src:"../../Assets/images/StartOverButton.png"},
    {id: "SlotMachine", src:"../../Assets/images/slot-machine.png"},
    {id: "Bet1Button", src:"../../Assets/images/Betone.png"},
    {id: "Bet10Button", src:"../../Assets/images/Betten.png"},
    {id: "Bet100Button", src:"../../Assets/images/Betmax.png"},
    {id: "SpinButton", src: "../../Assets/images/Spin.png" },
    {id: "DisSpinButton", src: "../../Assets/images/DisSpin.png" },
    {id: "ResetButton", src: "../../Assets/images/Reset.png" },
    {id: "ExitButton", src: "../../Assets/images/exit.png" },
    {id: "BlackBackground", src:"../../Assets/images/BlackBackground.png"},
    {id: "WhiteBackground", src:"../../Assets/images/WhiteBackground.png"},
    {id: "Blank", src:"../../Assets/images/Blank.png"},
    {id: "Grapes", src:"../../Assets/images/Grapes.png"},
    {id: "Banana", src:"../../Assets/images/Banana.png"},
    {id: "Cherry", src:"../../Assets/images/Cherry.png"},
    {id: "Orange", src:"../../Assets/images/Orange.png"},
    {id: "Bar", src:"../../Assets/images/Bar.png"},
    {id: "Bell", src:"../../Assets/images/Bell.png"},
    {id: "Seven", src: "../../Assets/images/Seven.png"},

    {id: "betSound", src: "../../Assets/sound/bet.wav"},
    {id: "restSound", src: "../../Assets/sound/coin.mp3"},
    {id: "beginSound", src: "../../Assets/sound/begin.mp3"},
    {id: "jacpotSound", src: "../../Assets/sound/jackpot.mp3"},
    {id: "WinSound", src: "../../Assets/sound/win.wav"},
    {id: "spindSound", src: "../../Assets/sound/spin.wav"}
];

function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}

function init(): void {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    
    // create our main display list container
    stage = new createjs.Stage(canvas);
    
    // Enable mouse events
    stage.enableMouseOver(20);
    
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    
    // sets up our stats counting workflow
    setupStats(); 
    
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}

// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event: createjs.Event): void {
    // start collecting stats for this frame
    stats.begin(); 
    
    // calling State's update method
    currentScene.update(); 
    
    // redraw/refresh stage every frame
    stage.update();
    
    // stop collecting stats for this frame
    stats.end();
}

// Setup Game Stats
function setupStats(): void {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}

// Finite State Machine used to change Scenes
function changeScene(): void {
    
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the PLAY scene
            stage.removeAllChildren();
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the game OVER scene
            stage.removeAllChildren();
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    
    console.log(currentScene.numChildren);
}

window.onload = preload;