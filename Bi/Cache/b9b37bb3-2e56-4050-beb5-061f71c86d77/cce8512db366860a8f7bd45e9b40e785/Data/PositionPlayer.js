// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input vec3 targetPosition = {0,0,0} {"label": "Target Position"}
// @input float tweenDuration = 1.0 {"label": "Duration"}
// @input string tweenEasing = "easeOutCubic" {"widget": "combobox", "values": [{"label": "Linear", "value": "linear"}, {"label": "Ease Out Cubic", "value": "easeOutCubic"}, {"label": "Ease In Cubic", "value": "easeInCubic"}, {"label": "Ease In Out Cubic", "value": "easeInOutCubic"}, {"label": "Ease Out Back", "value": "easeOutBack"}, {"label": "Ease Out Bounce", "value": "easeOutBounce"}]}

function onTrigger() {
    if (!script.targetObject) return;
    
    var transform = script.targetObject.getTransform();
    var easing = TWEEN.Easing.Cubic.Out; // Default
    
    var positionTween = new TWEEN.Tween(transform.getLocalPosition())
        .to(script.targetPosition, script.tweenDuration)
        .easing(easing)
        .onUpdate(function(pos) {
            transform.setLocalPosition(pos);
        })
        .start();
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}