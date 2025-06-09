// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input string clipName = "Clip_01" {"label": "Clip Name"}
// @input bool looping = false {"label": "Loop Animation"}

function onTrigger() {
    if (!script.animationPlayer) return;
    
    // Set the clip properties before playing
    var clips = script.animationPlayer.clips;
    for (var i = 0; i < clips.length; i++) {
        if (clips[i].name === script.clipName) {
            clips[i].looping = script.looping;
            break;
        }
    }
    
    script.animationPlayer.playClip(script.clipName);
    print("AnimationPlayer: Playing clip " + script.clipName + " (looping: " + script.looping + ")");
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}