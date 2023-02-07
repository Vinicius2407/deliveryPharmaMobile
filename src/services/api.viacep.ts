import axios from "axios";

export interface ViaCepProps {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
}

export async function consultarCEP(cep: string){
    try {
        const { data } = await axios.get<ViaCepProps>(`https://viacep.com.br/ws/${cep}/json/`)
        return data
    } catch (error: any) {
        console.log(error.message)
        return undefined;
    }
}