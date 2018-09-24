export default function sum(a, b, c) {
    if (c === 'test') {
        console.log('uncovered branch?')
        return a
    }
    else {
        return a + b
    }
}
