// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input string clipName = "Clip_01" {"label": "Clip Name"}
// @input int playbackMode = 0 {"label": "Playback Mode", "values": [{"label": "Single", "value": 0}, {"label": "Loop", "value": 1}, {"label": "Ping Pong", "value": 2}]}

function onTrigger() {
    if (!script.animationPlayer) return;
    
    // Set the clip playback mode before playing
    var clips = script.animationPlayer.clips;
    for (var i = 0; i < clips.length; i++) {
        if (clips[i].name === script.clipName) {
            clips[i].playbackMode = script.playbackMode;
            break;
        }
    }
    
    script.animationPlayer.playClip(script.clipName);
    print("AnimationPlayer: Playing clip " + script.clipName + " (playback mode: " + script.playbackMode + ")");
}

function onPaused() {
    if (script.animationPlayer) {
        script.animationPlayer.pauseClip(script.clipName);
        print("AnimationPlayer: Paused clip " + script.clipName);
    }
}

function onResumed() {
    if (script.animationPlayer) {
        script.animationPlayer.resumeClip(script.clipName);
        print("AnimationPlayer: Resumed clip " + script.clipName);
    }
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
    global.sequencer.api.onPaused(onPaused);
    global.sequencer.api.onResumed(onResumed);
}