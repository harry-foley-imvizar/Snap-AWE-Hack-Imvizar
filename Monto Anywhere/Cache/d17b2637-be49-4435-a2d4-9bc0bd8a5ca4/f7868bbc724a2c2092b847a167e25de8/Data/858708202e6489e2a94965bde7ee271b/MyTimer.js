"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayedAnimationAndAudio = void 0;
var __selfType = requireType("./MyTimer");
function component(target) { target.getTypeName = function () { return __selfType; }; }
//@input Component.AnimationPlayer animationPlayer
//@input Component.AudioComponent audio
let DelayedAnimationAndAudio = class DelayedAnimationAndAudio extends BaseScriptComponent {
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
    startAnimationAndAudio() {
        if (this.animationPlayer) {
            this.animationPlayer.enabled = true;
        }
        if (this.audio) {
            this.audio.play(1);
        }
    }
    __initialize() {
        super.__initialize();
        this.timerEvent = null;
        this.delay = 5.0;
    }
};
exports.DelayedAnimationAndAudio = DelayedAnimationAndAudio;
exports.DelayedAnimationAndAudio = DelayedAnimationAndAudio = __decorate([
    component
], DelayedAnimationAndAudio);
//# sourceMappingURL=MyTimer.js.map