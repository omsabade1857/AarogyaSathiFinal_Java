export function isAuthenticated(){
    return getToken() ? true:false;
}
export function getId(){
    const id=sessionStorage.getItem('id');
    return id;
}
export function getToken(){
    const token=sessionStorage.getItem('token');
    if(token)
    return token;
else
return false;
}
export function logout(){
    sessionStorage.removeItem('patientId');
    sessionStorage.removeItem('doctorId');
    sessionStorage.removeItem('adminId');
}
