export default function toBase62(num) {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num === 0) {
        return "0";
    }

    let base62 = "";
    while (num > 0) {
        const remainder = num % 62;
        base62 = chars[remainder] + base62;
        num = Math.floor(num / 62);
    }

    return base62;
}