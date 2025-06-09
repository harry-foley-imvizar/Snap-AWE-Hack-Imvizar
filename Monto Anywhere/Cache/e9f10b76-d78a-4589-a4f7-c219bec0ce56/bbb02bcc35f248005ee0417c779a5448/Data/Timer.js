@input Component.AnimationPlayer animationPlayer
@input Component.AudioComponent audioComponent
@input float delay = 5.0  // Delay in seconds

// Function to enable and play the animation and audio
function playAnimationAndAudio() {
    // Enable the animation player if it's disabled
    if (!script.animationPlayer.enabled) {
        script.animationPlayer.enabled = true;
    }

    // Start playing the animation
    script.animationPlayer.play();

    // Play the audio clip
    script.audioComponent.play(1); // 1 means restart from beginning
}

// Wait for the delay, then trigger
var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(playAnimationAndAudio);
delayedEvent.reset(script.delay);
