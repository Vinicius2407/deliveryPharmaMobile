/* Interfaces com prefixo 'I' representam dados provindos do banco*/
export interface IUser {
    id: string;
    nome: string;
    celular: string;
    cpf: string | undefined;//null
    crf: string | undefined;//null
    usuarioTipo: string;
    username: string;
    password: string;
}

export interface IAddress {
    id: string;
    cep: string;
    descricao: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    observacao: string | null;
}

export interface IProduct {
    id: string | number;
    nome: string;
    descricao: string,
    categoria: {
        descricao: string,
        id: number,
    },
    imagem: string | null,
    formula: string | null,
    conteudo: string | null,
    fabricante: string,
    precisa_receita: boolean,
    precisa_recolher_receita: boolean | null,
    valor_unitario: number
    uso: string,
    bula: string | null,
    dh_registro: null,
}

export interface IVenda {
    id: number;
    valor_produtos: number;
    valor_frete: number;
    valor_total: number;
    nome_entregador: string | null;
    telefone_entregador: string | null;
    dh_registro: Date | null;
    receitas: IRecipe[] | null;
    itens: [{
        id: number;
        quantidade: number;
        valor_unitario: number;
        valor_total: number;
        produto: IProduct
    }];
    cliente: IUser;
    endereco: IAddress;
    farmaceutico: IUser | null;
    status: 'SOLICITADA' | 'SEPARACAO' | 'REPROVADA' | 'ENTREGA' | 'CONCLUIDA';
}

export interface IVendaAtualizacao {
    id: number;
    status: 'SOLICITADA' | 'SEPARACAO' | 'REPROVADA' | 'ENTREGA' | 'CONCLUIDA';
    dh_atualizacao: Date;
    observacao: string;
}


export interface IRecipe {
    id: number;
    arquivo: string;
}

export interface ProductDataBackend {
    bula: string | null,
    categoria: {
        descricao: string,
        id: number,
    },
    conteudo: string | null,
    descricao: string,
    dh_registro: null,
    fabricante: string,
    formula: string | null,
    id: number,
    imagem: string | null,
    nome: string,
    precisa_receita: boolean,
    precisa_recolher_receita: boolean,
    uso: string,
    valor_unitario: number
}

export interface ICategory {
    id: number;
    descricao: string;
}

export interface CartProductItem {
    id: number;
    nome: string;
    imagem: string | null;
    valor_unitario: number;
    quantidade: number;
    precisa_receita: boolean;
    precisa_recolher_receita: boolean | null;
    // valor_total: number;
}

export interface AddressBackendProps {
    id?: string;
    cep: string;
    descricao: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    principal: boolean;
    observacao: string;
}

export interface OrderItemProps {
    id: number;
    item: string;
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
    produto: IProduct;
}

export interface OrderProps {
    id: number;
    dh_registro: Date;
    valor_total: number;
    valor_frete: number;
    valor_produtos: number;
    status: string;
    endereco: IAddress;
    cliente: IUser;
    farmaceutico: { id: number; } | null;
    itens: OrderItemProps[];
    receitas: IRecipe[] | []
}

export interface OrderCompleteProps {
    id: number;
    dh_registro: Date;
    valor_total: number;
    status: string;
    endereco: IAddress;
    cliente: {
        id: number;
    }
    farmaceutico: { id: number; } | null;
    itens: OrderItemProps[]
}