import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function useAsyncStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((value) => {
        if (value !== null) {
          setStoredValue(JSON.parse(value))
        }
      })
      .catch(() => {
      })
  }, [key])

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(storedValue)).catch(() => {
    })
  }, [key, storedValue])

  return [storedValue, setStoredValue] as const
}
