// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AudioComponent audioComponent {"label": "Audio Component"}
// @input float volume = 1.0 {"label": "Volume"}

var hasTriggered = false;

function onTrigger() {
    if (!script.audioComponent || hasTriggered) return;

    hasTriggered = true;

    // Force stop any current playback
    script.audioComponent.stop(0);
    script.audioComponent.loop = false;
    script.audioComponent.volume = script.volume;
    script.audioComponent.playAutomatically = false;

    // Play the full audio without specifying duration
    script.audioComponent.play(3);

    print("AudioPlayer: Playing audio (full duration)");
}

// Connect to sequencer
if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}