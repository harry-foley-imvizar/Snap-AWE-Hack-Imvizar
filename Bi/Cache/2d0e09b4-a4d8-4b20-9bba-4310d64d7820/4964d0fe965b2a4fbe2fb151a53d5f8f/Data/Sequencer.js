// @input float totalTime = 10.0 {"label": "Total Time (seconds)"}

var timer = 0;
var isRunning = false;
var subscribers = [];

// Initialize API object
script.api = {};

// Make sequencer globally accessible
global.sequencer = script;
print("Sequencer: Script initialized");

// Public methods
script.api.subscribe = function(timeToTrigger, callback) {
    subscribers.push({
        triggerTime: timeToTrigger,
        callback: callback,
        hasTriggered: false
    });
    print("Sequencer: Subscriber added for time " + timeToTrigger + " (total subscribers: " + subscribers.length + ")");
};

script.api.startTimer = function() {
    isRunning = true;
    if (timer === 0) {
        // Reset all subscribers only when starting from beginning
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i].hasTriggered = false;
        }
    }
    print("Sequencer: Timer started at time " + timer.toFixed(2) + " with " + subscribers.length + " subscribers, total time: " + script.totalTime);
};

script.api.pauseTimer = function() {
    isRunning = false;
    print("Sequencer: Timer paused at time " + timer.toFixed(2));
};

script.api.stopTimer = function() {
    isRunning = false;
    timer = 0;
    for (var i = 0; i < subscribers.length; i++) {
        subscribers[i].hasTriggered = false;
    }
    print("Sequencer: Timer stopped and reset");
};

script.api.resetTimer = function() {
    timer = 0;
    isRunning = false;
    for (var i = 0; i < subscribers.length; i++) {
        subscribers[i].hasTriggered = false;
    }
    print("Sequencer: Timer reset");
};

script.api.getCurrentTime = function() {
    return timer;
};

script.api.isPlaying = function() {
    return isRunning;
};

var lastLoggedSecond = -1;

function onUpdate() {
    if (!isRunning) return;
    
    timer += getDeltaTime();
    
    // Log every second
    var currentSecond = Math.floor(timer);
    if (currentSecond > lastLoggedSecond) {
        print("Sequencer: Timer at " + timer.toFixed(2) + " seconds");
        lastLoggedSecond = currentSecond;
    }
    
    // Check subscribers
    for (var i = 0; i < subscribers.length; i++) {
        var sub = subscribers[i];
        if (!sub.hasTriggered && timer >= sub.triggerTime) {
            sub.hasTriggered = true;
            print("Sequencer: Triggering subscriber at time " + sub.triggerTime + " (actual time: " + timer.toFixed(2) + ")");
            sub.callback();
        }
    }
    
    // Stop at total time
    if (timer >= script.totalTime) {
        isRunning = false;
        print("Sequencer: Timer finished at " + script.totalTime + " seconds");
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);