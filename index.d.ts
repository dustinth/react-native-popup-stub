import react, { Component, ReactElement } from 'react'

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
  onPressBack?: (id: UUID) => boolean;
  visible?: boolean;
  // style related
  position?: 'center' | 'none' | 'top' | 'right' | 'bottom' | 'left';
  wrapperStyle?: object;
  // lifecycle
  onAdded?: Function;
  onClosed?: Function;
}

export type PopupInstance = PopupStubOption & {
  // if is closing
  _closing?: boolean;
  // react element
  _element: ReactElement<any>;
}

interface PopupStupProps {
  // Ref handler
  ref: (o: React.Ref<PopupStubStatic>) => void;
  // mask color for all popups
  maskColor?: string;
  // whether enable mask animation
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
  */
  removeAll (filter?: (o: PopupInstance, i: number) => boolean): void;
}

declare var PopupStub: PopupStubStatic

export { PopupStub }
