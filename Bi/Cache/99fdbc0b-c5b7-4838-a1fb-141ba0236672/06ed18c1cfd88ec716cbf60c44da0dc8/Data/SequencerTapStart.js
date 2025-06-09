// @input SceneObject sequencerObject {"label": "Sequencer Object"}

var isPlaying = false;

function onTouchStart() {
    if (global.sequencer) {
        if (isPlaying) {
            global.sequencer.api.pauseTimer();
            print("Paused sequencer!");
        } else {
            global.sequencer.api.startTimer();
            print("Started sequencer!");
        }
        isPlaying = !isPlaying;
    } else {
        print("Sequencer not found");
    }
}

var touchEvent = script.createEvent("TouchStartEvent");
touchEvent.bind(onTouchStart);