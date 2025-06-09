// @input float rotationSpeed = 10.0

var transform = script.getTransform();
var updateEvent = script.createEvent("UpdateEvent");

updateEvent.bind(function(eventData) {
    var currentRot = transform.getWorldRotation();
    var euler = currentRot.toEulerAngles();

    // Increase Y rotation in radians
    euler.y += script.rotationSpeed * getDeltaTime() * Math.PI / 180;

    // Apply new rotation (correct argument format)
    transform.setWorldRotation(quat.fromEulerAngles(euler.x, euler.y, euler.z));
});

