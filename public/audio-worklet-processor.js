/**
 * Audio Worklet Processor for capturing microphone audio
 * Converts audio from native sample rate to 16kHz for Gemini Live API
 */

class RecorderProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 2048;
    this.buffer = new Float32Array(this.bufferSize);
    this.bufferIndex = 0;
  }

  /**
   * Process audio samples from the microphone
   * @param inputs - Input audio channels
   * @param outputs - Output audio channels (not used)
   * @param parameters - Audio parameters (not used)
   * @returns true to keep processor running
   */
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    
    if (input && input.length > 0) {
      const channelData = input[0];
      
      // Add samples to buffer
      for (let i = 0; i < channelData.length; i++) {
        this.buffer[this.bufferIndex++] = channelData[i];
        
        // When buffer is full, send it
        if (this.bufferIndex >= this.bufferSize) {
          // Convert to 16-bit PCM
          const pcmData = this.float32ToInt16(this.buffer);
          
          // Send to main thread
          this.port.postMessage({
            type: 'audio',
            data: pcmData.buffer
          }, [pcmData.buffer]);
          
          // Reset buffer
          this.buffer = new Float32Array(this.bufferSize);
          this.bufferIndex = 0;
        }
      }
    }
    
    return true;
  }

  /**
   * Convert Float32Array to Int16Array (PCM format)
   * @param float32Array - Input float array
   * @returns Int16Array PCM data
   */
  float32ToInt16(float32Array) {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return int16Array;
  }
}

registerProcessor('recorder-processor', RecorderProcessor);
