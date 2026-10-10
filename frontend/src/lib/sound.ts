// Cyber Synth Audio Engine for eSports Nexus
// Pure Web Audio API — No external audio files or network requests needed

let audioCtx: AudioContext | null = null
let soundEnabled = true

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function isAudioEnabled(): boolean {
  return soundEnabled
}

export function toggleAudio(enabled?: boolean): boolean {
  soundEnabled = enabled !== undefined ? enabled : !soundEnabled
  return soundEnabled
}

export function playCyberHover(): void {
  if (!soundEnabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(480, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.015, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.04)
  } catch {
    // Graceful fallback
  }
}

export function playCyberClick(): void {
  if (!soundEnabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.08)

    gain.gain.setValueAtTime(0.04, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.08)
  } catch {
    // Graceful fallback
  }
}

export function playJoinSuccess(): void {
  if (!soundEnabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Two-tone chord
    const freqs = [523.25, 659.25, 783.99, 1046.50]
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now + idx * 0.05)

      gain.gain.setValueAtTime(0.03, now + idx * 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + idx * 0.05)
      osc.stop(now + idx * 0.05 + 0.25)
    })
  } catch {
    // Graceful fallback
  }
}
