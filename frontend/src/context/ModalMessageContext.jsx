import { createContext, useContext, useState } from 'react' 

export const ModalMessageContext = createContext({
    showLogoutMessage: false,
    setShowLogoutMessage: () => {},
    typeModal: '',
    setTypeModal: () => {},
    messageModal: '',
    setMessageModal: () => {},

})

export default function ModalMessageContextProvider({ children }) {
    const [showLogoutMessage, setShowLogoutMessage] = useState(false)
    const [typeModal, setTypeModal] = useState('')
    const [messageModal, setMessageModal] = useState('')

    const openModal = (type, message) => {
        setShowLogoutMessage(true)
        setTypeModal(type),
        setMessageModal(message)
    }
    
    const closeModal = (duration=0) => {
        setTimeout(() => {
            setShowLogoutMessage(false)
            setTypeModal(''),
            setMessageModal('')

}, duration)
    }

    const valueModalMessageContext = {
        showLogoutMessage,
        setShowLogoutMessage,
        closeModal,
        openModal,
        typeModal,
        setTypeModal,
        messageModal,
        setMessageModal,
    }


    return <ModalMessageContext.Provider 
            value={valueModalMessageContext}>
                {children}
        </ModalMessageContext.Provider>

}

export const useModalMessageContext = () => useContext(ModalMessageContext)

