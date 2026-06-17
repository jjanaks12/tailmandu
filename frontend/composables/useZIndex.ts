let currentZIndex = 50

export function useZIndex() {
  const getNextZIndex = () => {
    currentZIndex += 1
    return currentZIndex
  }
  
  return {
    getNextZIndex
  }
}
