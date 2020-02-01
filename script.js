
let debug = true;
let optionsUlHTML = document.getElementById("options-ul");
let pMainContentHTML = document.getElementById("main-content");
let controlInputHTML = document.getElementById("user-choice");

console.log("troll time :)");//JUST FOR TOOTS AND GIGGLES
/*this class defines the properties of each individual option. Here we say what we want the option to say and then show if the user selected that option or not.*/
class IndividualOption {
    //here we build the constructor and then call two functions that belong to this class. Both functions get called every time a new instance of this class is instantiated.
    constructor(mainContent,scenePointer, sceneTitle) {
        this.mainContent = mainContent;
        this.scenePointer = scenePointer;
        this.scenePointerIndexID;
        this.sceneTitle = sceneTitle;
        this.addToOptionArray();//add this to the parent array which contains all options for the entire microstory.
        this.addOptionGroupToScene();//add the specific options that relate to a specific scene to their respective scenes.
    }
    printOption() {
        console.log(this.mainContent);//self explanatory.
    }
    //automatically add options to the options array
    addToOptionArray() {
        optionGroup.options.push(this);
    }
    addOptionGroupToScene() {
        this.sceneTitle.optionsInScene.push(this);
        this.scenePointerIndexID = this.sceneTitle.optionsInScene.indexOf(this);
    }
}
//an array that holds all of the options in them. 
//TODO: understand why this is an object and not just an independent array. I guess maybe in the future I could effect all of the options at once but then again idk why I'd ever do that.
let optionGroup = {
    options:[],
}

//TODO: implement a displaying of each option and Scene. 
class IndvidiaulScene {
    constructor(sceneTitleParent, sceneContent) {
        this.sceneTitleParent = sceneTitleParent;
        this.sceneContent = sceneContent;
        this.alreadySeenOnce = false;
        this.optionsInScene = [];
        this.optionElements = [];
    }

    //this shows the title of the Scene and then displays it's options
    displayScene() {
        
        while(optionsUlHTML.firstChild) {
            optionsUlHTML.removeChild(optionsUlHTML.firstChild);
        }
        pMainContentHTML.innerHTML = this.sceneContent;
        

        //if we don't check to see if we've seen the scene already, we will add it's options to the array more than once! 
        if(!this.alreadySeenOnce) {
            for(let i = 0; i < this.optionsInScene.length; i++) {
                this.optionElements.push(document.createElement("LI"));//push <li> elements to an array containing the html counterparts to all the options which are stored as objects.
                this.optionElements[i].innerHTML = this.optionsInScene[i].mainContent;
                optionsUlHTML.appendChild(this.optionElements[i]);
                    
            }
            this.alreadySeenOnce = true;//making sure that the loop up there⏫ only runs once so that we don't add the <li> html elements more than once.
        } else {
            for(let i = 0; i < this.optionsInScene.length; i++) {
                this.optionElements[i].innerHTML = this.optionsInScene[i].mainContent;
                optionsUlHTML.appendChild(this.optionElements[i]);      
            }
        }
        //debugging purposes
        console.log(this.optionElements);
    }
}


//TODO: Think about if htis is truly the way I want to build scenes and options. It might get tedius, but then again it would be any way you slice it 🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️
//MAKE SURE YOU INSTANTIATE SceneS BEFORE OPTIONS

//INSTANTIATE SCENES

let openerScene = new IndvidiaulScene("This is a fun game", "Try typing the reference # of the options into the text box to switch scenes");
let part2OpenerScene = new IndvidiaulScene("Crossroads", "wow now try again to go back to the main page");
let welcomeScene = new IndvidiaulScene("Welcome stupid", "Type a number that correlates to an option down below to get started")

//INSTANTIATE OPTIONS
//this could get annoying.

let openerSceneOption1 = new IndividualOption("pick me pick me",part2OpenerScene , openerScene);
let openerSceneOption2 = new IndividualOption("Shut it option 1, you suck. pick me instead",part2OpenerScene , openerScene);
let openerSceneOption3 = new IndividualOption("I've won a grammy so pick me.",part2OpenerScene, openerScene);
let openerSceneOption4 = new IndividualOption("I don't have to beg, destiny says you'll choose me",part2OpenerScene , openerScene);


let part2OpenerSceneOption1= new IndividualOption("wow im option #1, that must mean im the best", welcomeScene, part2OpenerScene);
let part2OpenerSceneOption2= new IndividualOption("picking me gives you a 0.0000001% greater chance of winning the lottery.", welcomeScene, part2OpenerScene);
let part2OpenerSceneOption3= new IndividualOption("If you choose me I'll send you some corny dad jokes.", welcomeScene, part2OpenerScene);
let part2OpenerSceneOption4 = new IndividualOption("Wow im the last option. That must mean I suck. Please don't pick me(reverse psychology)", welcomeScene, part2OpenerScene);

let welcomeSceneOption1 = new IndividualOption("Open our social media!", openerScene, welcomeScene);
let welcomeSceneOption2 = new IndividualOption("View source code on github!", openerScene, welcomeScene);
let welcomeSceneOption = new IndividualOption("<b>START GAME</b>", openerScene, welcomeScene);

let activeScene = welcomeScene;
activeScene.displayScene();

handleSceneChange = function(event) {
    //at a certain time run this:
    let enterIsPressed= event.keyCode;
    if (enterIsPressed == 13) {

    //through this switch statement you are able to add specific functionality to a single scene. This switch's property is whatever scene is the value for activeScene
        switch(activeScene) {
            case welcomeScene:
            //this if/else block checks the users input value. For some reason this is buggy as a switch statement.
                if(controlInputHTML.value == 1) {
                    window.open("https://instagram.com");
                    controlInputHTML.value  = "";
                }else if(controlInputHTML.value == 2) {
                    window.open("https://github.com/luketheduke112/AWalkThroughHistory");
                    controlInputHTML.value  = "";

                }else if(controlInputHTML.value == 3) {
                    activeScene = openerScene;
                    activeScene.displayScene();
                    controlInputHTML.value  = "";
                }

            break;

            default: 


        
                for(let i = 0; i < activeScene.optionsInScene.length; i++) {
                    if(controlInputHTML.value-1 === activeScene.optionsInScene[i].scenePointerIndexID) {
                        activeScene = activeScene.optionsInScene[controlInputHTML.value-1].scenePointer; 
                        controlInputHTML.value = "";
                        activeScene.displayScene();
                    }
                }
            break;
            
        }

    }
}

//debug crap *IGNORE*
if(debug == false) {
    console.log("The options inside of option group are: "); 
    console.log(optionGroup.options);
    console.log("The length of option group is: "+optionGroup.options.length.toString());
    console.log("First Scene contains: ");
    console.log(openerScene.optionsInScene);
    console.log("Second Scene contains: ");
    console.log(part2OpenerScene.optionsInScene);
} else {
    console.log("In script.js change debug to 'true' if you want to see the dev info.")
}
