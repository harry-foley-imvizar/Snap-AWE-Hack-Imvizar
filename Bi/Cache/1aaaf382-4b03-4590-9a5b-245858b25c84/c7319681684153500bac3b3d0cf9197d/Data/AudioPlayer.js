// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AudioComponent audioComponent {"label": "Audio Component"}
// @input float volume = 1.0 {"label": "Volume"}
// @input bool loop = false {"label": "Loop"}

var hasTriggered = false;

function onTrigger() {
    if (!script.audioComponent || hasTriggered) return;
    
    hasTriggered = true;
    script.audioComponent.volume = script.volume;
    script.audioComponent.loop = script.loop;
    script.audioComponent.play(-1);
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}