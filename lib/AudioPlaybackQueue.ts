/**
 * AudioPlaybackQueue - Manages streaming audio playback for Gemini Live API
 * Handles buffering, decoding, and sequential playback of audio chunks
 */

export class AudioPlaybackQueue {
  private audioContext: AudioContext;
  private queue: Float32Array[] = [];
  private isPlaying: boolean = false;
  private currentSource: AudioBufferSourceNode | null = null;
  private onPlaybackStart?: () => void;
  private onPlaybackEnd?: () => void;
  private sampleRate: number;
  private isStopped: boolean = false;

  constructor(
    audioContext: AudioContext,
    sampleRate: number = 24000,
    onPlaybackStart?: () => void,
    onPlaybackEnd?: () => void
  ) {
    this.audioContext = audioContext;
    this.sampleRate = sampleRate;
    this.onPlaybackStart = onPlaybackStart;
    this.onPlaybackEnd = onPlaybackEnd;
  }

  /**
   * Add audio data to the playback queue
   * @param audioData - Float32Array or ArrayBuffer containing PCM audio data
   */
  addToQueue(audioData: Float32Array | ArrayBuffer): void {
    if (this.isStopped) return;

    let float32Data: Float32Array;

    if (audioData instanceof ArrayBuffer) {
      // Convert ArrayBuffer to Float32Array (assuming 16-bit PCM)
      const int16Array = new Int16Array(audioData);
      float32Data = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Data[i] = int16Array[i] / 32768;
      }
    } else {
      float32Data = audioData;
    }

    this.queue.push(float32Data);

    if (!this.isPlaying) {
      this.playNext();
    }
  }

  /**
   * Play the next chunk in the queue
   */
  private async playNext(): Promise<void> {
    if (this.queue.length === 0 || this.isStopped) {
      this.isPlaying = false;
      if (!this.isStopped) {
        this.onPlaybackEnd?.();
      }
      return;
    }

    // Resume audio context if suspended (browser autoplay policy)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const audioData = this.queue.shift()!;
    this.isPlaying = true;

    if (this.queue.length === 0 && !this.currentSource) {
      this.onPlaybackStart?.();
    }

    // Create audio buffer
    const audioBuffer = this.audioContext.createBuffer(
      1, // mono
      audioData.length,
      this.sampleRate
    );
    audioBuffer.getChannelData(0).set(audioData);

    // Create and configure source node
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    
    this.currentSource = source;

    source.onended = () => {
      this.currentSource = null;
      this.playNext();
    };

    source.start();
  }

  /**
   * Stop all playback and clear the queue
   */
  stop(): void {
    this.isStopped = true;
    this.queue = [];
    
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch (e) {
        // Source may already be stopped
      }
      this.currentSource = null;
    }
    
    this.isPlaying = false;
    this.onPlaybackEnd?.();
  }

  /**
   * Clear the queue but allow future audio
   */
  clear(): void {
    this.queue = [];
    
    if (this.currentSource) {
      try {
        this.currentSource.stop();
        this.currentSource.disconnect();
      } catch (e) {
        // Source may already be stopped
      }
      this.currentSource = null;
    }
    
    this.isPlaying = false;
  }

  /**
   * Reset the queue for new playback
   */
  reset(): void {
    this.isStopped = false;
    this.clear();
  }

  /**
   * Check if currently playing
   */
  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Get queue length
   */
  getQueueLength(): number {
    return this.queue.length;
  }
}

/**
 * Helper function to decode base64 audio data
 */
export function decodeBase64Audio(base64Data: string): ArrayBuffer {
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Helper function to convert Int16Array to Float32Array
 */
export function int16ToFloat32(int16Array: Int16Array): Float32Array {
  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 32768;
  }
  return float32Array;
}

/**
 * Helper function to convert Float32Array to Int16Array
 */
export function float32ToInt16(float32Array: Float32Array): Int16Array {
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return int16Array;
}
