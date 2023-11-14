let knowledge = 0;
let mentalHealth = 100;
let hours = 50;
let currentSkills = 0;
let fighting;
let monsterHealth;
let inventory = ["Intro to HelpDesk"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const knowledgeText = document.querySelector("#knowledgeText");
const mentalHealthText = document.querySelector("#mentalHealthText");
const timeText = document.querySelector("#timeText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("monsterHealth");

const locations = [
    {
        name: "HelpDesk",
        "button text": ["Go to CBTnuggets", "Go to ServiceNow", "Fight Manager"],
        "button functions": [goCBT, goServiceNow, fightManager],
        text: "You are in the HelpDesk, What shold you do next?"
    }, 
    {
        name: "CBTnuggets",
        "button text": ["Dont Study Today (10 Hours)", "Study the A+ (30 Hours)", "Go to HelpDesk"],
        "button functions": [gainMentalHealth, gainKnowledge, helpDesk],
        text: "You are at CBTnuggets, What do you want to do?"
    }
]

// Initialize buttons
button1.onclick = goCBT;
button2.onclick = goServiceNow;
button3.onclick = fightManager;

function update(location) {
    button1.innerText = location["button text"][0]
    button2.innerText = location["button text"][1]
    button3.innerText = location["button text"][2]
    button1.onclick = location["button functions"][0]
    button2.onclick = location["button functions"][1]
    button3.onclick = location["button functions"][2]
    text.innerText = location.text

}

function helpDesk() {
    update(locations[0])
}

function goCBT() {
    update(locations[1])
}

function goServiceNow() {
    console.log("Going to ServiceNow.")
}

function fightManager() {
    console.log("Fighting Manager.")
}

function gainMentalHealth() {

}

function gainKnowledge() {

}


