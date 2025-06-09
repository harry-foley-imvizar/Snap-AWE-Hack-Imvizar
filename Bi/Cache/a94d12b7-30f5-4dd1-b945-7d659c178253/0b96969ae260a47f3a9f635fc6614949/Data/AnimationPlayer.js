// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input int clipIndex = 0 {"label": "Animation Clip Index"}
// @input bool startFromBeginning = true {"label": "Start From Beginning"}
// @input float playbackSpeed = 1.0 {"label": "Playback Speed"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer || hasTriggered) return;
    
    hasTriggered = true;
    
    var clips = script.animationPlayer.clips;
    if (clips && clips.length > script.clipIndex) {
        var clipName = clips[script.clipIndex].name;
        
        if (script.startFromBeginning) {
            script.animationPlayer.playClipAt(clipName, 0);
        } else {
            script.animationPlayer.resumeClip(clipName);
        }
        
        print("AnimationPlayer: Started animation clip " + script.clipIndex + " (" + clipName + ")");
    } else {
        print("AnimationPlayer: Clip index " + script.clipIndex + " not found");
    }
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}