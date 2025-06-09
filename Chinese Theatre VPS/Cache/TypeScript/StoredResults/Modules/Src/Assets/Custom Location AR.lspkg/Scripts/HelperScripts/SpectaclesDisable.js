"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpectaclesDisable = void 0;
var __selfType = requireType("./SpectaclesDisable");
function component(target) { target.getTypeName = function () { return __selfType; }; }
/**
 * To enable use of this component on Spectacles, the segmentation effect needs
 * to be disabled.
 */
let SpectaclesDisable = class SpectaclesDisable extends BaseScriptComponent {
    onAwake() {
        this.createEvent("OnStartEvent").bind(() => {
            if (global.deviceInfoSystem.isSpectacles() &&
                global.deviceInfoSystem.isEditor()) {
                print("The segmentation effect is not designed for Spectacles and will be disabled on device.");
            }
            if (global.deviceInfoSystem.isSpectacles()) {
                this.segmentationEffect.enabled = false;
            }
        });
    }
};
exports.SpectaclesDisable = SpectaclesDisable;
exports.SpectaclesDisable = SpectaclesDisable = __decorate([
    component
], SpectaclesDisable);
//# sourceMappingURL=SpectaclesDisable.js.map