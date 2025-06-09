// @input float totalTime = 10.0 {"label": "Total Time (seconds)"}

var timer = 0;
var isRunning = false;
var subscribers = [];

// Public methods
script.api.subscribe = function(timeToTrigger, callback) {
    subscribers.push({
        triggerTime: timeToTrigger,
        callback: callback,
        hasTriggered: false
    });
};

script.api.startTimer = function() {
    isRunning = true;
    timer = 0;
    // Reset all subscribers
    for (var i = 0; i < subscribers.length; i++) {
        subscribers[i].hasTriggered = false;
    }
};

script.api.stopTimer = function() {
    isRunning = false;
};

script.api.resetTimer = function() {
    timer = 0;
    isRunning = false;
    for (var i = 0; i < subscribers.length; i++) {
        subscribers[i].hasTriggered = false;
    }
};

script.api.getCurrentTime = function() {
    return timer;
};

function onUpdate() {
    if (!isRunning) return;
    
    timer += getDeltaTime();
    
    // Check subscribers
    for (var i = 0; i < subscribers.length; i++) {
        var sub = subscribers[i];
        if (!sub.hasTriggered && timer >= sub.triggerTime) {
            sub.hasTriggered = true;
            sub.callback();
        }
    }
    
    // Stop at total time
    if (timer >= script.totalTime) {
        isRunning = false;
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);