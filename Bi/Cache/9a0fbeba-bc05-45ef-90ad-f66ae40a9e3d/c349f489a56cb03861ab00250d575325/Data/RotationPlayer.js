// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input vec3 targetRotation = {0,0,0} {"label": "Target Rotation (degrees)"}
// @input float tweenDuration = 1.0 {"label": "Duration"}
// @input string tweenEasing = "easeOutCubic" {"widget": "combobox", "values": [{"label": "Linear", "value": "linear"}, {"label": "Ease Out Cubic", "value": "easeOutCubic"}, {"label": "Ease In Cubic", "value": "easeInCubic"}, {"label": "Ease In Out Cubic", "value": "easeInOutCubic"}, {"label": "Ease Out Back", "value": "easeOutBack"}, {"label": "Ease Out Bounce", "value": "easeOutBounce"}]}

function onTrigger() {
    if (!script.targetObject) return;
    
    var transform = script.targetObject.getTransform();
    var currentRot = transform.getLocalRotation().toEulerAngles();
    var targetRotRad = new vec3(
        script.targetRotation.x * Math.PI / 180,
        script.targetRotation.y * Math.PI / 180,
        script.targetRotation.z * Math.PI / 180
    );
    
    var rotationTween = new TWEEN.Tween(currentRot)
        .to(targetRotRad, script.tweenDuration)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(function(rot) {
            transform.setLocalRotation(quat.fromEulerVec(rot));
        })
        .start();
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}