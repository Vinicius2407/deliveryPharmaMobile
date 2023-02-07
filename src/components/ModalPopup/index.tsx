import { Modal } from "react-native";
import { X } from "phosphor-react-native";
import { styles } from "../../globals/styles.global";
import { ModalBody, ModalCloseButton, ModalContainer, ModalContent, ModalHeader } from "./styles";

interface ModalPopupProps {
    modalVisible: boolean;
    setModalVisible: (modalVisible: boolean) => void;
    children: React.ReactNode;
}

export function ModalPopup({ modalVisible, setModalVisible, children }: ModalPopupProps) {
    return(
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <ModalContainer>
                <ModalBody>
                    <ModalHeader>
                        <ModalCloseButton onPress={() => setModalVisible(!modalVisible)}>
                            <X size={26} color={styles.colors.heading} weight="bold"/>
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalContent>
                        { children }
                    </ModalContent>
                </ModalBody>
            </ModalContainer>
        </Modal>
    )
}