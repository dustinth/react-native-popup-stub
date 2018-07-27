/* global __DEV__ */
/*
 * print log in dev mode
*/

import { noop } from './shared'

function _log (info, isWarning) {
  if (isWarning) {
    console.warn('[popup]:', info)
  } else {
    console.log('[popup]:', info)
  }
}

const log = (typeof __DEV__ !== 'undefined' && __DEV__) ? _log : noop

export default log
