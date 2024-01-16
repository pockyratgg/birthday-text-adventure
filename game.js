const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeID = option.nextText
    if (nextTextNodeID <= 0) { /*wasn't working previously, had nextTedtModeID >= instead of <=*/
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeID)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up and look at the time. Its your sister's birthday today and you're running late. " ,
        options: [
            {
                text: 'Grab the present',
                setState: { sisterPresent: true},
                nextText: 2
            },
            {
                text: 'Leave the present',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "You're running through the town when you come across a merchant.",
        options: [
            {
                text: 'Trade the present for a sword',
                /*if we have the present, this option will show up, if not, the option won't show up*/
                requiredState: (currentState) => currentState.sisterPresent,
                setState: { sisterPresent: false, sword: true},
                nextText: 3
            },
            {
                text: 'Trade the present for a shield',
                requiredState: (currentState) => currentState.sisterPresent,
                setState: { sisterPresent: false, shield: true},
                nextText: 3
            },
            {
                text: 'Ignore the merchant',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'After leaving the merchant, you start to feel tired and stumble through the start of the long path through the woods',
        options: [
            {
                text: 'Explore the woods',
                nextText: 4
            },
            {
                text: 'You see a small cottage where it looks like nobody is home. Take a nap in the cottage?',
                nextText: 5
            },
            {
                text: 'Find a spot behind a tree out of view to take a nap at before continuing',
                nextText: 6
            }
        ]
    },
    {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the woods and are killed by some terrible monster in your sleep.',
        options: [
            {
                text: 'Restart',
                nextText: -1 /*-1 signals we want to restart the game*/
            }
        ]
    },
    {
        id: 5,
        text: "You find a big comfortable bed in the cottage and are asleep for about 20 minutes before a tall scary witch enters the cottage. She turns you into a toad and you live out the rest of your days as the witch's least favorite pet.",
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'You wake up well rested and full of energy ready to trek through the woods to see your sister.',
        options: [
            {
                text: 'Head through the woods',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'While going through the woods, you come across a horrible monster in your path.',
        options: [
            {
                text: 'Try to run',
                nextText: 8
            },
            {
                text: 'Attack it with the sword',
                requiredState: (currentState) => currentState.sword,
                nextText: 9
            },
            {
                text: 'Hide behind the shield',
                requiredState: (currentState) => currentState.shield,
                nextText: 10
            },
            {
                text: 'Start screaming',
                requiredState: (currentState) => currentState.sisterPresent,
                nextText: 11
            }
        ]
    },
    {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'Your high pitched screams were not in vain and your sister happened to be nearby. She hears you screaming and takes out a sword and slices the monster"s head off. She asks if the present is for her and gives you a sly smile. You hand her the present and its chocolate covered cherries, her favorite. She gives you a big hug and thanks you. ',
        options: [
            {
                text: 'Congratulations. Play Again.',
                nextText: -1
            }
        ]
    }
]

startGame()