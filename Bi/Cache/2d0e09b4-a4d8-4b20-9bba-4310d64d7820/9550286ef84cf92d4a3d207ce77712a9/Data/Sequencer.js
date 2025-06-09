// @input float totalTime = 10.0 {"label": "Total Time (seconds)"}

var timer = 0;
var isRunning = false;
var subscribers = [];

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
    timer = 0;
    // Reset all subscribers
    for (var i = 0; i < subscribers.length; i++) {
        subscribers[i].hasTriggered = false;
    }
    print("Sequencer: Timer started with " + subscribers.length + " subscribers, total time: " + script.totalTime);
};

script.api.stopTimer = function() {
    isRunning = false;
    print("Sequencer: Timer stopped at time " + timer);
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

var lastLoggedSecond = -1;

function onUpdate() {
    if (!isRunning) return;
    
    timer += getDeltaTime();
    

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