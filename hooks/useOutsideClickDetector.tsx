import { useEffect } from 'react'

function useOutsideClickDetector(
  containerRef: React.RefObject<HTMLElement>,
  handler: Function,
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const { target } = e
      if (containerRef.current && target && !containerRef.current.contains(target as Element)) {
        handler()
        e.stopPropagation()
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])
}

export default useOutsideClickDetector
