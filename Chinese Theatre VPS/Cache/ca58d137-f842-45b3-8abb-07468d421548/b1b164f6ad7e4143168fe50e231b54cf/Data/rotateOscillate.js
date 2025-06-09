// @input float amplitudeDeg = 30.0  // Max angle in degrees (± from center)
// @input vec3 axis = {0, 0, 1}      // Axis of rotation (e.g., Z-axis)
// @input float speed = 1.0          // Oscillation speed (Hz)

var transform = script.getTransform();
var time = 0;

var updateEvent = script.createEvent("UpdateEvent");

updateEvent.bind(function() {
    time += getDeltaTime();

    // Convert amplitude to radians
    var amplitudeRad = script.amplitudeDeg * Math.PI / 180;

    // Oscillating angle using sine wave
    var angle = Math.sin(time * script.speed * 2 * Math.PI) * amplitudeRad;

    // Create quaternion for this frame’s rotation
    var rotation = quat.angleAxis(angle, script.axis);

    // Set rotation locally
    transform.setLocalRotation(rotation);
});
