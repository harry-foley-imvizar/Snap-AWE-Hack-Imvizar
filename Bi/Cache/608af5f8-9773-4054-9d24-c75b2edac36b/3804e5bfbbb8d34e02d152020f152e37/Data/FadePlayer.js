// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input string fadeType = "fadeIn" {"widget": "combobox", "values": [{"label": "Fade In", "value": "fadeIn"}, {"label": "Fade Out", "value": "fadeOut"}, {"label": "Fade To", "value": "fadeTo"}]}
// @input float targetOpacity = 0.5 {"label": "Target Opacity", "showIf": "fadeType", "showIfValue": "fadeTo"}
// @input float fadeDuration = 1.0 {"label": "Fade Duration"}
// @input string tweenEasing = "easeOutCubic" {"widget": "combobox", "values": [{"label": "Linear", "value": "linear"}, {"label": "Ease Out Cubic", "value": "easeOutCubic"}, {"label": "Ease In Cubic", "value": "easeInCubic"}, {"label": "Ease In Out Cubic", "value": "easeInOutCubic"}]}
// @input bool enableOnStart = false {"label": "Enable Object On Start"}

function onTrigger() {
    if (!script.targetObject) return;
    
    print("FadePlayer: Triggered at " + script.triggerTime);
    
    // Enable object if needed
    if (script.enableOnStart) {
        script.targetObject.enabled = true;
    }
    
    var renderComponent = script.targetObject.getComponent("Component.RenderMeshVisual");
    if (!renderComponent || !renderComponent.getMaterial(0)) return;
    
    var material = renderComponent.getMaterial(0);
    var currentOpacity = material.getPass(0).baseColor.a;
    
    var targetAlpha;
    switch(script.fadeType) {
        case "fadeIn":
            targetAlpha = 1.0;
            break;
        case "fadeOut":
            targetAlpha = 0.0;
            break;
        case "fadeTo":
            targetAlpha = script.targetOpacity;
            break;
        default:
            targetAlpha = 1.0;
    }
    
    // Built-in easing function
    function getEasingValue(progress) {
        switch(script.tweenEasing) {
            case "linear":
                return progress;
            case "easeInCubic":
                return progress * progress * progress;
            case "easeOutCubic":
                return 1 - Math.pow(1 - progress, 3);
            case "easeInOutCubic":
                return progress < 0.5 
                    ? 4 * progress * progress * progress 
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            default:
                return 1 - Math.pow(1 - progress, 3); // easeOutCubic
        }
    }
    
    // Animate the fade
    var startTime = getTime();
    var startOpacity = currentOpacity;
    
    var updateEvent = script.createEvent("UpdateEvent");
    updateEvent.bind(function() {
        var elapsed = getTime() - startTime;
        var progress = Math.min(elapsed / script.fadeDuration, 1.0);
        
        var easedProgress = getEasingValue(progress);
        var newOpacity = startOpacity + (targetAlpha - startOpacity) * easedProgress;
        
        var color = material.getPass(0).baseColor;
        material.getPass(0).baseColor = new vec4(color.r, color.g, color.b, newOpacity);
        
        if (progress >= 1.0) {
            script.removeEvent(updateEvent);
            // Disable object if faded out completely
            if (targetAlpha <= 0) {
                script.targetObject.enabled = false;
            }
            print("FadePlayer: Animation complete");
        }
    });
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
    print("FadePlayer: Subscribed to sequencer at time " + script.triggerTime);
} else {
    print("FadePlayer: Sequencer not found!");
}