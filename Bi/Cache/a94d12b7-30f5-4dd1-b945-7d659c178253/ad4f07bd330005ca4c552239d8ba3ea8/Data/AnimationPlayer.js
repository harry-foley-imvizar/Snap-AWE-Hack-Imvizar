// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input bool startFromBeginning = true {"label": "Start From Beginning"}
// @input float playbackSpeed = 1.0 {"label": "Playback Speed"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer || hasTriggered) return;
    
    hasTriggered = true; [[1]](https://www.youtube.com/watch?v=0BJpcFcTRgA)
    
    script.animationPlayer.speed = script.playbackSpeed; [[1]](https://www.youtube.com/watch?v=0BJpcFcTRgA)
    
    if (script.startFromBeginning) {
        script.animationPlayer.play(0); // Play from the beginning
    } else {
        script.animationPlayer.resume();
    } [[1]](https://www.youtube.com/watch?v=0BJpcFcTRgA)
    
    print("AnimationPlayer: Started animation"); [[2]](https://developers.snap.com/lens-studio/features/animation/animation-events)

    // Stop the animation when it finishes
    var animationFinishedEvent = script.createEvent("DelayedCallbackEvent");
    animationFinishedEvent.bind(function() {
        script.animationPlayer.pause(); // or .stop(true) to reset to beginning
        print("AnimationPlayer: Animation finished and stopped");
    });

    // Get the animation duration and set the delay
    var clip = script.animationPlayer.getCurrentClip();
    var duration = clip ? clip.duration : 1.0; // Fallback duration [[1]](https://www.youtube.com/watch?v=0BJpcFcTRgA)

    animationFinishedEvent.reset(duration);
} [[1]](https://www.youtube.com/watch?v=0BJpcFcTRgA)

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}