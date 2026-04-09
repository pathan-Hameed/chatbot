import { useState } from "react"
import { storage } from "@utils/storage"

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = storage.get(key)
    return item !== null ? item : initialValue
  })

  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    storage.set(key, valueToStore)
  }

  const removeValue = () => {
    setStoredValue(initialValue)
    storage.remove(key)
  }

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage