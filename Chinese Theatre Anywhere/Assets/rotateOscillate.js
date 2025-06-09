// @input float amplitudeDeg = 30.0   // Max angle swing (± from center), in degrees
// @input vec3 axis = {1, 0, 0}       // Rotation axis (Z by default)
// @input float speed = 0.10           // Oscillation speed in Hz
// @input float offsetDeg = -45.0       // Starting angle offset in degrees

var transform = script.getTransform();
var time = 0;

var updateEvent = script.createEvent("UpdateEvent");

updateEvent.bind(function() {
    time += getDeltaTime();

    // Convert inputs to radians
    var amplitudeRad = script.amplitudeDeg * Math.PI / 180;
    var offsetRad = script.offsetDeg * Math.PI / 180;

    // Calculate oscillating angle around offset
    var angle = Math.sin(time * script.speed * 2 * Math.PI) * amplitudeRad + offsetRad;

    // Create and apply rotation
    var rotation = quat.angleAxis(angle, script.axis);
    transform.setLocalRotation(rotation);
});

