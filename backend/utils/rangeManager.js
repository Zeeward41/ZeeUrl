import { Mutex } from 'async-mutex'

class RangeManager {
  constructor() {
    this.currentRange = { start: 0, end: -1 };
    this.currentNumber = 0;
    this.mutex = new Mutex()
  }

  async getNewRange() {
    try {
      const response = await fetch('http://localhost:8000/api/v1/range', {
        method: "GET",
      },
    )
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    this.currentRange = data;
    this.currentNumber = this.currentRange.start;
      console.log('Nouvelle plage obtenue:', this.currentRange);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    }
  }

  async getNextNumber() {
    const release = await this.mutex.acquire()
    try {
    if (this.currentNumber > this.currentRange.end) {
      await this.getNewRange();
    }
    return this.currentNumber++;
  } finally {
    release()
  }
}
}

export default RangeManager