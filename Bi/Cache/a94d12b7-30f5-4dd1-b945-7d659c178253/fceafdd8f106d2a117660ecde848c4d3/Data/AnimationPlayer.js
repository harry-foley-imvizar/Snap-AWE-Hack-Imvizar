// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input string clipName = "Clip0" {"label": "Clip Name"}

function onTrigger() {
    if (!script.animationPlayer) return;
    
    script.animationPlayer.playClip(script.clipName);
    print("AnimationPlayer: Playing clip " + script.clipName);
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}