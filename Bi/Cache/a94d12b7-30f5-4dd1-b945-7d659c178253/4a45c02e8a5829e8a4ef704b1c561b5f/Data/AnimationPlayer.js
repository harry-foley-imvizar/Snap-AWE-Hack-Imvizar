// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input string clipName = "" {"label": "Animation Clip Name"}
// @input bool startFromBeginning = true {"label": "Start From Beginning"}
// @input float playbackSpeed = 1.0 {"label": "Playback Speed"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer || hasTriggered) return;
    
    hasTriggered = true;
    
    if (script.clipName && script.clipName !== "") {
        // Play specific clip
        if (script.startFromBeginning) {
            script.animationPlayer.playClipAt(script.clipName, 0);
        } else {
            script.animationPlayer.resumeClip(script.clipName);
        }
    } else {
        // Play all clips
        if (script.startFromBeginning) {
            script.animationPlayer.playAll();
        } else {
            script.animationPlayer.resumeAll();
        }
    }
    
    print("AnimationPlayer: Started animation");
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}