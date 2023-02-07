import { Eye } from 'phosphor-react-native';
import { useState, useEffect } from 'react'
import { Alert, Image, ModalProps, TouchableOpacityProps } from 'react-native';
import { api } from '../../services/api.service';
import { ModalPopup } from '../ModalPopup'
import { ShowRecipe } from './styles'

interface DownloadRecipeProps extends TouchableOpacityProps, ModalProps {
    arquivo: string;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export function DownloadRecipe({ arquivo, modalVisible, setModalVisible, ...props }: DownloadRecipeProps) {
    const [imageBase64, setBase64Image] = useState<string | null>(null);
    
    useEffect(() => {
        async function downloadRecipe() {
            try {
                if(!!arquivo && arquivo.length < 10) throw new Error()
                
                const { data } = await api.get<Blob>(`download/${arquivo}`, {responseType: 'blob'})
        
                const reader = new FileReader();
                
                reader.readAsDataURL(data);
                reader.onloadend = function () {
                    let base64String = reader.result as string;
                    let imageBase64 = base64String.replace('data:application/octet-stream;base64,', 'data:image/jpg;base64, ')
                    setBase64Image(imageBase64)
                }
        
            } catch (error : any) {
                console.log(error.message)
                Alert.alert('Receita', 'Erro ao baixar a imagem da receita!')
            }
        }
        downloadRecipe()
    }, [])

    return(
        <ModalPopup modalVisible={modalVisible} setModalVisible={setModalVisible} {...props}>
            {imageBase64 && <Image source={{ uri: imageBase64 }} style={{ width: '100%', height: 200 }} resizeMode='contain'/>}
        </ModalPopup>
    )
}