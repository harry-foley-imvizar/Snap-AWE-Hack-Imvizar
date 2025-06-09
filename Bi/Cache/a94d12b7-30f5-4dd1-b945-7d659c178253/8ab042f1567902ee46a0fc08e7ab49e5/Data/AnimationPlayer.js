// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input string clipName = "Idle" {"label": "Clip Name"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer || hasTriggered) return;
    
    hasTriggered = true;
    
    script.animationPlayer.playClip(script.clipName);
    print("Playing clip: " + script.clipName);
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