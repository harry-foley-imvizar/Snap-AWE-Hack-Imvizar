function playAnimationAndAudio() {
    if (!script.animationPlayer.enabled) {
        script.animationPlayer.enabled = true;
    }

    script.animationPlayer.play();
    script.audioComponent.play(1);
}

var delayedEvent = script.createEvent("DelayedCallbackEvent");
delayedEvent.bind(playAnimationAndAudio);
delayedEvent.reset(script.delay);
