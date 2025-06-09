// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input float tweenDuration = 1.0 {"label": "Duration"}
// @input string tweenEasing = "easeOutCubic" {"widget": "combobox", "values": [{"label": "Linear", "value": "linear"}, {"label": "Ease Out Cubic", "value": "easeOutCubic"}, {"label": "Ease In Cubic", "value": "easeInCubic"}, {"label": "Ease In Out Cubic", "value": "easeInOutCubic"}, {"label": "Ease Out Back", "value": "easeOutBack"}, {"label": "Ease Out Bounce", "value": "easeOutBounce"}]}

// @input bool tweenPosition = false {"label": "Tween Position"}
// @input vec3 targetPosition = {0,0,0} {"label": "Target Position", "showIf": "tweenPosition"}
// @input bool tweenRotation = false {"label": "Tween Rotation"}
// @input vec3 targetRotation = {0,0,0} {"label": "Target Rotation (degrees)", "showIf": "tweenRotation"}
// @input bool tweenScale = false {"label": "Tween Scale"}
// @input vec3 targetScale = {1,1,1} {"label": "Target Scale", "showIf": "tweenScale"}
// @input bool tweenOpacity = false {"label": "Tween Opacity"}
// @input float targetOpacity = 1.0 {"label": "Target Opacity", "showIf": "tweenOpacity"}

function onTrigger() {
    if (!script.targetObject) return;
    
    var transform = script.targetObject.getTransform();
    
    if (script.tweenPosition) {
        var positionTween = new TWEEN.Tween(transform.getLocalPosition())
            .to(script.targetPosition, script.tweenDuration)
            .easing(TWEEN.Easing.Cubic.Out)
            .onUpdate(function(pos) {
                transform.setLocalPosition(pos);
            })
            .start();
    }
    
    if (script.tweenRotation) {
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
    
    if (script.tweenScale) {
        var scaleTween = new TWEEN.Tween(transform.getLocalScale())
            .to(script.targetScale, script.tweenDuration)
            .easing(TWEEN.Easing.Cubic.Out)
            .onUpdate(function(scale) {
                transform.setLocalScale(scale);
            })
            .start();
    }
    
    if (script.tweenOpacity) {
        var renderComponent = script.targetObject.getComponent("Component.RenderMeshVisual");
        if (renderComponent && renderComponent.getMaterial(0)) {
            var material = renderComponent.getMaterial(0);
            var currentOpacity = material.getPass(0).baseColor.a;
            
            var opacityTween = new TWEEN.Tween({opacity: currentOpacity})
                .to({opacity: script.targetOpacity}, script.tweenDuration)
                .easing(TWEEN.Easing.Cubic.Out)
                .onUpdate(function(obj) {
                    var color = material.getPass(0).baseColor;
                    material.getPass(0).baseColor = new vec4(color.r, color.g, color.b, obj.opacity);
                })
                .start();
        }
    }
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}