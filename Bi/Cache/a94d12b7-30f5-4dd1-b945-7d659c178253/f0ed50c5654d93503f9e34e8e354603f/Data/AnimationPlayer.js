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
    
    print("DEBUG: Requested clipIndex: " + script.clipIndex);
    print("DEBUG: Total clips: " + clips.length);
    
    // List all clips
    for (var i = 0; i < clips.length; i++) {
        print("DEBUG: Clip " + i + " = " + clips[i].name);
    }
    
    // Stop all clips first
    for (var i = 0; i < clips.length; i++) {
        script.animationPlayer.stopClip(clips[i].name);
        print("DEBUG: Stopped clip " + i + " (" + clips[i].name + ")");
    }
    
    // Play the selected clip
    var clip = clips[script.clipIndex];
    print("DEBUG: About to play clip at index " + script.clipIndex + " which is: " + clip.name);
    script.animationPlayer.playClip(clip.name);
    print("DEBUG: Called playClip for: " + clip.name);
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}