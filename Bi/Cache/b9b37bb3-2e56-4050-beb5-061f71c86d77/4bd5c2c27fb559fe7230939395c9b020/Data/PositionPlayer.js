// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input vec3 targetPosition = {0,0,0} {"label": "Target Position"}
// @input float tweenDuration = 1.0 {"label": "Duration"}
// @input string tweenEasing = "easeOutCubic" {"widget": "combobox", "values": [{"label": "Linear", "value": "linear"}, {"label": "Ease Out Cubic", "value": "easeOutCubic"}, {"label": "Ease In Cubic", "value": "easeInCubic"}, {"label": "Ease In Out Cubic", "value": "easeInOutCubic"}, {"label": "Ease Out Back", "value": "easeOutBack"}, {"label": "Ease Out Bounce", "value": "easeOutBounce"}]}

function onTrigger() {
    if (!script.targetObject) return;
    
    var transform = script.targetObject.getTransform();
    var startPos = transform.getLocalPosition();
    
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
            case "easeOutBack":
                var c1 = 1.70158;
                var c3 = c1 + 1;
                return 1 + c3 * Math.pow(progress - 1, 3) + c1 * Math.pow(progress - 1, 2);
            case "easeOutBounce":
                var n1 = 7.5625;
                var d1 = 2.75;
                if (progress < 1 / d1) {
                    return n1 * progress * progress;
                } else if (progress < 2 / d1) {
                    return n1 * (progress -= 1.5 / d1) * progress + 0.75;
                } else if (progress < 2.5 / d1) {
                    return n1 * (progress -= 2.25 / d1) * progress + 0.9375;
                } else {
                    return n1 * (progress -= 2.625 / d1) * progress + 0.984375;
                }
            default:
                return 1 - Math.pow(1 - progress, 3);
        }
    }
    
    var startTime = getTime();
    var updateEvent = script.createEvent("UpdateEvent");
    
    updateEvent.bind(function() {
        var elapsed = getTime() - startTime;
        var progress = Math.min(elapsed / script.tweenDuration, 1.0);
        var easedProgress = getEasingValue(progress);
        
        var currentPos = vec3.lerp(startPos, script.targetPosition, easedProgress);
        transform.setLocalPosition(currentPos);
        
        if (progress >= 1.0) {
            script.removeEvent(updateEvent);
        }
    });
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}