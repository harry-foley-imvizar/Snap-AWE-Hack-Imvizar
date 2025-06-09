// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input vec3 targetPosition = {0,0,0} {"label": "Target Position"}
// @input float tweenDuration = 1.0 {"label": "Duration"}
// @input string tweenEasing = "easeOutCubic" {"widget": "combobox", "values": [{"label": "Linear", "value": "linear"}, {"label": "Ease Out Cubic", "value": "easeOutCubic"}, {"label": "Ease In Cubic", "value": "easeInCubic"}, {"label": "Ease In Out Cubic", "value": "easeInOutCubic"}, {"label": "Ease Out Back", "value": "easeOutBack"}, {"label": "Ease Out Bounce", "value": "easeOutBounce"}]}

var tweenState = {
    isRunning: false,
    isPaused: false,
    startTime: 0,
    pausedTime: 0,
    updateEvent: null,
    transform: null,
    startPos: null
};

function onTrigger() {
    if (!script.targetObject) return;
    
    tweenState.transform = script.targetObject.getTransform();
    tweenState.startPos = tweenState.transform.getLocalPosition();
    
    startTween();
}

function startTween() {
    tweenState.isRunning = true;
    tweenState.isPaused = false;
    tweenState.startTime = getTime();
    tweenState.pausedTime = 0;
    
    tweenState.updateEvent = script.createEvent("UpdateEvent");
    tweenState.updateEvent.bind(updateTween);
}

function updateTween() {
    if (!tweenState.isRunning || tweenState.isPaused) return;
    
    var currentTime = getTime();
    var elapsed = (currentTime - tweenState.startTime) - tweenState.pausedTime;
    var progress = Math.min(elapsed / script.tweenDuration, 1.0);
    var easedProgress = getEasingValue(progress);
    
    var currentPos = vec3.lerp(tweenState.startPos, script.targetPosition, easedProgress);
    tweenState.transform.setLocalPosition(currentPos);
    
    if (progress >= 1.0) {
        tweenState.isRunning = false;
        script.removeEvent(tweenState.updateEvent);
    }
}

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

function onPaused() {
    if (tweenState.isRunning) {
        tweenState.isPaused = true;
        tweenState.pauseStartTime = getTime();
        print("PositionPlayer: Paused position tween");
    }
}

function onResumed() {
    if (tweenState.isRunning && tweenState.isPaused) {
        tweenState.isPaused = false;
        tweenState.pausedTime += getTime() - tweenState.pauseStartTime;
        print("PositionPlayer: Resumed position tween");
    }
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
    global.sequencer.api.onPaused(onPaused);
    global.sequencer.api.onResumed(onResumed);
}