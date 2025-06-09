// @input float totalTime = 10.0 {"label": "Total Time (seconds)"}

var timer = 0;
var isRunning = false;
var subscribers = [];

// Create API object and make sequencer globally accessible
global.sequencer = {
    subscribe: function(timeToTrigger, callback) {
        subscribers.push({
            triggerTime: timeToTrigger,
            callback: callback,
            hasTriggered: false
        });
        print("Sequencer: Subscriber added for time " + timeToTrigger + " (total subscribers: " + subscribers.length + ")");
    },

    startTimer: function() {
        isRunning = true;
        if (timer === 0) {
            // Reset all subscribers only when starting from beginning
            for (var i = 0; i < subscribers.length; i++) {
                subscribers[i].hasTriggered = false;
            }
        }
        print("Sequencer: Timer started at time " + timer.toFixed(2) + " with " + subscribers.length + " subscribers, total time: " + script.totalTime);
    },

    pauseTimer: function() {
        isRunning = false;
        print("Sequencer: Timer paused at time " + timer.toFixed(2));
    },

    stopTimer: function() {
        isRunning = false;
        timer = 0;
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i].hasTriggered = false;
        }
        print("Sequencer: Timer stopped and reset");
    },

    resetTimer: function() {
        timer = 0;
        isRunning = false;
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i].hasTriggered = false;
        }
        print("Sequencer: Timer reset");
    },

    getCurrentTime: function() {
        return timer;
    },

    isPlaying: function() {
        return isRunning;
    }
};

print("Sequencer: Script initialized");

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