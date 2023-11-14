let knowledge = 0;
let mentalHealth = 100;
let time = 50;
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

const cert = [
    {
        name: "Intro to HelpDesk",
        power: 5
    },
    {
        name: "Comptia A+",
        power: 30
    },
    {
        name: "Network+",
        power: 50
    },
    {
        name: "CCNA",
        power: 100
    }
];

const monsters = [
    {
        name: "Password Reset",
        level: 2,
        mentalHealth: 16
    },
    {
        name: "Printer Issues",
        level: 10,
        mentalHealth: 1000
    },
    {
        name: "Steve",
        level: 40,
        health: 315
    }
];

const locations = [
    {
        name: "HelpDesk",
        "button text": ["Go to CBTnuggets", "Go to ServiceNow", "Fight Manager"],
        "button functions": [goCBT, goServiceNow, fightSteve],
        text: "You are in the HelpDesk, What shold you do next?"
    },
    {
        name: "CBTnuggets",
        "button text": ["Dont Study Today (10 Hours)", "Study the certifications (30 Hours)", "Go to HelpDesk"],
        "button functions": [gainMentalHealth, gainKnowledge, helpDesk],
        text: "You are at CBTnuggets, What do you want to do?"
    },
    {
        name: "ServiceNow",
        "button text": ["Password Reset", "Printer Issue", "Leave ServiceNow"],
        "button functions": [passwordReset, printerIssue, helpDesk],
        text: "Tickets are coming through, What will you take?"
    },
    {
        name: "fight",
        "button text": ["Click Fiercly", "Reboot", "Give Up"],
        "button function": [clickFiercly, reboot, helpDesk],
        text: "You are trouble shooting a issue"
    },
    {
        name: "Defeat Issue",
        "button text": ["Go to HelpDesk", "Go to Helpdesk", "Go to HelpDesk"],
        "button functions": [helpDesk, helpDesk, helpDesk],
        text: "The issue has been solved, the User thank's you. You gain knowledge and time to yourself."
    },
    {
        name: "Fail",
        "button text" : ["Replay", "Replay", "Replay"],
        "button functions": [restart, restart, restart],
        text: "The issue has stumped you. The user is angry and complains to Steve. Your Fired."
    }


]

// Initialize buttons
button1.onclick = goCBT;
button2.onclick = goServiceNow;
button3.onclick = fightSteve;

function update(location) {
    monsterStats.style.display = "none";
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
    update(locations[2])
}



function gainMentalHealth() {
    if (time >= 10) {
        time -= 10
        mentalHealth += 10
        timeText.innerText = time;
        mentalHealthText.innerText = mentalHealth;
    } else {
        text.innerText = "You cant afford to skip today.";
    }

}

function gainKnowledge() {

}

function gainCert() {
    if (currentSkills < skill.length - 1) {
        if (time >= 30) {
            time -= 30;
            currentSkills++;
            timeText.innerText = time;
            let newSkill = skill[currentSkills].name;
            text.innerText = "You have earned a" + newSkill + ".";
            inventory.push(newSkill);
            text.innerText += " In your inventory you have: " + inventory;
        }else {
            text.innerText = "You do not have enough time to learn a new Certification";
        } 
    }   else {
        text.innerText = "You already have the best certification!";
        button2.innerText = "Dont play Video Games to gain more time."
        button2.onclick = noVideoGames
    }
}

function noVideoGames() {
    if (inventory.length > 1) {
        time += 15;
        mentalHealth -= 10;
        text.innerText = "You were responsible... LAME!";
    } else {
        text.innerText = "Wow you chose the right path.";
    }

}

function passwordReset() {
    fighting =0;
    goFight();
}

function printerIssue() {
    fighting =1;
    goFight();
}

function fightSteve() {
    fighting =2;
    goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].mentalHealth;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

}

function clickFiercly() {
    text.innerText = "The " + monsters[fighting].name + " attacks. ";
    text.innerText += " You decide to Click Fiercly.";
    health -= monsters[figthing].level;
    monsterHealth -= skill[currentSkills].power + Math.floor(Math.random() * knowledge) + 1;;
    mentalHealthText.innerText = mentalHealth;
    monsterHealthText.innerText = monsterHealth;
    if (mentalHealth <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        defeatMonster();
    }

}

function reboot() {
    text.innerText = "You decide to reboot the computer to try to resolve the " +monsters[fighting].name + ".";
}

function defeatMonster() {
    time += Math.floor(monsters[fighting].level ^ 6.7)
    knowledge += monsters[fighting].level;
    timeText.innerText = time;
    knowledgeText.innerText = knowledge;
    update(locations[4])

}

function lose() {
    update(locations[5]);

}

function restart() {
    knowledge = 0;
    mentalHealth = 100;
    time = 50;
    currentSkills = 0;
    inventory = "Intro to HelpDesk"
    timeText.innerText = time;
    mentalHealthText.innerText = mentalHealth;
    knowledgeText.innerText = knowledge;
    helpDesk();    
}

