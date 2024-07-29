import  { Mutex} from 'async-mutex'

let lastNumber = 0

const rangeSize = parseInt(process.env.RANGE_NUMBER, 10)


const mutex = new Mutex()

export const getRangeNumber = async () => {
    const release = await mutex.acquire()

    try {
        const start = lastNumber + 1
        const end = start + (process.env.RANGE_NUMBER - 1)
        lastNumber = end
        return [start, end]
    } finally {
        release()
    }
}

