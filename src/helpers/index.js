import {parse, formatISO, parseISO, format} from 'date-fns'
import es from 'date-fns/locale/es'


export const formatCurrency = price =>
    Number(price).toLocaleString('en-US',{
        style:'currency',
        currency:'USD'
    })

//change date to formtISO
export const convertToISO = (strDate)=>{
    const newDate = parse(strDate,'dd/MM/yyyy',new Date())
    return formatISO(newDate)
  }


export const displayedDate = (date)=>{
    const newDate = parseISO(date)
    return format(newDate,'PPPP',{locale:es})
}

export const convertToDDMMYYYY = (isoDate)=>{
    const newDate = new Date(isoDate)
    const formattedDate = format(newDate,'dd/MM/yyyy')
    return formattedDate
}