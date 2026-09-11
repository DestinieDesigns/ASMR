/**
 * Shyfoxie's Dream Studio - Web Audio Engine
 * Procedural ASMR sound generator & Procedural Lo-fi/Ambient Music Engine.
 * 100% self-contained Web Audio synthesis for GitHub & Browser deployment with zero external sound files.
 */

import { LofiTrack } from '../types';

export interface LofiTrackData extends LofiTrack {
  barsPerLoop: number;
  loopCyclesBeforeNext: number;
  chords: number[][]; // MIDI note voicings
  bassNotes: number[]; // MIDI root bass notes
  leadPool: number[]; // Pentatonic melody pool
  padVoicings: number[][]; // Ambient pads
  hasVinyl: boolean;
  hasRain: boolean;
}

export const LOFI_PLAYLIST: LofiTrackData[] = [
  {
    id: 'midnight-sakura',
    title: 'Midnight Sakura',
    artist: 'Shyfoxie Chill',
    genre: 'Lo-Fi Hip Hop',
    bpm: 68,
    mood: 'Dreamy & Relaxing',
    description: 'Warm tape Rhodes chords, soft midnight rain, and slow relaxed beats.',
    hasBeats: true,
    barsPerLoop: 4,
    loopCyclesBeforeNext: 4,
    chords: [
      [60, 64, 67, 71], // Cmaj7
      [57, 60, 64, 67], // Am7
      [53, 57, 60, 64], // Fmaj7
      [55, 59, 62, 67], // G7
    ],
    bassNotes: [36, 33, 29, 31], // C2, A1, F1, G1
    leadPool: [72, 74, 76, 79, 81, 84],
    padVoicings: [
      [48, 60, 67],
      [45, 57, 64],
      [41, 53, 60],
      [43, 55, 62],
    ],
    hasVinyl: true,
    hasRain: true,
  },
  {
    id: 'celestial-fox-nap',
    title: 'Celestial Fox Nap',
    artist: 'Dream Studio',
    genre: '432Hz Ambient Drone',
    bpm: 52,
    mood: 'Deep Sleep & Healing',
    description: 'Ethereal multi-octave pad swells, warm 432Hz tuning, and gentle chimes.',
    hasBeats: false,
    barsPerLoop: 4,
    loopCyclesBeforeNext: 3,
    chords: [
      [50, 57, 62, 66], // Dmaj9
      [49, 54, 57, 61], // F#m7
      [43, 55, 59, 62], // Gmaj7
      [45, 57, 62, 64], // A11
    ],
    bassNotes: [38, 30, 31, 33], // D2, F#1, G1, A1
    leadPool: [74, 78, 81, 83, 86, 90],
    padVoicings: [
      [50, 62, 69, 74],
      [49, 61, 66, 73],
      [43, 55, 67, 71],
      [45, 57, 69, 76],
    ],
    hasVinyl: false,
    hasRain: false,
  },
  {
    id: 'rainy-greenhouse',
    title: 'Rainy Greenhouse',
    artist: 'Shyfoxie Chill',
    genre: 'Tape Decay Lo-Fi',
    bpm: 62,
    mood: 'Cozy Solitude',
    description: 'Gentle raindrops on glass, cassette flutter, and nostalgic music-box bell melodies.',
    hasBeats: true,
    barsPerLoop: 4,
    loopCyclesBeforeNext: 4,
    chords: [
      [53, 57, 60, 64], // Fmaj7
      [48, 55, 59, 64], // Cmaj7
      [50, 57, 60, 65], // Dm7
      [46, 58, 62, 65], // Bbmaj7
    ],
    bassNotes: [29, 36, 38, 34], // F1, C2, D2, Bb1
    leadPool: [69, 72, 76, 77, 81, 84],
    padVoicings: [
      [53, 60, 65, 69],
      [48, 55, 60, 64],
      [50, 57, 62, 65],
      [46, 53, 58, 62],
    ],
    hasVinyl: true,
    hasRain: true,
  },
  {
    id: 'moonlit-crystal-river',
    title: 'Moonlit Crystal River',
    artist: 'Dream Studio',
    genre: 'Zen Water & Harp',
    bpm: 56,
    mood: 'Serene Meditation',
    description: 'Cascading harp arpeggios, gentle babbling river currents, and harmonic resonance.',
    hasBeats: false,
    barsPerLoop: 4,
    loopCyclesBeforeNext: 3,
    chords: [
      [51, 58, 63, 67], // Ebmaj7
      [48, 55, 58, 63], // Cm9
      [44, 56, 60, 63], // Abmaj7
      [46, 58, 63, 65], // Bb7sus
    ],
    bassNotes: [39, 36, 32, 34], // Eb2, C2, Ab1, Bb1
    leadPool: [75, 79, 82, 84, 87, 91],
    padVoicings: [
      [51, 63, 70, 75],
      [48, 60, 67, 72],
      [44, 56, 63, 68],
      [46, 58, 65, 70],
    ],
    hasVinyl: false,
    hasRain: true,
  },
  {
    id: 'starlit-cafe',
    title: 'Starlit Cozy Café',
    artist: 'Shyfoxie Chill',
    genre: 'Nocturne Jazzhop',
    bpm: 72,
    mood: 'Warm Night Owl',
    description: 'Mellow electric piano chords, walking acoustic sub-bass, and soft vinyl hiss.',
    hasBeats: true,
    barsPerLoop: 4,
    loopCyclesBeforeNext: 4,
    chords: [
      [55, 59, 62, 66], // Gmaj7
      [52, 56, 59, 62], // E7#9
      [57, 60, 64, 67], // Am9
      [50, 57, 62, 66], // D13
    ],
    bassNotes: [31, 28, 33, 26], // G1, E1, A1, D1
    leadPool: [71, 74, 76, 79, 83, 86],
    padVoicings: [
      [43, 55, 62, 66],
      [40, 52, 59, 62],
      [45, 57, 64, 67],
      [38, 50, 57, 62],
    ],
    hasVinyl: true,
    hasRain: false,
  },
];

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

  // Lo-Fi & Ambient Music Playlist Engine
  private musicGain: GainNode | null = null;
  private musicVolume: number = 0.35;
  private isMusicPlaying: boolean = false;
  private currentTrackIndex: number = 0;
  private schedulerIntervalId: number | null = null;
  private nextNoteTime: number = 0;
  private current16thNote: number = 0;
  private currentLoopCount: number = 0;
  private vinylNode: AudioNode | null = null;
  private rainNode: AudioNode | null = null;
  private activeMusicVoices: (OscillatorNode | AudioBufferSourceNode)[] = [];

  // Listeners for UI updates
  private onTrackChangeCallbacks: ((track: LofiTrack, index: number) => void)[] = [];
  private onPlaybackStateCallbacks: ((isPlaying: boolean) => void)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        // Music Sub-Master Gain
        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);
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

  // ==========================================
  // PROCEDURAL LO-FI PLAYLIST ENGINE
  // ==========================================

  public getTracks(): LofiTrack[] {
    return LOFI_PLAYLIST.map(({ id, title, artist, genre, bpm, mood, description, hasBeats }) => ({
      id,
      title,
      artist,
      genre,
      bpm,
      mood,
      description,
      hasBeats,
    }));
  }

  public getCurrentTrack(): LofiTrack {
    const track = LOFI_PLAYLIST[this.currentTrackIndex] || LOFI_PLAYLIST[0]!;
    return {
      id: track.id,
      title: track.title,
      artist: track.artist,
      genre: track.genre,
      bpm: track.bpm,
      mood: track.mood,
      description: track.description,
      hasBeats: track.hasBeats,
    };
  }

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getIsMusicPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public setMusicVolume(vol: number) {
    this.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.musicVolume, this.ctx.currentTime);
    }
  }

  public onTrackChange(callback: (track: LofiTrack, index: number) => void): () => void {
    this.onTrackChangeCallbacks.push(callback);
    return () => {
      this.onTrackChangeCallbacks = this.onTrackChangeCallbacks.filter((cb) => cb !== callback);
    };
  }

  public onPlaybackStateChange(callback: (isPlaying: boolean) => void): () => void {
    this.onPlaybackStateCallbacks.push(callback);
    return () => {
      this.onPlaybackStateCallbacks = this.onPlaybackStateCallbacks.filter((cb) => cb !== callback);
    };
  }

  private notifyTrackChange() {
    const track = this.getCurrentTrack();
    this.onTrackChangeCallbacks.forEach((cb) => {
      try {
        cb(track, this.currentTrackIndex);
      } catch {
        // Safe callback execution
      }
    });
  }

  private notifyPlaybackStateChange() {
    this.onPlaybackStateCallbacks.forEach((cb) => {
      try {
        cb(this.isMusicPlaying);
      } catch {
        // Safe callback execution
      }
    });
  }

  public startMusicPlaylist(trackIndex?: number) {
    this.initContext();
    if (!this.ctx || !this.musicGain) return;

    if (typeof trackIndex === 'number' && trackIndex >= 0 && trackIndex < LOFI_PLAYLIST.length) {
      this.currentTrackIndex = trackIndex;
    }

    if (this.isMusicPlaying) {
      this.stopMusicVoices();
    }

    this.isMusicPlaying = true;
    this.current16thNote = 0;
    this.currentLoopCount = 0;
    this.nextNoteTime = this.ctx.currentTime + 0.05;

    this.startAmbientTextures();
    this.startScheduler();
    this.notifyTrackChange();
    this.notifyPlaybackStateChange();
  }

  public stopMusicPlaylist() {
    if (!this.isMusicPlaying) return;
    this.isMusicPlaying = false;
    this.stopScheduler();
    this.stopMusicVoices();
    this.stopAmbientTextures();
    this.notifyPlaybackStateChange();
  }

  public toggleMusicPlaylist(forceState?: boolean): boolean {
    const targetState = typeof forceState === 'boolean' ? forceState : !this.isMusicPlaying;
    if (targetState) {
      this.startMusicPlaylist();
    } else {
      this.stopMusicPlaylist();
    }
    return this.isMusicPlaying;
  }

  public nextTrack() {
    this.initContext();
    this.currentTrackIndex = (this.currentTrackIndex + 1) % LOFI_PLAYLIST.length;
    this.current16thNote = 0;
    this.currentLoopCount = 0;
    if (this.isMusicPlaying) {
      this.stopMusicVoices();
      this.startAmbientTextures();
      this.notifyTrackChange();
    }
  }

  public prevTrack() {
    this.initContext();
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + LOFI_PLAYLIST.length) % LOFI_PLAYLIST.length;
    this.current16thNote = 0;
    this.currentLoopCount = 0;
    if (this.isMusicPlaying) {
      this.stopMusicVoices();
      this.startAmbientTextures();
      this.notifyTrackChange();
    }
  }

  public selectTrack(index: number) {
    this.initContext();
    if (index >= 0 && index < LOFI_PLAYLIST.length) {
      this.currentTrackIndex = index;
      this.current16thNote = 0;
      this.currentLoopCount = 0;
      if (this.isMusicPlaying) {
        this.stopMusicVoices();
        this.startAmbientTextures();
        this.notifyTrackChange();
      }
    }
  }

  private startScheduler() {
    this.stopScheduler();
    this.schedulerIntervalId = window.setInterval(() => {
      if (!this.isMusicPlaying || !this.ctx) return;
      // Schedule ahead by 0.15s
      while (this.nextNoteTime < this.ctx.currentTime + 0.15) {
        this.schedule16thNote(this.current16thNote, this.nextNoteTime);
        this.advanceNote();
      }
    }, 25);
  }

  private stopScheduler() {
    if (this.schedulerIntervalId !== null) {
      clearInterval(this.schedulerIntervalId);
      this.schedulerIntervalId = null;
    }
  }

  private advanceNote() {
    const track = LOFI_PLAYLIST[this.currentTrackIndex] || LOFI_PLAYLIST[0]!;
    const secondsPer16th = 60.0 / track.bpm / 4.0;
    this.nextNoteTime += secondsPer16th;
    this.current16thNote++;

    const total16thsInLoop = track.barsPerLoop * 16;
    if (this.current16thNote >= total16thsInLoop) {
      this.current16thNote = 0;
      this.currentLoopCount++;

      // Automatic track cycling after designated loop cycles
      if (this.currentLoopCount >= track.loopCyclesBeforeNext) {
        this.currentLoopCount = 0;
        this.currentTrackIndex = (this.currentTrackIndex + 1) % LOFI_PLAYLIST.length;
        this.startAmbientTextures();
        this.notifyTrackChange();
      }
    }
  }

  private schedule16thNote(noteIndex: number, time: number) {
    if (!this.ctx || !this.musicGain) return;
    const track = LOFI_PLAYLIST[this.currentTrackIndex] || LOFI_PLAYLIST[0]!;
    const bar = Math.floor(noteIndex / 16) % track.barsPerLoop;
    const noteInBar = noteIndex % 16;
    const chordIndex = bar % track.chords.length;

    // 1. Play Rhodes Chord Voicing on Beat 1 (noteInBar == 0) and syncopated Beat 3.5 (noteInBar == 10)
    if (noteInBar === 0) {
      const chord = track.chords[chordIndex] || [60, 64, 67, 71];
      const chordDuration = (60 / track.bpm) * 3.8; // sustain for nearly a full measure
      this.playRhodesChord(chord, time, chordDuration, 0.18);

      // Bass note on downbeat
      const bassMidi = track.bassNotes[chordIndex] ?? 36;
      this.playSubBass(bassMidi, time, (60 / track.bpm) * 3.5);

      // Lush Pad swell
      const padNotes = track.padVoicings[chordIndex] ?? chord;
      this.playAmbientPadChord(padNotes, time, chordDuration * 1.1);
    } else if (noteInBar === 10 && track.hasBeats) {
      // Soft syncopated chord tap
      const chord = track.chords[chordIndex] || [60, 64, 67, 71];
      this.playRhodesChord(chord, time, (60 / track.bpm) * 1.4, 0.11);
    }

    // 2. Melodic Chime / Bell Sparkle (Gentle pentatonic flourishes on specific 16ths)
    if (noteInBar === 4 || noteInBar === 9 || noteInBar === 14) {
      if (Math.random() > 0.35) {
        const randomNote = track.leadPool[Math.floor(Math.random() * track.leadPool.length)] ?? 72;
        this.playMelodicBell(randomNote, time, 0.07);
      }
    }

    // 3. Lo-Fi Beats (Kick, Rim, Hi-Hat) if track has beats enabled
    if (track.hasBeats) {
      // Kick: beat 1 (0) and beat 2.75 (7 or 10)
      if (noteInBar === 0 || (noteInBar === 10 && Math.random() > 0.3)) {
        this.playLofiKick(time);
      }

      // Snare / Rimshot: beat 2 (4) and beat 4 (12)
      if (noteInBar === 4 || noteInBar === 12) {
        this.playLofiRim(time);
      }

      // Swung Hi-Hat on even 16th notes
      if (noteInBar % 2 === 0) {
        const isAccent = noteInBar === 2 || noteInBar === 6 || noteInBar === 10 || noteInBar === 14;
        this.playLofiHat(time, isAccent ? 0.05 : 0.025);
      }
    }
  }

  // ==========================================
  // PROCEDURAL INSTRUMENT SYNTHESIS
  // ==========================================

  private midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  /**
   * Warm vintage Rhodes / electric piano chord
   */
  private playRhodesChord(notes: number[], time: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.musicGain) return;

    notes.forEach((midi, idx) => {
      if (!this.ctx || !this.musicGain) return;
      const freq = this.midiToFreq(midi);

      // Fundamental sine + soft warm triangle overtone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const bell = this.ctx.createOscillator();

      const voiceGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      bell.type = 'sine';

      // Gentle tape detuning
      const detune = (Math.random() - 0.5) * 6;
      osc1.frequency.setValueAtTime(freq, time);
      osc1.detune.setValueAtTime(detune, time);
      osc2.frequency.setValueAtTime(freq * 2.002, time);
      bell.frequency.setValueAtTime(freq * 4.0, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, time);
      filter.frequency.exponentialRampToValueAtTime(700, time + duration);

      // Velocity curve with warm envelope
      const stagger = idx * 0.018; // soft strum effect
      const noteStart = time + stagger;

      voiceGain.gain.setValueAtTime(0.0001, noteStart);
      voiceGain.gain.linearRampToValueAtTime(gainLevel / notes.length, noteStart + 0.025);
      voiceGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + duration);

      osc1.connect(voiceGain);
      osc2.connect(voiceGain);
      bell.connect(voiceGain);
      voiceGain.connect(filter);
      filter.connect(this.musicGain);

      osc1.start(noteStart);
      osc2.start(noteStart);
      bell.start(noteStart);

      osc1.stop(noteStart + duration + 0.05);
      osc2.stop(noteStart + duration + 0.05);
      bell.stop(noteStart + duration + 0.05);

      this.activeMusicVoices.push(osc1, osc2, bell);
    });
  }

  /**
   * Deep, rounded warm sub-bass
   */
  private playSubBass(midi: number, time: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;

    const freq = this.midiToFreq(midi);
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.18, time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration + 0.05);
    this.activeMusicVoices.push(osc);
  }

  /**
   * Ethereal Ambient Pad chord swell
   */
  private playAmbientPadChord(notes: number[], time: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;

    notes.forEach((midi) => {
      if (!this.ctx || !this.musicGain) return;
      const freq = this.midiToFreq(midi);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, time);
      filter.frequency.linearRampToValueAtTime(1200, time + duration * 0.4);
      filter.frequency.linearRampToValueAtTime(450, time + duration);

      // Slow breathing swell
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.linearRampToValueAtTime(0.045 / notes.length, time + duration * 0.4);
      gain.gain.linearRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      osc.stop(time + duration + 0.1);
      this.activeMusicVoices.push(osc);
    });
  }

  /**
   * Delicate Music-Box / Pentatonic Bell Chime
   */
  private playMelodicBell(midi: number, time: number, gainLevel: number) {
    if (!this.ctx || !this.musicGain) return;

    const freq = this.midiToFreq(midi);
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    oscHarmonic.type = 'triangle';

    osc.frequency.setValueAtTime(freq, time);
    oscHarmonic.frequency.setValueAtTime(freq * 2.01, time);

    gain.gain.setValueAtTime(gainLevel, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.85);

    osc.connect(gain);
    oscHarmonic.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    oscHarmonic.start(time);

    osc.stop(time + 0.9);
    oscHarmonic.stop(time + 0.9);
    this.activeMusicVoices.push(osc, oscHarmonic);
  }

  /**
   * Soft Lo-Fi Kick Drum
   */
  private playLofiKick(time: number) {
    if (!this.ctx || !this.musicGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, time);
    osc.frequency.exponentialRampToValueAtTime(38, time + 0.14);

    gain.gain.setValueAtTime(0.22, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    osc.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + 0.24);
    this.activeMusicVoices.push(osc);
  }

  /**
   * Soft Lo-Fi Rimshot / Brush Snare
   */
  private playLofiRim(time: number) {
    if (!this.ctx || !this.musicGain) return;

    // Filtered noise burst
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1750, time);
    filter.Q.setValueAtTime(2.2, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.07);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    noise.start(time);
    noise.stop(time + 0.08);
    this.activeMusicVoices.push(noise);
  }

  /**
   * Soft Tape / Vinyl Closed Hi-Hat
   */
  private playLofiHat(time: number, gainLevel: number) {
    if (!this.ctx || !this.musicGain) return;

    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6500, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainLevel, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    noise.start(time);
    noise.stop(time + 0.04);
    this.activeMusicVoices.push(noise);
  }

  // ==========================================
  // AMBIENT TEXTURES (VINYL CRACKLE & RAIN)
  // ==========================================

  private startAmbientTextures() {
    this.stopAmbientTextures();
    if (!this.ctx || !this.musicGain) return;

    const track = LOFI_PLAYLIST[this.currentTrackIndex];
    if (!track) return;

    // Vinyl Crackle
    if (track.hasVinyl) {
      try {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          // Very gentle pink noise base with occasional random crackle pops
          const baseNoise = (Math.random() * 2 - 1) * 0.015;
          const isPop = Math.random() < 0.0006;
          data[i] = isPop ? (Math.random() * 2 - 1) * 0.35 : baseNoise;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3200, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.8, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        source.start();
        this.vinylNode = source;
      } catch {
        // Safe texture handling
      }
    }

    // Soft Rain Bed
    if (track.hasRain) {
      try {
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.08;
        }

        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1100, this.ctx.currentTime);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.035, this.ctx.currentTime);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.musicGain);

        source.start();
        this.rainNode = source;
      } catch {
        // Safe texture handling
      }
    }
  }

  private stopAmbientTextures() {
    if (this.vinylNode) {
      try {
        (this.vinylNode as AudioBufferSourceNode).stop();
        this.vinylNode.disconnect();
      } catch {
        // Safe disconnect
      }
      this.vinylNode = null;
    }
    if (this.rainNode) {
      try {
        (this.rainNode as AudioBufferSourceNode).stop();
        this.rainNode.disconnect();
      } catch {
        // Safe disconnect
      }
      this.rainNode = null;
    }
  }

  private stopMusicVoices() {
    this.activeMusicVoices.forEach((voice) => {
      try {
        if ('stop' in voice) {
          voice.stop();
        }
        voice.disconnect();
      } catch {
        // Safe cleanup
      }
    });
    this.activeMusicVoices = [];
  }

  // ==========================================
  // ASMR INTERACTIVE SOUND FX
  // ==========================================

  public playDiamondSnap(pitchShift: number = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

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

  public playSandGrain() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const now = performance.now();
    if (now - (this.lastSoundTimes['sand'] || 0) < 55) return;
    this.lastSoundTimes['sand'] = now;

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

    setTimeout(() => {
      this.playDiamondSnap(8);
    }, 250);
  }

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

  public playGiftSound(giftType: string) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const pitches =
      giftType === 'big_gift'
        ? [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]
        : [587.33, 739.99, 880.0, 1174.66];

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

  public playMasterpieceCelebration() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

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

    this.ambientOsc1.frequency.setValueAtTime(108, this.ctx.currentTime);
    this.ambientOsc2.frequency.setValueAtTime(216.2, this.ctx.currentTime);

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
