let currentZIndex = 50
let currentPriorityZIndex = 9999

export function useZIndex() {
  const getNextZIndex = (alwaysTop = false) => {
    if (alwaysTop) {
      currentPriorityZIndex += 1
      return currentPriorityZIndex
    }
    currentZIndex += 1
    return currentZIndex
  }
  
  return {
    getNextZIndex
  }
}
