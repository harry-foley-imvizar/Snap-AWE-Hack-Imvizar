// @input SceneObject sequencerObject {"label": "Sequencer Object"}

var hasStarted = false;

function onTouchStart() {
    if (!global.sequencer) {
        print("Sequencer not found");
        return;
    }
    
    if (!hasStarted) {
        // First click - start the timer
        global.sequencer.api.startTimer();
        hasStarted = true;
        print("Started sequencer!");
    } else {
        // Subsequent clicks - toggle pause/resume
        if (global.sequencer.api.isTimerPaused()) {
            global.sequencer.api.resumeTimer();
            print("Resumed sequencer!");
        } else if (global.sequencer.api.isTimerRunning()) {
            global.sequencer.api.pauseTimer();
            print("Paused sequencer!");
        } else {
            // Timer has finished, restart it
            global.sequencer.api.startTimer();
            print("Restarted sequencer!");
        }
    }
}

var touchEvent = script.createEvent("TouchStartEvent");
touchEvent.bind(onTouchStart);