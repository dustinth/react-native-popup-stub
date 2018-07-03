import react, { PureComponent, ReactElement } from 'react'
import { ViewProperties } from 'react-native'

type UUID = string

export type PopupStubOption = {
  id?: UUID;
  // priority
  zIndex: number;
  // animation related
  animation?: string | object;
  closingAnimation?: string | object;
  delay?: number;
  duration?: number;
  direction?: 'normal' | 'reverse' | 'alternate'| 'alternate-reverse';
  easing?: string;
  // interactive related
  autoClose?: boolean;
  lock?: boolean;
  mask?: boolean;
  maskDuration?: number;
  onBackPress?: FunctionConstructor;
  visible?: boolean;
  // style related
  position?: 'center' | 'none' | 'top' | 'right' | 'bottom' | 'left';
  wrapperStyle?: object;
}

interface PopupStupProps extends ViewProperties {
  // mask color for all popups
  maskColor?: string;
  // whether enable mask animation
  maskAnimatable?: boolean;
}

interface PopupStubStatic extends PureComponent<PopupStupProps> {
  /*
   * Ref. Do Not Use It Directly.
  */
  sub: React.Ref<PopupStubStatic>;

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
   *
   * @param ignoreClosing - default false
   */
  isShow (ignoreClosing?: boolean): boolean;

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
}

declare var PopupStub: PopupStubStatic

export { PopupStub }
