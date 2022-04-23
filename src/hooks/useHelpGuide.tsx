import Driver from 'driver.js'
import {storageHelper} from '../utils/storageHelper';
import 'driver.js/dist/driver.min.css';

export function showHelpGuideFunction({steps, onClose, delay = 1000}) {
  setTimeout(() => {
    const driver = new Driver({
      animate: false, // Whether to animate or not
      // opacity: 0,
      allowClose: false, // Whether the click on overlay should close or not
      overlayClickNext: true, // Whether the click on overlay should move next
      doneBtnText: 'Done', // Text on the final button
      closeBtnText: 'Skip', // Text on the close button for this step
      // stageBackground: '#ffffff', // Background color for the staged behind highlighted element
      nextBtnText: 'Next', // Next button text for this step
      prevBtnText: 'Previous', // Previous button text for this step
      keyboardControl: false, // Allow controlling through keyboard (escape to close, arrow keys to move)
      // onNext: (Element) => {},
      onHighlightStarted: (Element) => {
        const node = Element.getNode() as HTMLElement
        node.scrollIntoView(false)
      },
      onDeselected: (Element) => {
        console.log('onDeselected')
        if (!driver.isActivated) {
          onClose()
        }
      },
    })

    driver.defineSteps(steps)

    driver.start()
  }, delay)
}

export function useHelpGuide(storageKey, steps) {
  async function showHelpGuide() {
    const data = await storageHelper.getNativeStorage(storageKey)
    if (data?.data !== true) {
      return new Promise((resolve, reject) => {
        showHelpGuideFunction({
          steps,
          onClose: () => {
            storageHelper.setNativeStorage(storageKey, true).then(() => {
              const el = document.getElementsByTagName('ion-content')
              //@ts-ignore
              // el.scrollToTop()
              resolve(true)
            })
          },
          delay: 200,
        })
      })
    }
    return null
  }

  return {showHelpGuide}
}
