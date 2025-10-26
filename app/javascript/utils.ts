export const observeMutationsUntilConditionMet = (element: Element, condition: () => boolean, body: () => void) => {
  if (condition()) {
    body()
  } else {
    const mutationObserver = new MutationObserver(() => {
      if (condition()) {
        body()
        mutationObserver.disconnect()
      }
    })

    mutationObserver.observe(element, {childList: true, subtree: true})
  }
}
