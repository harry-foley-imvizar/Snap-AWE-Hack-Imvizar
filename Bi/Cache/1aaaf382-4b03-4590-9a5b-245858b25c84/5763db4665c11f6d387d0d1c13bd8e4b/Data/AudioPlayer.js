// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AudioComponent audioComponent {"label": "Audio Component"}
// @input float volume = 1.0 {"label": "Volume"}
// @input bool loop = false {"label": "Loop"}

var hasTriggered = false;

function onTrigger() {
    if (!script.audioComponent || hasTriggered) return;
    
    hasTriggered = true;
    
    // Force stop any current playback (stop needs fadeTime parameter)
    script.audioComponent.stop(0);
    
    // Force all settings
    script.audioComponent.volume = script.volume;
    script.audioComponent.loop = script.loop;
    script.audioComponent.playAutomatically = false;
    
    // Small delay to ensure settings take effect
    var delayedEvent = script.createEvent("DelayedCallbackEvent");
    delayedEvent.bind(function() {
        script.audioComponent.play(-1);
        print("AudioPlayer: Playing audio with loop=" + script.audioComponent.loop + ", volume=" + script.audioComponent.volume);
    });
    delayedEvent.reset(0.1);
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}