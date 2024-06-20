import React from 'react'
import ReactModal from 'react-modal'
import clsx from 'clsx'

import styles from './index.module.css'

let instanceModalComponent: ModalComponent | null = null
const DEFAULT_STATES = {
  modals: [],
}

export enum ModalPositionEnum {
  DEFAULT = 'default',
  TOP = 'top',
  CENTER = 'center',
}
export interface ModalOptions extends Omit<ReactModal.Props, 'isOpen'> {
  position?: `${ModalPositionEnum}`
  containerClassName?: string; // Added containerClassName prop for custom class names of the modal container
}
export type ModalProps = {
  local?: boolean
}
type ModalState = {
  modals: {
    options: ModalOptions
    containerClassName?: string; // Added containerClassName prop for custom class names of the modal container
    component: React.ReactNode
    visible: boolean
    id: string
  }[]
}

export class ModalComponent extends React.PureComponent<ModalProps, ModalState> {
  static setAppElement = ReactModal.setAppElement; // Expose setAppElement method

  constructor(props: ModalProps) {
    super(props)
    this.state = DEFAULT_STATES
  }

  componentDidMount() {
    ReactModal.setAppElement('body'); // Set app element to prevent screen readers from reading background content
    instanceModalComponent = this
  }

  componentWillUnmount() {
    instanceModalComponent = null
  }

  clearModal = (hideId?: string) => {
    // Clear the modal from the state and call onAfterClose if provided
    if (!hideId) {
      return
    }

    this.setState((state) => {
      const modals = state.modals.filter((modal) => {
        if (modal.id === hideId && typeof modal.options?.onAfterClose === 'function') {
          // Call onAfterClose callback if it exists
          modal.options?.onAfterClose()
        }
        return modal.id !== hideId
      })
      return {
        ...state,
        // Update the state with the filtered modals
        modals,
      }
    })
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  hide = (id?: string) => {
    // Hide the modal with the given id or the last one if no id is provided
    const { modals } = this.state
    let newModals = modals
    if (id) {
      newModals = modals.map((modal) => {
        if (modal.id === id) {
          // Set the visible property to false to hide the modal
          return { ...modal, visible: false }
        }
        return modal
      })
    } else if (modals?.[modals.length - 1]) {
      modals[modals.length - 1].visible = false
      // Hide the last modal if no id is provided
      newModals = modals
    }
    this.setState({
      modals: [...newModals],
    })
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  show = (component: React.ReactNode, options: ModalOptions) => {
    // Show a new modal with the given component and options
    const { modals } = this.state
    const modalId = `${Date.now()}`
    this.setState({
      modals: [...modals, { component, options, visible: true, id: modalId }],
    })
    // Return the id of the new modal
    return modalId
  }

  render() {
    const { modals } = this.state

    return (
      // Render all modals in the state
      <>
        {modals.map((modal) => {
          const modalPosition = modal.options.position || ModalPositionEnum.DEFAULT
          return (
            <ReactModal
              // Set the modal's position and other options
              key={modal.id}
              overlayClassName={styles.Overlay}
              className={clsx(styles.Modal, {
                [styles.ModalTop]: modalPosition === ModalPositionEnum.TOP,
                [styles.ModalCenter]: modalPosition === ModalPositionEnum.CENTER,
                [styles.ModalDefault]:
                  // Use the default position if no position is provided
                  modalPosition === ModalPositionEnum.DEFAULT || !modal.options.position,
                [modal.options.containerClassName || '']: !!modal.options.containerClassName, // Apply custom container class name if provided
              })}
              isOpen={modal?.visible}
              onRequestClose={() => this.hide(modal.id)}
              onAfterClose={() => this.clearModal(modal.id)}
              style={{
                // Apply custom styles if provided
                overlay: {
                  ...modal.options.style?.overlay,
                },
                content: {
                  ...modal.options.style?.content,
                },
              }}
              // Spread the rest of the modal options
              {...modal.options}
            >
              {modal.component}
            </ReactModal>
          )
        })}
      </>
    )
  }
}

export const Modal = {
  show(component: React.ReactNode, modalOptions: ModalOptions = {}) {
    return instanceModalComponent?.show(component, modalOptions)
  },
  hide(id?: string) {
    instanceModalComponent?.hide(id)
  },
}