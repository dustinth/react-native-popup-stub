import react, { Component, ReactElement } from 'react'
import { ViewStyle } from 'react-native'

type UUID = string
export type saferObject = Record<string, unknown>
export type SaferFunc = (...args: unknown[]) => unknown

export type PopupConfigOption = {
  // Default 1
  zIndex: number;
  // Default 1000
  duration?: number;
  // Default false
  autoClose?: boolean;
  // Default false
  lock?: boolean;

  // Default true
  mask?: boolean;
  maskAnimatable?: boolean
  // Default 100
  maskDuration?: number;

  // Default true
  visible?: boolean;
  // Default 'center'
  position?: 'center' | 'none' | 'top' | 'right' | 'bottom' | 'left';
  
  wrapperStyle?: ViewStyle;
  maskColor?: string

  onAdded?: SaferFunc;
  onClosed?: SaferFunc;

  direction?: 'normal' | 'reverse' | 'alternate'| 'alternate-reverse';

  animation?: string | object;
  closingAnimation?: string | object;

  easing?: string;
  delay?: number;
}

export type PopupStubOption = PopupConfigOption & {
  id?: UUID;
}

export type PopupInstance = PopupStubOption & {
  _closing?: boolean;
  _element: ReactElement<any>;
}

interface PopupStupProps {
  ref: (o: React.Ref<PopupStubStatic>) => void;
  maskColor?: string;
  maskAnimatable?: boolean;
}

interface PopupStubStatic extends Component<PopupStupProps> {
  /*
   * Ref. Do Not Use It Directly.
  */
  stub: React.Ref<PopupStubStatic>;

  /**
   * Initialize PopupStub instance
   *
   * This static method **MUST** be called once before any other methods of PopupStub is called. e.g:
   * <PopupStub ref={ref => if (ref) PopupStub.init(ref)} />
   *
   */
  init (ref: React.Ref<PopupStubStatic>): void;

  /**
   * Return true if any popup is displaying, otherwise return false
   * Will always skip unvisible popups
   *
   * @param filter - return true as isShow
   */
  isShow (filter?: (o: PopupInstance) => boolean): boolean;

  /**
   * Create an unique id with UUID algorithm
   */
  getNewId (): UUID;

  /**
   * Show popup to display passed in content view according to options
   *
   * @param element - Any react element
   * @param option
   * @returns an unique id to indentify the new PopupStub element
   */
  addPopup (element: ReactElement<any>, option?: PopupStubOption): UUID;

  /**
   * Remove specified popup with animation
   *
   * @param id
   * @param forceUpdate - default true
   */
  removePopup(id?: UUID, forceUpdate?: boolean): void;

  /**
   * Remove specified popup immediately
   */
  removePopupImmediately(id?: UUID): boolean;

  /**
   * Reset property of specified popup
   */
  resetPopupProperty(id?: UUID, key?: string, value?: any): void;

  /*
   * Remove popups by filter
   *
   * @param filter - return true to remove
  */
  removeAll (filter?: (o: PopupInstance) => boolean): void;
}

declare var PopupStub: PopupStubStatic

export { PopupStub }
