// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input int clipIndex = 0 {"label": "Clip Index"}

function onTrigger() {
    if (!script.animationPlayer) return;
    
    var clips = script.animationPlayer.clips;
    if (!clips || clips.length <= script.clipIndex) {
        print("AnimationPlayer: Clip index " + script.clipIndex + " not found. Available clips: " + (clips ? clips.length : 0));
        return;
    }
    
    // Stop all clips first
    script.animationPlayer.stop();
    
    // Try to play the clip by index directly
    var clip = clips[script.clipIndex];
    print("DEBUG: Trying to play clip at index " + script.clipIndex);
    
    // Set the current clip and play
    script.animationPlayer.currentClip = clip;
    script.animationPlayer.play();
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}