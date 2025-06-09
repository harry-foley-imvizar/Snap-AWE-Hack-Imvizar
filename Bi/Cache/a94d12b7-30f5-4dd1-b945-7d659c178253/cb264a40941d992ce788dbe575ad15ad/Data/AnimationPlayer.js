// @input float triggerTime = 5.0 {"label": "Trigger Time (seconds)"}
// @input Component.AnimationPlayer animationPlayer {"label": "Animation Player"}
// @input int clipIndex = 0 {"label": "Animation Clip Index"}
// @input bool startFromBeginning = true {"label": "Start From Beginning"}
// @input float playbackSpeed = 1.0 {"label": "Playback Speed"}
// @input bool loopAnimation = false {"label": "Loop Animation"}
// @input float clipWeight = 1.0 {"label": "Clip Weight", "widget": "slider", "min": 0.0, "max": 1.0, "step": 0.01}
// @input bool enableClip = true {"label": "Enable Clip"}
// @input bool stopOtherClips = false {"label": "Stop Other Clips First"}

var hasTriggered = false;

function onTrigger() {
    if (!script.animationPlayer || hasTriggered) return;
    
    hasTriggered = true;
    
    var clips = script.animationPlayer.clips;
    if (clips && clips.length > script.clipIndex) {
        var clip = clips[script.clipIndex];
        var clipName = clip.name;
        
        // Stop other clips if requested
        if (script.stopOtherClips) {
            for (var i = 0; i < clips.length; i++) {
                if (i !== script.clipIndex) {
                    script.animationPlayer.stopClip(clips[i].name);
                }
            }
        }
        
        // Configure clip properties
        clip.speed = script.playbackSpeed;
        clip.looping = script.loopAnimation;
        clip.weight = script.clipWeight;
        
        // Enable/disable the clip
        script.animationPlayer.setClipEnabled(clipName, script.enableClip);
        
        if (script.enableClip) {
            if (script.startFromBeginning) {
                script.animationPlayer.playClipAt(clipName, 0);
            } else {
                script.animationPlayer.resumeClip(clipName);
            }
            
            print("AnimationPlayer: Started clip " + script.name + " (" + clipName + ") - Speed: " + script.playbackSpeed + ", Loop: " + script.loopAnimation + ", Weight: " + script.clipWeight);
        } else {
            print("AnimationPlayer: Clip " + script.name + " (" + clipName + ") is disabled");
        }
        
    } else {
        print("AnimationPlayer: Clip index " + script.clipIndex + " not found. Available clips: " + (clips ? clips.length : 0));
    }
}

if (global.sequencer) {
    global.sequencer.api.subscribe(script.triggerTime, onTrigger);
}