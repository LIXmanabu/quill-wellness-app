import { createContext, useContext, useEffect, useState } from 'react'

const ProContext = createContext({ isPro: false, togglePro: () => {} })
const STORAGE_KEY = 'quill.isPro'

export function ProProvider({ children }) {
  const [isPro, setIsPro] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isPro))
    } catch {}
  }, [isPro])

  function togglePro() {
    setIsPro((v) => !v)
  }

  return (
    <ProContext.Provider value={{ isPro, togglePro, setIsPro }}>
      {children}
    </ProContext.Provider>
  )
}

export function usePro() {
  return useContext(ProContext)
}
