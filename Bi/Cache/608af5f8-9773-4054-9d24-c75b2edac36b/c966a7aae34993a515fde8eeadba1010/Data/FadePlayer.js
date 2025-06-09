// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input string fadeType = "fadeIn" {"widget": "combobox", "values": [{"label": "Fade In", "value": "fadeIn"}, {"label": "Fade Out", "value": "fadeOut"}, {"label": "Fade To", "value": "fadeTo"}]}
// @input float targetOpacity = 0.5 {"label": "Target Opacity", "showIf": "fadeType", "showIfValue": "fadeTo"}
// @input float fadeDuration = 1.0 {"label": "Fade Duration"}
// @input string tweenEasing = "easeOutCubic" {"widget": "combobox", "values": [{"label": "Linear", "value": "linear"}, {"label": "Ease Out Cubic", "value": "easeOutCubic"}, {"label": "Ease In Cubic", "value": "easeInCubic"}, {"label": "Ease In Out Cubic", "value": "easeInOutCubic"}]}
// @input bool enableOnStart = false {"label": "Enable Object On Start"}

function onTrigger() {
    if (!script.targetObject) return;
    
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
    
    var fadeEasing;
    switch(script.tweenEasing) {
        case "linear":
            fadeEasing = TWEEN.Easing.Linear.None;
            break;
        case "easeInCubic":
            fadeEasing = TWEEN.Easing.Cubic.In;
            break;
        case "easeOutCubic":
            fadeEasing = TWEEN.Easing.Cubic.Out;
            break;
        case "easeInOutCubic":
            fadeEasing = TWEEN.Easing.Cubic.InOut;
            break;
        default:
            fadeEasing = TWEEN.Easing.Cubic.Out;
    }
    
    var fadeTween = new TWEEN.Tween({opacity: currentOpacity})
        .to({opacity: targetAlpha}, script.fadeDuration)
        .easing(fadeEasing)
        .onUpdate(function(obj) {
            var color = material.getPass(0).baseColor;
            material.getPass(0).baseColor = new vec4(color.r, color.g, color.b, obj.opacity);
        })
        .onComplete(function() {
            // Disable object if faded out completely
            if (targetAlpha <= 0) {
                script.targetObject.enabled = false;
            }
        })
        .start();
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}