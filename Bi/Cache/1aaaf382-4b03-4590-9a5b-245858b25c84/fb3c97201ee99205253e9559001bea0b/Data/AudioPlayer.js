// @input Component.AudioComponent audioComponent {"label": "Audio Component"}
// @input float volume = 1.0 {"label": "Volume"}

var hasTriggered = false;

function onTrigger() {
    if (!script.audioComponent || hasTriggered) return;

    hasTriggered = true;

    // Get the audio track duration
    var audioTrack = script.audioComponent.audioTrack;
    var duration = audioTrack ? audioTrack.duration : 5.0; // fallback to 5 seconds

    // Force stop any current playback
    script.audioComponent.stop(0);
    script.audioComponent.loop = false;
    script.audioComponent.volume = script.volume;
    script.audioComponent.playAutomatically = false;

    // Play for exact duration
    script.audioComponent.play(duration);

    // Force stop after duration + small buffer
    var stopEvent = script.createEvent("DelayedCallbackEvent");
    stopEvent.bind(function() {
        script.audioComponent.stop(0);
        print("AudioPlayer: Forced stop after duration");
    });
    stopEvent.reset(duration + 0.1);

    print("AudioPlayer: Playing audio for " + duration + " seconds");
}