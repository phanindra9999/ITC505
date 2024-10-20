const storyData = {
    1: {
        text: "The time machine is malfunctioning. What do you do?",
        choices: [
            { text: "Try to stop the machine", consequence: 2, image: "images/crossroads.jpg" },
            { text: "Jump into the machine", consequence: 3, image: "images/crossroads.jpg" }
        ]
    },
    2: {
        text: "You try to stop the machine, but it gets worse. What now?",
        choices: [
            { text: "Repair the machine", consequence: "ending1", image: "images/cave.jpg" },
            { text: "Run away", consequence: "ending2", image: "images/fall.jpg" }
        ]
    },
    3: {
        text: "You've jumped into a new world. What will you do?",
        choices: [
            { text: "Explore the forest", consequence: 4, image: "images/forestexplore.jpg" },
            { text: "Enter the cave", consequence: 5, image: "images/cave.jpg" }
        ]
    },
    4: {
        text: "You find a glowing path. What will you do?",
        choices: [
            { text: "Follow the path", consequence: "ending3", image: "images/glowing-path.jpg" },
            { text: "Ignore it", consequence: "ending4", image: "images/fall.jpg" }
        ]
    },
    5: {
        text: "You encounter a dragon. What will you do?",
        choices: [
            { text: "Fight the dragon", consequence: "ending5", image: "images/dragon.jpg" },
            { text: "Offer a potion", consequence: 6, image: "images/potion.jpg" }
        ]
    },
    6: {
        text: "The dragon reacts to the potion. What happens next?",
        choices: [
            { text: "The dragon helps you", consequence: "ending6", image: "images/victory.jpg" },
            { text: "The dragon gets angry", consequence: "ending7", image: "images/defeat.jpg" }
        ]
    }
};

const endings = {
    "ending1": "You successfully repair the machine and save the world!",
    "ending2": "You run away, but the machine explodes. Disaster!",
    "ending3": "You follow the path and find a portal back home.",
    "ending4": "You get lost forever in the woods.",
    "ending5": "The dragon defeats you in battle.",
    "ending6": "The dragon helps you return to your time, victorious!",
    "ending7": "The dragon burns everything. You are defeated."
};


// Home Page Buttons
document.getElementById('startButton').addEventListener('click', function () {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('gamePage').classList.remove('hidden');
});

document.getElementById('addendumButton').addEventListener('click', function () {
    document.getElementById('homePage').classList.add('hidden');
    document.getElementById('addendumPage').classList.remove('hidden');
});

document.getElementById('backButton').addEventListener('click', function () {
    document.getElementById('addendumPage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
});

// Restart Game Functionality
document.getElementById('restartButton').addEventListener('click', function () {
    location.reload();
    document.getElementById('gamePage').classList.add('hidden');
    document.getElementById('homePage').classList.remove('hidden');
    chooseOption(1); // Restart from the beginning
});

// Story logic
function chooseOption(choiceId) {
    const story = storyData[choiceId];
    if (story) {
        document.getElementById('storyText').innerText = story.text;
        document.getElementById('sceneImage').src = story.choices[0].image;
        document.getElementById('choice1').innerText = story.choices[0].text;
        document.getElementById('choice2').innerText = story.choices[1].text;

        document.getElementById('choice1').onclick = () => handleConsequence(story.choices[0].consequence);
        document.getElementById('choice2').onclick = () => handleConsequence(story.choices[1].consequence);
    }
}

function handleConsequence(consequence) {
    if (typeof consequence === "string") {
        endGame(consequence);
    } else if (typeof consequence === "number") {
        chooseOption(consequence);
    }
}

function endGame(endingId) {
    document.getElementById('storyText').innerText = endings[endingId];
    document.getElementById('choices').innerHTML = ''; // Clear choice buttons
    document.getElementById('sceneImage').src = `images/${endingId}.jpg`; // Display ending image
}

// Start the game at the first choice
chooseOption(1);
