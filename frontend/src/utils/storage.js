export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error("Storage set error")
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch {
      console.error("Storage remove error")
    }
  },
  clear: () => {
    try {
      localStorage.clear()
    } catch {
      console.error("Storage clear error")
    }
  },
}