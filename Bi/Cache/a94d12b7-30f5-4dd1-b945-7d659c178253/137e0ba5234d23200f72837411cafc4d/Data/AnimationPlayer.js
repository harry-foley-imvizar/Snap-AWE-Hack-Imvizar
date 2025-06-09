// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input bool startFromBeginning = true {"label": "Start From Beginning"}
// @input float playbackSpeed = 1.0 {"label": "Playback Speed"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer || hasTriggered) return;
    
    hasTriggered = true;
    
    script.animationPlayer.speed = script.playbackSpeed;
    
    if (script.startFromBeginning) {
        script.animationPlayer.play(0);
    } else {
        script.animationPlayer.resume();
    }
    
    print("AnimationPlayer: Started animation");

    // Stop the animation when it finishes
    var animationFinishedEvent = script.createEvent("DelayedCallbackEvent");
    animationFinishedEvent.bind(function() {
        script.animationPlayer.pause();
        print("AnimationPlayer: Animation finished and stopped");
    });

    // Get the animation duration and set the delay
    var clip = script.animationPlayer.getCurrentClip();
    var duration = clip ? clip.duration : 1.0;

    animationFinishedEvent.reset(duration);
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}