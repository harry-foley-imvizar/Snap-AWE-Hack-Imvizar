// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationMixer animationMixer {"label": "Animation Mixer"}
// @input string clipName = "Clip_01" {"label": "Clip Name"}
// @input bool looping = false {"label": "Loop Animation"}

function onTrigger() {
    if (!script.animationMixer) {
        print("Animation Mixer not found!");
        return;
    }

    script.animationMixer.animationLayerName = script.clipName; // Set the layer to play
    script.animationMixer.animationWeight = 1.0; // Set the weight to 1 to fully play the animation
    script.animationMixer.numberOfLoops = script.looping ? -1 : 1; // Set the number of loops
    script.animationMixer.play(script.clipName); // Play the animation

    print("AnimationPlayer: Playing clip " + script.clipName + " (looping: " + script.looping + ")");
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}