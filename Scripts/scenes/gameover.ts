/*
#######################################################################################
The name of source file : gameover.ts
The information of author :  Giho Kim #300738697
Last Modified by: Giho Kim
Last Modified date: 29 Feb 2016
Program Description: This game is slotmachine developed by TypeScript, JavaScript,
HTML,CSS and JQeury. 
Revision History: 1.2
#######################################################################################
*/

// GAME_OVER SCENE
module scenes {
    export class GameOver extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _GameoverImage: createjs.Bitmap;
        private _startOverButton:objects.Button;
        
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    

            this._GameoverImage = new createjs.Bitmap(assets.getResult("Gameover"));
            this._GameoverImage.x = 70;
            this._GameoverImage.y = 30;
            this.addChild(this._GameoverImage);
    
                   
            // add the START button to the MENU scene
            this._startOverButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X -140,
                config.Screen.CENTER_Y + 200, true);
            this.addChild(this._startOverButton);
            
            // START Button event listener
            this._startOverButton.on("click", this._startOverButtonClick, this);
           
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startOverButtonClick(event: createjs.MouseEvent) {
            // Switch to the LEFT_CAVE Scene
            scene = config.Scene.SLOT_MACHINE;
            changeScene();
        }
        
    }
}