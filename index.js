let knowledge = 0;
let mentalHealth = 100;
let time = 50;
let currentCert = 0;
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
const monsterHealthText = document.querySelector("#monsterHealth");

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
        level: 0,
        monsterHealth: 16
    },
    {
        name: "Printer Issues",
        level: 1,
        monsterHealth: 150
    },
    {
        name: "Steve",
        level: 2,
        monsterHealth: 315
    }
];

const locations = [
    {
        name: "HelpDesk",
        "button text": ["Go to CBTnuggets", "Go to ServiceNow", "Fight Steve"],
        "button functions": [goCBT, goServiceNow, fightSteve],
        text: "You are in the HelpDesk, What shold you do next?"
    },
    {
        name: "CBTnuggets",
        "button text": ["Dont Study Today (10 Hours)", "Study the certifications (30 Hours)", "Go to HelpDesk"],
        "button functions": [gainMentalHealth, gainCert, helpDesk],
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
        "button functions": [clickFiercly, reboot, helpDesk],
        text: "You are trouble shooting a issue"
    },
    {
        name: "Defeat Issue",
        "button text": ["Go to HelpDesk", "Go to Helpdesk", "Go to HelpDesk"],
        "button functions": [helpDesk, helpDesk, easterEgg],
        text: "The issue has been solved, the User thank's you. You gain knowledge and time to yourself."
    },
    {
        name: "Fail",
        "button text": ["Replay", "Replay", "Replay"],
        "button functions": [restart, restart, restart],
        text: "The issue has stumped you. The user is angry and complains to Steve. Your Fired."
    },
    {
        name: "Win",
        "button text": ["Replay", "Replay", "Replay"],
        "button functions": [restart, restart, restart],
        text: "You have beat the issue. You escape the grasps of Steve."
    },
    {
        name: "easter egg",
        "button text": ["2", "7", "Go to HelpDesk"],
        "button functions": [pickTwo, pickSeven, helpDesk],
        text: "You find a weird keyboard with the number pad glowing and a stickey note saying pick one. Will you push a key or will you go back to your desk? I wonder what would happen if you pushed one..."
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
        time -= 10;
        mentalHealth += 10;
        timeText.innerText = time;
        mentalHealthText.innerText = mentalHealth;
    } else {
        text.innerText = "You cant afford to skip today.";
    }

}

function gainCert() {
    if (currentCert < cert.length - 1) {
        if (time >= 30) {
            time -= 30;
            currentCert++;
            timeText.innerText = time;
            let newCert = cert[currentCert].name;
            text.innerText = "You now have the " + newCert + ". ";
            inventory.push(newCert);
            text.innerText += " You have learned: " + inventory;
        } else {
            text.innerText = "You do not have enough time to study.";
        }
    } else {
        text.innerText = "you already achived all the certs!";
        button2.innerText = "Study tonight and skip Video Games?";
        button2.onClick = noVideoGames;
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
    fighting = 0;
    goFight();
}

function printerIssue() {
    fighting = 1;
    goFight();
}

function fightSteve() {
    fighting = 2;
    goFight();

}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].monsterHealth;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

}

function clickFiercly() {
    text.innerText = monsters[fighting].name + " attacks, you decide to Click Fiercly to confuse the " + monsters[fighting].name + ".";

}

function reboot() {
    text.innerText = monsters[fighting].name + " attacks. ";
    text.innerText = "You decide to use your " + cert[currentCert].name + ".";
    mentalHealth -= monsters[fighting].level;
    monsterHealth -= cert[currentCert].power + Math.floor(Math.random() * knowledge) + 1;;
    mentalHealthText.innerText = mentalHealth;
    monsterHealthText.innerText = monsterHealth;
    if (mentalHealth <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if (Math.random() <= .1 && inventory.lenght !== 1) {
        text.innerText += " Your " + inventory.pop() + " expired.";
        currentCert--;
    }

    if (isMonsterHit()) {
        console.log(fighting)
        mentalHealth -= getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText += " You fail the reboot."
    }
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * knowledge))
    return hit
};

function isMonsterHit() {
    return Math.random() > .2 || monsterHealth < 20
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

function winGame() {
    update(locations[6]);
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

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
}

function pickSeven() {
    pick(7);
}

function pick(guess) {
    let numbers = []
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11))
    }

    text.innerText = "You picked " + guess + ".  Here are the keys:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Weird, nothing seemed to happen... `Or so you thought, all of a sudden a rush of releif hits you. Gain 100 hours`";
        time += 100;
        timeText.innerText = time;
    } else {
        text.innerText += "Hmmm something feel's off, You then hear a scream from Steve's office. `You lose 25 mental health points`";
        mentalHealth -= 25;
        mentalHealthText.innerText = mentalHealth;
        if (mentalHealth <= 0) {
            lose();
        }
    }

}
