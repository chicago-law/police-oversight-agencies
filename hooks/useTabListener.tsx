import { useEffect } from 'react'

// If you hit tab, we'll add a class that'll undo our 'outline: none'
// in Global Styles.
const useTabListener = () => {
  function handleFirstTab(e: KeyboardEvent) {
    if (e.keyCode === 9) {
      document.body.classList.add('user-is-tabbing')
      window.removeEventListener('keydown', handleFirstTab)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab)
    return () => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])
}

export default useTabListener
