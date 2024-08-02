import { Mutex } from 'async-mutex'

class RangeManager {
  constructor() {
    this.currentRange = { start: 0, end: -1 };
    this.currentNumber = 0;
    this.mutex = new Mutex()
  }
// `${process.env.RANGE_SERVER}/api/v1/range`
// 'http://localhost:8000/api/v1/range'
  async getNewRange() {
    try {
      const response = await fetch(`${process.env.RANGE_SERVER}/api/v1/range`, {
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