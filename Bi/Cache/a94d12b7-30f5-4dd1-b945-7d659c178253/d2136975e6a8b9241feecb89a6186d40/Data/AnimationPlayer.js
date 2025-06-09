// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input bool startFromBeginning = true {"label": "Start From Beginning"}
// @input float playbackSpeed = 1.0 {"label": "Playback Speed"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer || hasTriggered) return;
    
    hasTriggered = true;
    
    script.animationPlayer.speed = script.playbackSpeed;
    
    if (script.startFromBeginning) {
        script.animationPlayer.play();
    } else {
        script.animationPlayer.resume();
    }
    
    print("AnimationPlayer: Started animation");
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}