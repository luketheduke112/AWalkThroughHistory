
let debug = true;
let optionsUlHTML = document.getElementById("options-ul");
let pMainContentHTML = document.getElementById("main-content");
let controlInputHTML = document.getElementById("user-choice");

console.log("troll time :)");//JUST FOR TOOTS AND GIGGLES
/*this class defines the properties of each individual option. Here we say what we want the option to say and then show if the user selected that option or not.*/
class IndividualOption {
    //here we build the constructor and then call two functions that belong to this class. Both functions get called every time a new instance of this class is instantiated.
    constructor(mainContent,scenarioPointer, scenarioTitle) {
        this.mainContent = mainContent;
        this.scenarioPointer = scenarioPointer;
        this.scenarioPointerIndexID;
        this.scenarioTitle = scenarioTitle;
        this.addToOptionArray();//add this to the parent array which contains all options for the entire microstory.
        this.addOptionGroupToScenario();//add the specific options that relate to a specific scene to their respective scenes.
    }
    printOption() {
        console.log(this.mainContent);//self explanatory.
    }
    //automatically add options to the options array
    addToOptionArray() {
        optionGroup.options.push(this);
    }
    addOptionGroupToScenario() {
        this.scenarioTitle.optionsInScenario.push(this);
        this.scenarioPointerIndexID = this.scenarioTitle.optionsInScenario.indexOf(this);
    }
}
//an array that holds all of the options in them. 
//TODO: understand why this is an object and not just an independent array. I guess maybe in the future I could effect all of the options at once but then again idk why I'd ever do that.
let optionGroup = {
    options:[],
}

//TODO: implement a displaying of each option and scenario. 
class IndvidiaulScenario {
    constructor(scenarioTitleParent, scenarioContent) {
        this.scenarioTitleParent = scenarioTitleParent;
        this.scenarioContent = scenarioContent;
        this.alreadySeenOnce = false;
        this.optionsInScenario = [];
        this.optionElements = [];
    }

    //this shows the title of the scenario and then displays it's options
    displayScenario() {
        
        while(optionsUlHTML.firstChild) {
            optionsUlHTML.removeChild(optionsUlHTML.firstChild);
        }
        console.log(this.scenarioTitleParent);
        console.log(this.scenarioContent);
        pMainContentHTML.innerHTML = this.scenarioContent;
        

        //if we don't check to see if we've seen the scene already, we will add it's options to the array more than once! 
        if(!this.alreadySeenOnce) {
            for(let i = 0; i < this.optionsInScenario.length; i++) {
                this.optionElements.push(document.createElement("LI"));//push <li> elements to an array containing the html counterparts to all the options which are stored as objects.
                this.optionElements[i].innerHTML = this.optionsInScenario[i].mainContent;
                optionsUlHTML.appendChild(this.optionElements[i]);
                    
            }
            this.alreadySeenOnce = true;//making sure that the loop up there⏫ only runs once so that we don't add the <li> html elements more than once.
        } else {
            for(let i = 0; i < this.optionsInScenario.length; i++) {
                this.optionElements[i].innerHTML = this.optionsInScenario[i].mainContent;
                optionsUlHTML.appendChild(this.optionElements[i]);      
            }
        }
        //debugging purposes
        console.log(this.optionElements);
    }
}


//TODO: Think about if htis is truly the way I want to build scenes and options. It might get tedius, but then again it would be any way you slice it 🤷‍♀️🤷‍♀️🤷‍♀️🤷‍♀️
//MAKE SURE YOU INSTANTIATE SCENARIOS BEFORE OPTIONS

//INSTANTIATE SCENES

let openerScene = new IndvidiaulScenario("This is a fun game", "Try typing the reference # of the options into the text box to switch scenes");
let part2OpenerScene = new IndvidiaulScenario("Crossroads", "wow now try again to go back to the main page");
let welcomeScene = new IndvidiaulScenario("Welcome stupid", "This is an open-source online javacript game. <br><br> Coded by: <b>Luke Fisher</b> <br> Written by: <b> David Weinstein</b> ft. <b>Luke Fisher</b>  <br><br> First of all, here are some instructions: The game consists of you choosing your own <b>GLORIOUS</b> adventure by selecting different options (displayed below) when given a scenario. Use the option reference numbers on the left side of each option and type that number into the text-box below to select an option. Pretty simple from there! <br><br> <b>HAVE FUN!</b>")

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

let welcomeSceneOption1 = new IndividualOption("This option is very good for those looking for: a meaningful life", openerScene, welcomeScene);
let welcomeSceneOption2 = new IndividualOption("This option is very good for those looking for: the bathroom", openerScene, welcomeScene);
let welcomeSceneOption = new IndividualOption("This option is very good for those looking for: their mom", openerScene, welcomeScene);

let activeScenario = welcomeScene;
activeScenario.displayScenario();

handleSceneChange = function(event) {
    //at a certain time run this:
    let enterIsPressed= event.keyCode;
    if (enterIsPressed == 13) {
        console.log("enter was pressed");//making sure that the enter key is registered
        console.log(controlInputHTML.value.toString());//taking the user input value
        console.log(activeScenario.optionsInScenario.length);
        
        for(let i = 0; i < activeScenario.optionsInScenario.length; i++) {
            if(controlInputHTML.value-1 === activeScenario.optionsInScenario[i].scenarioPointerIndexID) {
                console.log("there was a match");
                activeScenario = activeScenario.optionsInScenario[controlInputHTML.value-1].scenarioPointer; 
                console.log(activeScenario);    
                controlInputHTML.value = "";
                activeScenario.displayScenario();
            }
        }

    }
}
























//debug crap *IGNORE*
if(debug == false) {
    console.log("The options inside of option group are: "); 
    console.log(optionGroup.options);
    console.log("The length of option group is: "+optionGroup.options.length.toString());
    console.log("First scenario contains: ");
    console.log(openerScene.optionsInScenario);
    console.log("Second scenario contains: ");
    console.log(part2OpenerScene.optionsInScenario);
} else {
    console.log("In script.js change debug to 'true' if you want to see the dev info.")
}
