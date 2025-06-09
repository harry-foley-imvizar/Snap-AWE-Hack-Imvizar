// @input float rotationSpeed = 10.0 // Degrees per second

var transform = script.getTransform();
var updateEvent = script.createEvent("UpdateEvent");

updateEvent.bind(function() {
    // Convert degrees/sec to radians/frame
    var deltaY = script.rotationSpeed * getDeltaTime() * Math.PI / 180;

    // Create a quaternion for Y-axis rotation
    var rotationDelta = quat.angleAxis(deltaY, vec3.up());

    // Apply it to the current local rotation
    var newRotation = rotationDelta.multiply(transform.getLocalRotation());
    transform.setLocalRotation(newRotation);
});
