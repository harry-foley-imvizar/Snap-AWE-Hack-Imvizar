// @input SceneObject sequencerObject {"label": "Sequencer Object"}

function onTouchStart() {
    if (global.sequencer) {
        global.sequencer.api.startTimer();
        print("Started sequencer!");
    } else {
        print("Sequencer not found");
    }
}

var touchEvent = script.createEvent("TouchStartEvent");
touchEvent.bind(onTouchStart);