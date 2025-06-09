// @input float totalTime = 10.0 {"label": "Total Time (seconds)"}

var timer = 0;
var isRunning = false;
var isPaused = false;
var subscribers = [];
var pauseSubscribers = [];
var resumeSubscribers = [];

// Create API object
var sequencerAPI = {
    subscribe: function(timeToTrigger, callback) {
        subscribers.push({
            triggerTime: timeToTrigger,
            callback: callback,
            hasTriggered: false
        });
        print("Sequencer: Subscriber added for time " + timeToTrigger + " (total subscribers: " + subscribers.length + ")");
    },

    onPaused: function(callback) {
        pauseSubscribers.push(callback);
    },

    onResumed: function(callback) {
        resumeSubscribers.push(callback);
    },

    startTimer: function() {
        isRunning = true;
        isPaused = false;
        timer = 0;
        // Reset all subscribers
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i].hasTriggered = false;
        }
        print("Sequencer: Timer started with " + subscribers.length + " subscribers, total time: " + script.totalTime);
    },

    pauseTimer: function() {
        isPaused = true;
        print("Sequencer: Timer paused at time " + timer);
        // Notify pause subscribers
        for (var i = 0; i < pauseSubscribers.length; i++) {
            pauseSubscribers[i]();
        }
    },

    resumeTimer: function() {
        isPaused = false;
        print("Sequencer: Timer resumed at time " + timer);
        // Notify resume subscribers
        for (var i = 0; i < resumeSubscribers.length; i++) {
            resumeSubscribers[i]();
        }
    },

    stopTimer: function() {
        isRunning = false;
        isPaused = false;
        print("Sequencer: Timer stopped at time " + timer);
    },

    resetTimer: function() {
        timer = 0;
        isRunning = false;
        isPaused = false;
        for (var i = 0; i < subscribers.length; i++) {
            subscribers[i].hasTriggered = false;
        }
        print("Sequencer: Timer reset");
    },

    getCurrentTime: function() {
        return timer;
    },

    isTimerRunning: function() {
        return isRunning && !isPaused;
    },

    isTimerPaused: function() {
        return isPaused;
    }
};

// Make sequencer globally accessible with api property
global.sequencer = {
    api: sequencerAPI
};

print("Sequencer: Script initialized");

var lastLoggedSecond = -1;

function onUpdate() {
    if (!isRunning || isPaused) return;
    
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
        isPaused = false;
        print("Sequencer: Timer finished at " + script.totalTime + " seconds");
    }
}

var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdate);