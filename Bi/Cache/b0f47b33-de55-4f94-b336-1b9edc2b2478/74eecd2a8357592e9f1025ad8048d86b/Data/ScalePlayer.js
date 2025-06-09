// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input vec3 targetScale = {1,1,1} {"label": "Target Scale"}
// @input float tweenDuration = 1.0 {"label": "Duration"}
// @input string tweenEasing = "easeOutCubic" {"widget": "combobox", "values": [{"label": "Linear", "value": "linear"}, {"label": "Ease Out Cubic", "value": "easeOutCubic"}, {"label": "Ease In Cubic", "value": "easeInCubic"}, {"label": "Ease In Out Cubic", "value": "easeInOutCubic"}, {"label": "Ease Out Back", "value": "easeOutBack"}, {"label": "Ease Out Bounce", "value": "easeOutBounce"}]}

function onTrigger() {
    if (!script.targetObject) return;
    
    var transform = script.targetObject.getTransform();
    
    var scaleTween = new TWEEN.Tween(transform.getLocalScale())
        .to(script.targetScale, script.tweenDuration)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(function(scale) {
            transform.setLocalScale(scale);
        })
        .start();
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}