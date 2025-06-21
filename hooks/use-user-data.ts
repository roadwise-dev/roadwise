"use client"

import { useState, useEffect, useCallback } from "react"

interface UserData {
  email: string
  name: string
}

const STORAGE_KEY = "roadwise_user_data"

export function useUserData() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: ""
  })
  const [isLoaded, setIsLoaded] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY)
        if (storedData) {
          const parsed = JSON.parse(storedData) as UserData
          setUserData(parsed)
        }
      } catch (error) {
        console.error("Error loading user data from localStorage:", error)
      } finally {
        setIsLoaded(true)
      }
    }
  }, [])

  // Save data to localStorage whenever userData changes
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
      } catch (error) {
        console.error("Error saving user data to localStorage:", error)
      }
    }
  }, [userData, isLoaded])

  // Update email
  const updateEmail = useCallback((email: string) => {
    setUserData(prev => ({ ...prev, email }))
  }, [])

  // Update name
  const updateName = useCallback((name: string) => {
    setUserData(prev => ({ ...prev, name }))
  }, [])

  // Update both email and name
  const updateUserData = useCallback((data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }))
  }, [])

  // Clear all data
  const clearUserData = useCallback(() => {
    setUserData({ email: "", name: "" })
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  return {
    userData,
    isLoaded,
    updateEmail,
    updateName,
    updateUserData,
    clearUserData
  }
}
