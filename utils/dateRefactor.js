
const dateRefactor = (date) =>{
    let TMPDate = new Date(date)
    return TMPDate.getFullYear() +"."+ (TMPDate.getMonth()+1) +"."+ TMPDate.getDate() +" "+ TMPDate.getHours() +":"+(TMPDate.getMinutes()<10?'0':'')+TMPDate.getMinutes()
}

export default dateRefactor