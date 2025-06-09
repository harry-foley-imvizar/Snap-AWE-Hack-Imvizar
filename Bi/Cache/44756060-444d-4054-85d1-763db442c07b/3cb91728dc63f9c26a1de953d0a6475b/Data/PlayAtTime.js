// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationMixer animationMixer {"label": "Animation Mixer", "showIf": "hasAnimation"}
// @input string animationLayerName = "" {"label": "Animation Layer Name", "showIf": "hasAnimation"}
// @input Component.AudioComponent audioComponent {"label": "Audio Component", "showIf": "hasAudio"}
// @input SceneObject targetObject {"label": "Target Object", "showIf": "hasVisibilityToggle"}
// @input bool hasAnimation = true {"label": "Has Animation"}
// @input bool hasAudio = true {"label": "Has Audio"}
// @input bool hasVisibilityToggle = false {"label": "Toggle Visibility"}
// @input bool hideAfterTrigger = false {"label": "Hide After Trigger", "showIf": "hasVisibilityToggle"}

var sequencer = null;

function initialize() {
    // Find the Sequencer script
    var sequencerObjects = script.getSceneObject().getParent().getChildren();
    for (var i = 0; i < sequencerObjects.length; i++) {
        var obj = sequencerObjects[i];
        var scripts = obj.getComponents("Component.ScriptComponent");
        for (var j = 0; j < scripts.length; j++) {
            if (scripts[j].api && scripts[j].api.subscribe) {
                sequencer = scripts[j];
                break;
            }
        }
        if (sequencer) break;
    }
    
    // If not found in parent's children, check the scene root
    if (!sequencer) {
        var allObjects = global.scene.getRootObjectsCount();
        for (var k = 0; k < allObjects; k++) {
            var rootObj = global.scene.getRootObject(k);
            var scripts = rootObj.getComponents("Component.ScriptComponent");
            for (var l = 0; l < scripts.length; l++) {
                if (scripts[l].api && scripts[l].api.subscribe) {
                    sequencer = scripts[l];
                    break;
                }
            }
            if (sequencer) break;
        }
    }
    
    if (sequencer) {
        sequencer.api.subscribe(script.triggerTime, onTrigger);
    } else {
        print("PlayAtTime: Could not find Sequencer script");
    }
}

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

// Initialize when script starts
initialize();