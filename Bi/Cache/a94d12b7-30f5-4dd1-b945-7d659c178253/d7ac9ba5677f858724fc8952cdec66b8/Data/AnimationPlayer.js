// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationMixer animationMixer {"label": "Animation Mixer"}
// @input string animationLayerName = "" {"label": "Animation Layer Name"}
// @input bool startFromBeginning = true {"label": "Start From Beginning"}
// @input float playbackSpeed = 1.0 {"label": "Playback Speed"}

function onTrigger() {
    if (!script.animationMixer) return;
    
    var startOffset = script.startFromBeginning ? 0 : -1;
    
    if (script.animationLayerName && script.animationLayerName !== "") {
        script.animationMixer.start(script.animationLayerName, startOffset, script.playbackSpeed);
    } else {
        script.animationMixer.startAll();
    }
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}