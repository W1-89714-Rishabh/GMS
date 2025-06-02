function apiResult(Status,data,message){
    return{Status,data,message}
}
function apiSuccess(data){
    return {Status:"Success",data:data}
}
function apiError(msg){
    return{Status:"Error",message:msg}
}
module.exports={apiResult,apiError,apiSuccess}