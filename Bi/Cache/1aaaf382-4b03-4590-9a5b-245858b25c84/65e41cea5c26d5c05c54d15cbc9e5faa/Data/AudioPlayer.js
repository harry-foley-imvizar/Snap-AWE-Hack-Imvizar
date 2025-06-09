// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AudioComponent audioComponent {"label": "Audio Component"}
// @input float volume = 1.0 {"label": "Volume"}

var hasTriggered = false;

function onTrigger() {
    if (!script.audioComponent || hasTriggered) return;

    hasTriggered = true;

    // Get the audio track duration
    var audioTrack = script.audioComponent.audioTrack;
    var duration = audioTrack ? audioTrack.duration : 5.0;

    // Force stop any current playback
    script.audioComponent.stop(0);
    script.audioComponent.loop = false;
    script.audioComponent.volume = script.volume;
    script.audioComponent.playAutomatically = false;

    // Play for exact duration
    script.audioComponent.play(duration);

    print("AudioPlayer: Playing audio for " + duration + " seconds");
}

// Connect to sequencer
if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}