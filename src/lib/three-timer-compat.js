import { Timer } from "../../node_modules/three/build/three.module.js";

// React Three Fiber currently expects Clock's legacy API. Three.js r185
// deprecated Clock in favor of Timer, so this adapter preserves Fiber's API
// while using the supported timing implementation underneath.
class Clock {
  constructor(autoStart = true) {
    this.autoStart = autoStart;
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    this.running = false;
    this.timer = new Timer();
  }

  start() {
    const now = performance.now();
    this.startTime = now;
    this.oldTime = now;
    this.elapsedTime = 0;
    this.running = true;
    this.timer = new Timer();
  }

  stop() {
    this.getElapsedTime();
    this.running = false;
  }

  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }

  getDelta() {
    if (this.autoStart && !this.running) this.start();
    if (!this.running) return 0;

    this.timer.update();
    const delta = this.timer.getDelta();
    this.oldTime = performance.now();
    this.elapsedTime += delta;
    return delta;
  }
}

export * from "../../node_modules/three/build/three.module.js";
export { Clock };
