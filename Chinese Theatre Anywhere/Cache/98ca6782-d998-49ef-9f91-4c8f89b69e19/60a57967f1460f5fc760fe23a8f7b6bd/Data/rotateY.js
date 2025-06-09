// @input float rotationSpeed = 10.0

// This script rotates the object around the Y-axis over time

var transform = script.getTransform();
var updateEvent = script.createEvent("UpdateEvent");

updateEvent.bind(function(eventData) {
    // Get the current rotation
    var currentRot = transform.getWorldRotation();

    // Convert to Euler angles
    var euler = currentRot.toEulerAngles();

    // Increase Y rotation (in radians)
    euler.y += script.rotationSpeed * getDeltaTime() * Math.PI / 180;

    // Apply new rotation
    transform.setWorldRotation(quat.fromEulerAngles(euler));
});
