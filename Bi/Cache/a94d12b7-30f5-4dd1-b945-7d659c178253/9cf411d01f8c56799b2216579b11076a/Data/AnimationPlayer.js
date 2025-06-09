// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input int clipIndex = 0 {"label": "Clip Index"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer || hasTriggered) return;
    
    hasTriggered = true;
    
    var clips = script.animationPlayer.clips;
    if (clips && clips.length > script.clipIndex) {
        script.animationPlayer.playClip(clips[script.clipIndex].name);
        print("Playing clip: " + clips[script.clipIndex].name);
    }
}

function trySubscribe() {
    if (global.sequencer && global.sequencer.subscribe) {
        global.sequencer.subscribe(script.triggerTime, onTrigger);
    } else {
        var delayEvent = script.createEvent("DelayedCallbackEvent");
        delayEvent.bind(trySubscribe);
        delayEvent.reset(0.1);
    }
}

trySubscribe();