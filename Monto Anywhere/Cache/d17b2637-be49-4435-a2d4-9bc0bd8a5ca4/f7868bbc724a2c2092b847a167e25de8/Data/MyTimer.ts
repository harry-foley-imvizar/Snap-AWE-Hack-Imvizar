

//@input Component.AnimationPlayer animationPlayer
//@input Component.AudioComponent audio

@component
export class DelayedAnimationAndAudio extends BaseScriptComponent {
    
    @input
    @allowUndefined
    animationPlayer: AnimationPlayer
    
    @input
    @allowUndefined
    audio: AudioComponent

    private timerEvent = null;
    private delay = 5.0; // seconds

    onAwake() {
        // Ensure animation is disabled initially
        this.animationPlayer.enabled = false;

        // Create a delayed event to start animation and audio
        this.timerEvent = this.createEvent("UpdateEvent");
        const startTime = getTime();

        this.timerEvent.bind(() => {
            const elapsed = getTime() - startTime;
            if (elapsed >= this.delay) {
                this.startAnimationAndAudio();
                this.removeEvent(this.timerEvent);
            }
        });
    }

    private startAnimationAndAudio() {
        if (this.animationPlayer) {
            this.animationPlayer.enabled = true;
        }

        if (this.audio) {
            this.audio.play(1);
        }
    }
}
