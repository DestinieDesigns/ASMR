/**
 * Shyfoxie's Dream Studio - Web Audio Engine
 * Procedural ASMR sound generator for GitHub & Browser deployment without external sound files.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.5;
  private ambientRunning: boolean = false;
  private lastSoundTimes: Record<string, number> = {};

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    if (muted && this.ambientRunning) {
      this.stopAmbientPad();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public unlock() {
    this.initContext();
  }

  /**
   * Diamond Placement ASMR: Crisp glass crystal snap/clink
   */
  public playDiamondSnap(pitchShift: number = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Throttle to avoid audio clipping during fast bursts
    const now = performance.now();
    if (now - (this.lastSoundTimes['diamond'] || 0) < 35) return;
    this.lastSoundTimes['diamond'] = now;

    const baseFreq = 1100 + (pitchShift % 12) * 80 + Math.random() * 40;
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    oscHarmonic.type = 'triangle';

    osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
    oscHarmonic.frequency.setValueAtTime(baseFreq * 2.01, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    oscHarmonic.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    oscHarmonic.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.13);
    oscHarmonic.stop(this.ctx.currentTime + 0.13);
  }

  /**
   * Falling Sand Whisper ASMR: Granular soft whisper
   */
  public playSandGrain() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = performance.now();
    if (now - (this.lastSoundTimes['sand'] || 0) < 55) return;
    this.lastSoundTimes['sand'] = now;

    // Filtered noise grain
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2200 + Math.random() * 800, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(this.ctx.currentTime);
  }

  /**
   * Sand Shake Whoosh: Settles the sand with a deep satisfying rumble and compaction swoosh
   */
  public playSandShake() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.45);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.52);

    // Chime sweep to finish settling
    setTimeout(() => {
      this.playDiamondSnap(8);
    }, 250);
  }

  /**
   * Bubble Pop ASMR: Resonant pitch drop plop/pop
   */
  public playBubblePop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = performance.now();
    if (now - (this.lastSoundTimes['bubble'] || 0) < 40) return;
    this.lastSoundTimes['bubble'] = now;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = 480 + Math.random() * 200;
    osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 1.8, this.ctx.currentTime + 0.04);
    osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.09);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.11);
  }

  /**
   * Gift effects (Rose, Heart, Flower, Big Gift)
   */
  public playGiftSound(giftType: string) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const pitches = giftType === 'big_gift' 
      ? [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98] 
      : [587.33, 739.99, 880.00, 1174.66];

    pitches.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = giftType === 'big_gift' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime + idx * 0.07);
      osc.stop(this.ctx.currentTime + idx * 0.07 + 0.38);
    });
  }

  /**
   * Masterpiece Complete Celebration Fanfare
   */
  public playMasterpieceCelebration() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Dreamy Celesta/Harp ascending arpeggio with soft bell chords
    const chord = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.1);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + i * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + i * 0.1 + 1.2);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(this.ctx.currentTime + i * 0.1);
      osc.stop(this.ctx.currentTime + i * 0.1 + 1.25);
    });
  }

  /**
   * Ambient Sleep / ASMR Warm Drone Pad (soft 432Hz harmonic wash)
   */
  public startAmbientPad() {
    if (this.ambientRunning || this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.ambientGain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 3.0);
    this.ambientGain.connect(this.masterGain);

    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc2 = this.ctx.createOscillator();

    this.ambientOsc1.type = 'sine';
    this.ambientOsc2.type = 'triangle';

    this.ambientOsc1.frequency.setValueAtTime(108, this.ctx.currentTime); // Low warm tone
    this.ambientOsc2.frequency.setValueAtTime(216.2, this.ctx.currentTime); // Gentle octave beat

    this.ambientOsc1.connect(this.ambientGain);
    this.ambientOsc2.connect(this.ambientGain);

    this.ambientOsc1.start();
    this.ambientOsc2.start();
    this.ambientRunning = true;
  }

  public stopAmbientPad() {
    if (!this.ambientRunning || !this.ambientGain || !this.ctx) return;
    this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
    setTimeout(() => {
      try {
        this.ambientOsc1?.stop();
        this.ambientOsc2?.stop();
        this.ambientOsc1?.disconnect();
        this.ambientOsc2?.disconnect();
      } catch {
        // Safe disconnect
      }
      this.ambientRunning = false;
      this.ambientOsc1 = null;
      this.ambientOsc2 = null;
    }, 1100);
  }

  public toggleAmbientPad(enable: boolean) {
    if (enable) {
      this.startAmbientPad();
    } else {
      this.stopAmbientPad();
    }
  }
}

export const soundEngine = new AudioEngine();
