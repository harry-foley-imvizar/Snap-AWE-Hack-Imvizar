// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input SceneObject targetObject {"label": "Target Object"}
// @input vec3 targetRotation = {0,0,0} {"label": "Target Rotation (degrees)"}
// @input float tweenDuration = 1.0 {"label": "Duration"}

function onTrigger() {
    if (!script.targetObject) return;

    print("RotationPlayer: Triggered at " + script.triggerTime);

    var transform = script.targetObject.getTransform();
    var currentRot = transform.getLocalRotation();
    var targetRotRad = quat.fromEulerAngles(
        script.targetRotation.x * Math.PI / 180,
        script.targetRotation.y * Math.PI / 180,
        script.targetRotation.z * Math.PI / 180
    );

    // Use Lens Studio's built-in animation
    var animateRotation = function() {
        var startTime = getTime();
        var startRot = currentRot;

        var updateEvent = script.createEvent("UpdateEvent");
        updateEvent.bind(function() {
            var elapsed = getTime() - startTime;
            var progress = Math.min(elapsed / script.tweenDuration, 1.0);

            // Smooth easing (ease out)
            progress = 1 - Math.pow(1 - progress, 3);

            var newRot = quat.slerp(startRot, targetRotRad, progress);
            transform.setLocalRotation(newRot);

            if (progress >= 1.0) {
                script.removeEvent(updateEvent);
                print("RotationPlayer: Animation complete");
            }
        });
    };

    animateRotation();
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
    print("RotationPlayer: Subscribed to sequencer at time " + script.triggerTime);
} else {
    print("RotationPlayer: Sequencer not found!");
}