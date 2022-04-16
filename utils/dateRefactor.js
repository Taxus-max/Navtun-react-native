
const dateRefactor = (date) =>{
    let TMPDate = new Date(date)
    return TMPDate.getUTCFullYear() +"."+ (TMPDate.getUTCMinutes()+1) +"."+ TMPDate.getUTCDate() +" "+ TMPDate.getUTCHours() +":"+(TMPDate.getUTCMinutes()<10?'0':'')+TMPDate.getUTCMinutes()
}

export default dateRefactor