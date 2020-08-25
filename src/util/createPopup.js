/*
 * Create a new popup from options
*/
import uuidV1 from 'uuid/v1'
import createWrapperStyle from './createWrapperStyle'
import log from './log'
import { falseValue } from './shared'

const DEFAULT_PROPS = {
  // priority of each popup in PopupStub
  // name 'priority' might be better
  zIndex: 1,
  // animation related
  duration: 1000,
  // default 'none' might be better?
  position: 'center',
  // has a visual mask or not
  mask: true,
  // duration of mask animation (if enabled)
  maskDuration: 100,
  // enable clicking mask to close or not,
  // default false to avoid unintended closing.
  // (But will always be closed on android back key).
  autoClose: false,
  // when locked, it will stop all clicks, like loading
  lock: false,
  // whether to render this popup
  // useful when you jump from pages but hold the popup status
  // however, remember to close it afterwards
  visible: true
  // content animation
  // animation: default animation
  // closingAnimation: by default, reversed animation
  // duration, direction, delay, etc.
}

export default function createPopup (element, option, props) {
  let popup = {
    ...DEFAULT_PROPS,
    ...option,
    _element: element,
    _maskColor: option.maskColor || props.maskColor,
    _maskAnimatable: props.maskAnimatable
  }

  popup.id = popup.id || uuidV1()

  // reset wrapperStyle
  popup.wrapperStyle = createWrapperStyle(popup.wrapperStyle, popup.position)

  // mask animation
  if (popup._maskAnimatable) {
    popup._maskDelay = 0
    popup._maskAnimation = {
      from: {backgroundColor: 'rgba(0,0,0,0)'},
      to: {backgroundColor: props.maskColor}
    }
    if (popup.maskDuration > popup.duration) {
      popup.maskDuration = popup.duration
    }
  }

  return popup
}
