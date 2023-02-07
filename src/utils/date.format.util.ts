import { format, } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatDate(date: Date) {
    const formattedDate = format(date, "eeee'.' dd/MM/yyyy", {
        locale: ptBR
    })
    return formattedDate
}

export function formatDateAndTime(date: Date) {
    const formattedDate = format(date, "dd/MM/yyyy 'às' HH'h'mm'm'", {
        locale: ptBR,
    })

    return formattedDate
}
