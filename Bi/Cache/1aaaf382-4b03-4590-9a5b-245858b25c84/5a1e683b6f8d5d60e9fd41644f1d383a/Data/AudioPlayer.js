// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AudioComponent audioComponent {"label": "Audio Component"}

function onTrigger() {
    if (!script.audioComponent) return;
    
    script.audioComponent.play(1);
    print("AudioComponent: Playing audio");
}

function onPaused() {
    if (script.audioComponent) {
        script.audioComponent.pause();
        print("AudioComponent: Paused audio");
    }
}

function onResumed() {
    if (script.audioComponent) {
        script.audioComponent.resume();
        print("AudioComponent: Resumed audio");
    }
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
    global.sequencer.api.onPaused(onPaused);
    global.sequencer.api.onResumed(onResumed);
}