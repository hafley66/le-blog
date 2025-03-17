export const MATH = {
  async add(x: number, y: number) {
    return Promise.resolve(x + y)
  },
  async sub(x: number, y: number) {
    return Promise.resolve(x - y)
  },
}
