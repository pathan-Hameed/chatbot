export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidPhone = (phone) =>
  /^[6-9]\d{9}$/.test(phone)

export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export const generateId = () =>
  Math.random().toString(36).substring(2, 9)