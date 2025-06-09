// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input Asset.AnimationClip animationClip {"label": "Animation Clip"}

var hasTriggered = false; [[1]](https://www.youtube.com/watch?v=2218LV30dto)

function onTrigger() {
    if (!script.animationPlayer || !script.animationClip || hasTriggered) return; [[1]](https://www.youtube.com/watch?v=2218LV30dto)

    hasTriggered = true; [[1]](https://www.youtube.com/watch?v=2218LV30dto)

    script.animationPlayer.playClip(script.animationClip.name);
    print("Playing clip: " + script.animationClip.name);
}

// Wait for sequencer to be available and then subscribe
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