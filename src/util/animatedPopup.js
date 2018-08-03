/*
 * wrap popup element for animation
*/

import React from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'

export default function animatedPopup (popup, onAutoClose) {
  // Popups are independent to each other
  let pointerEvents = getPointerEvents(popup)

  return (
    <View
      key={popup.id}
      pointerEvents={pointerEvents}
      style={[
        StyleSheet.absoluteFill,
        popup.position === 'center' ? styles.posCenter : null
      ]}
    >
      {popup.mask ? <TouchableWithoutFeedback onPress={() => onAutoClose(popup)}>
        {popup._maskAnimatable
          ? <Animatable.View
              duration={popup.maskDuration}
              delay={popup._maskDelay}
              animation={popup._maskAnimation}
              style={StyleSheet.absoluteFill}
            />
          : <View style={[
              StyleSheet.absoluteFill,
              { backgroundColor: popup._maskColor }
            ]} />
        }
      </TouchableWithoutFeedback> : null}
      <Animatable.View
        delay={popup.delay}
        duration={popup.duration}
        direction={popup.direction}
        animation={popup._closing ? popup.closingAnimation : popup.animation}
        onAnimationEnd={popup.onAnimationEnd}
        easing={popup.easing}
        style={popup.wrapperStyle}
      >
        {popup._element}
      </Animatable.View>
    </View>
  )
}

// map popup status to pointerEvents
function getPointerEvents (popup) {
  if (popup._closing) {
    // all touches will be blocked, this will prevent double click
    return 'box-only'
  }
  if (popup.mask) {
    return popup.autoClose ? 'auto' : 'box-none'
  } else {
    return popup.lock ? 'box-only' : 'box-none'
  }
}

const styles = StyleSheet.create({
  posCenter: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
