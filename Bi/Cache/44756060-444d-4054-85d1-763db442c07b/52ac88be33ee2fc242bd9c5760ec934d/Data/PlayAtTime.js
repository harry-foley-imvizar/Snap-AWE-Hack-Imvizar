// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationMixer animationMixer {"label": "Animation Mixer", "showIf": "hasAnimation"}
// @input string animationLayerName = "" {"label": "Animation Layer Name", "showIf": "hasAnimation"}
// @input Component.AudioComponent audioComponent {"label": "Audio Component", "showIf": "hasAudio"}
// @input SceneObject targetObject {"label": "Target Object", "showIf": "hasVisibilityToggle"}
// @input bool hasAnimation = true {"label": "Has Animation"}
// @input bool hasAudio = true {"label": "Has Audio"}
// @input bool hasVisibilityToggle = false {"label": "Toggle Visibility"}
// @input bool hideAfterTrigger = false {"label": "Hide After Trigger", "showIf": "hasVisibilityToggle"}

function onTrigger() {
    // Play animation
    if (script.hasAnimation && script.animationMixer) {
        if (script.animationLayerName && script.animationLayerName !== "") {
            script.animationMixer.start(script.animationLayerName, 0, 1);
        } else {
            script.animationMixer.startAll();
        }
    }
    
    // Play audio
    if (script.hasAudio && script.audioComponent) {
        script.audioComponent.play(1);
    }
    
    // Handle visibility
    if (script.hasVisibilityToggle && script.targetObject) {
        if (script.hideAfterTrigger) {
            script.targetObject.enabled = false;
        } else {
            script.targetObject.enabled = true;
        }
    }
    
    print("PlayAtTime triggered at: " + script.triggerTime + " seconds");
}

// Subscribe to sequencer
if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
} else {
    print("PlayAtTime: Sequencer not found in global");
}