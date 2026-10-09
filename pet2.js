const prompt = require('prompt-sync')({ sigint: true });

const myPet = {
    petName: "Buddy",
    petHappiness: 50,
    petHunger: 50,
    isAwake: true
};

function feedPet(petObj) {
    petObj.petHunger -= 10;
    petObj.petHappiness += 5;
    // Cap minimum hunger at 0
    if (petObj.petHunger < 0) petObj.petHunger = 0; 
    console.log(`\n🍖 ${petObj.petName} is eating! Hunger down, happiness up!`);
}

function playPet(petObj) {
    petObj.petHappiness += 10;
    petObj.petHunger += 5;
    console.log(`\n🥎 You played with ${petObj.petName}. They look happy!`);
}

function goToSleep(petObj) {
    petObj.isAwake = !petObj.isAwake;
    if (petObj.isAwake) {
        console.log(`\n⏰ ${petObj.petName} woke up!`);
    } else {
        console.log(`\n💤 ${petObj.petName} fell fast asleep.`);
    }
}

let randomValue = () => {
    return Math.floor(Math.random() * 100) + 1;
};

// --- NEW GAME LOOP START ---
let keepPlaying = true;

do {
    console.log(`\n========================================`);
    console.log(`🐾 PET STATUS: ${myPet.petName}`);
    console.log(`Status: ${myPet.isAwake ? "Awake" : "Sleeping"}`);
    console.log(`Hunger: ${myPet.petHunger}/100 | Happiness: ${myPet.petHappiness}/100`);
    console.log(`========================================`);

    // Game Over Condition Check
    if (myPet.petHunger >= 100 || myPet.petHappiness <= 0) {
        console.log(`❌ Game over! You didn't take good enough care of ${myPet.petName}.`);
        break; 
    }

    // --- RANDOM EVENT SYSTEM ---
    // Generates a number 1-100 and compares it to trigger events
    let eventChance = randomValue();

    if (eventChance <= 25) { 
        // 25% chance to suddenly get hungry
        myPet.petHunger += 15;
        console.log(` Random Event: ${myPet.petName}'s tummy rumbled. Hunger increased!`);
    } else if (eventChance > 25 && eventChance <= 50) { 
        // 25% chance to get bored
        myPet.petHappiness -= 15;
        console.log(` Random Event: ${myPet.petName} looks a bit bored. Happiness decreased!`);
    }

    // --- MENU ACTIONS ---
    console.log(`\nWhat do you want to do?`);
    console.log(`1. Feed ${myPet.petName}`);
    console.log(`2. Play with ${myPet.petName}`);
    console.log(`3. Put to Sleep / Wake Up`);
    console.log(`4. Quit Game`);

    let choice = prompt(`Enter choice (1-4): `);

    if (choice === '1') {
        if (!myPet.isAwake) {
            console.log(`❌ You can't feed a sleeping pet!`);
        } else {
            feedPet(myPet);
        }
    } else if (choice === '2') {
        if (!myPet.isAwake) {
            console.log(`❌ You can't play with a sleeping pet!`);
        } else {
            playPet(myPet);
        }
    } else if (choice === '3') {
        goToSleep(myPet);
    } else if (choice === '4') {
        console.log(`Thanks for playing with ${myPet.petName}! Goodbye.`);
        keepPlaying = false;
    } else {
        console.log(` Invalid choice. Please pick a number from 1 to 4.`);
    }

} while (keepPlaying);
