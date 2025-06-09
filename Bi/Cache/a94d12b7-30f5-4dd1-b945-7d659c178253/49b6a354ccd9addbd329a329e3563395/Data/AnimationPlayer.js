// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input int clipIndex = 0 {"label": "Clip Index"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer) {
        print("ERROR: No animation player assigned");
        return;
    }
    
    if (hasTriggered) {
        print("Already triggered, skipping");
        return;
    }
    
    hasTriggered = true;
    
    var clips = script.animationPlayer.clips;
    print("Total clips found: " + (clips ? clips.length : "none"));
    
    if (clips) {
        for (var i = 0; i < clips.length; i++) {
            print("Clip " + i + ": " + clips[i].name);
        }
    }
    
    if (clips && clips.length > script.clipIndex) {
        var clipName = clips[script.clipIndex].name;
        print("Attempting to play clip: " + clipName);
        
        // Try multiple play methods
        script.animationPlayer.playClip(clipName);
        script.animationPlayer.setClipEnabled(clipName, true);
        
        print("Clip played: " + clipName);
    } else {
        print("ERROR: Clip index " + script.clipIndex + " out of range. Available: " + (clips ? clips.length : 0));
    }
}

function trySubscribe() {
    if (global.sequencer && global.sequencer.subscribe) {
        global.sequencer.subscribe(script.triggerTime, onTrigger);
        print("Subscribed to sequencer at time: " + script.triggerTime);
    } else {
        print("Sequencer not ready, retrying...");
        var delayEvent = script.createEvent("DelayedCallbackEvent");
        delayEvent.bind(trySubscribe);
        delayEvent.reset(0.1);
    }
}

trySubscribe();