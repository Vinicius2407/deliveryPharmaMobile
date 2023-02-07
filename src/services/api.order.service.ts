// import { Alert } from "react-native";
// import { api } from "./api.service";

// export const addNewOrder = async(order: any) => {
//     try {
//         /*const { data } = await api.post('venda/add_with_image', order, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         })*/
//         const { data } = await api.post('venda/add', order)
//         Alert.alert('Pedido', 'Pedido realizado com succeso.') 
//     } catch (error: any) {
//         console.log(error.message)
//         Alert.alert('Pedido', 'Não foi possivel realizar o pedido.')
//     }
// }