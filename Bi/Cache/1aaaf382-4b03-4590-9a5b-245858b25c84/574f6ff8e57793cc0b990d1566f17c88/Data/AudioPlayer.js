// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AudioComponent audioComponent {"label": "Audio Component"}
// @input float volume = 1.0 {"label": "Volume"}

var hasTriggered = false;

function onTrigger() {
    if (!script.audioComponent || hasTriggered) return;
    
    hasTriggered = true;
    
    // Force stop and disable loop completely
    script.audioComponent.stop(0);
    script.audioComponent.loop = false;
    script.audioComponent.volume = script.volume;
    script.audioComponent.playAutomatically = false;
    
    // Play once and monitor when it ends
    script.audioComponent.play(-1);
    
    // Create a callback to ensure it stops when done
    var endEvent = script.createEvent("AudioEndEvent");
    endEvent.bind(function() {
        script.audioComponent.stop(0);
        print("AudioPlayer: Audio finished, forced stop");
    });
    
    print("AudioPlayer: Playing audio once, no loop");
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}