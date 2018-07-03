# react-native-popup-stub

[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Introduction

Popup global controller:

- Handle popup animations
- Remove old popup with the same `zIndex` automatically
- Make it easy to implement your own popup like Dialog, Toast, ActionSheet
- Support landscape and portrait automatically

Derived from @unpourtous/react-native-stub-toast/PopupStub.

Animation is based on [react-native-animatable](https://github.com/oblador/react-native-animatable)

### Demo
![demo](https://user-images.githubusercontent.com/1309744/30198225-2636557c-949f-11e7-8bda-b2a72b7ad91e.gif)

## Installation
```
npm install @unpourtous/react-native-popup-stub --save
```

## APIs

### Props

PopupStub properties

| param | type | description |
| --- | --- | --- |
| maskColor | String | mask color, default 'rgba(23,26,35,0.6)' |
| maskAnimatable | Boolean | whether enable mask animation, default false |
| orientation | Enum | deprecated, no need any more |

### PopupStub.init(ref)

Init PopupStub with PopupStub reference.

| param | type | description |
| --- | --- | --- |
| ref | ref | should be the PopupStub component reference |

### PopupStub.addPopup(element, option)

Add popup to PopupStub, use option to controller actions for each Component/Layers.

| param | type | description |
| --- | --- | --- |
| element | ReactElement | conent of popup |
| option | Object | see below, not required |

returns (String) unique id

#### option spec:
```
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
// can be closed on android back too.
// default true
autoClose: true,
// when locked, it will stop all clicks, like loading
lock: false,
// Android back event trigger, if not autoClose
onBackPress: undefined,
// whether to render this popup
// useful when you jump from pages but hold the popup status
// however, remember to close it afterwards
visible: true
// content animation
// animation: default animation
// closingAnimation: by default, reversed animation
// duration, direction, delay, etc.
```

### PopupStub.removePopup(id)

Invoke popup exiting animation and remove it on animation end

| param | type | description |
| --- | --- | --- |
| id | String | popup unique id |

## Example

First, add PopupStub as sibling node of your Root Node
``` js
export default class example extends Component {
  render () {
    return (
      <View style={styles.container}>
        {/* Your root node */}
        <TouchableHighlight
          onPress={() => {
            // Step three: Use Toast with static function
            Toast.show('This is a Toast')
            Toast.show('This is another Toast')
          }}>
          <Text>Show Toast</Text>
        </TouchableHighlight>

        {/* Step One: Add popup stub */}
        <PopupStub maskColor='rgba(0,0,0,0.75)' ref={_ref => {
          // Step Two: Init PopupStub itself
          if (_ref) PopupStub.init(_ref)
        }} />
      </View>
    )
  }
}
```

Then, just push your popup instance to PopupStub
```js
// Toast.js

export default class Toast extends Component {
  static show (msg) {
    const id = PopupStub.addPopup(<Toast msg={msg} />, {
      mask: false,
      position: 'center',
      zIndex: 500,
      delay: 0,
      duration: 100,
      animation: 'fadeIn',
      easing: 'ease'
    })
    // autoclose after 1.5s
    setTimeout(() => {
      PopupStub.removePopup(id)
    }, 1500)
  }

  render () {
    return (
      <View style={{backgroundColor: '#000', borderRadius: 5, padding: 15}}>
        <Text style={{color: '#fff', fontSize: 15}}>{this.props.msg}</Text>
      </View>
    )
  }
}
```

```js
// ActionSheet.js

export default class ActionSheet extends Component {
  static _id

  static show (choices) {
    ActionSheet._id = PopupStub.addPopup(<ActionSheet choices={choices} />, {
      mask: true,
      zIndex: 300,
      delay: 0,
      duration: 100,
      animation: {from: {translateY: 210}, to: {translateY: 0}},
      easing: 'ease',
      position: 'bottom',
      // or the same, 100% width at the bottom of screen
      // position: 'none',
      // wrapperStyle: {position: 'absolute', left: 0, right: 0, bottom: 0}
    })
  }

  static hide () {
    PopupStub.removePopup(ActionSheet._id)
  }

  render () {
    // as for demo, we ignore property choices here
    return (
      <View style={{backgroundColor: 'gray'}}>
        <View style={styles.btn}>
          <Text style={{fontSize: 16}}>Option 1</Text>
        </View>
        <View style={[styles.btn, styles.line]}>
          <Text style={{fontSize: 16}}>Option 2</Text>
        </View>
        <View style={[styles.btn, styles.line]}>
          <Text style={{fontSize: 16}}>Option 3</Text>
        </View>

        <View style={[styles.btn, {marginTop: 10}]}>
          <Text style={{fontSize: 16, color: 'gray'}} onPress={() => ActionSheet.hide()}>Cancel</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  line: {
    borderColor: '#ddd',
    borderTopWidth: 1
  }
})
```

## Todo

- [ ] Support popup life circle callback or so
- [ ] Use native animation api instead of react-native-animation

## License
All rights reserved.
