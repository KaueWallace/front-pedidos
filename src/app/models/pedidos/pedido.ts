import { Endereco } from "./endereco";
import { ItemPedido } from "./itemPedido";
import { UsuarioResumo } from "./usuarioResumo";

export interface Pedido {
    id: number;
    dataPedido: string;
    valorTotal: number;
    status: string;
    itens: ItemPedido[];
    usuario: UsuarioResumo;
    endereco: Endereco;
}