import axios from "axios";
import { BASE_URL } from "./APIconstants";
import { getId, getToken } from "./TokenUtil";

//Patient
export async function savePatient(userData){
    try {
        const response=await axios.post(`${BASE_URL}/signup`,userData);
        console.log(response);
        return response.data;
    } catch (error) {
        if (error.response.status === 406) {
            throw new Error("Email is already registered");
        } else {
            console.log(error);
        }
    }
}

//Patient
export async function getUserProfile(){
    try{
        console.log(getId() + getToken());
        const obj = await axios.get(`${BASE_URL}/patient/profile/${getId()}`,{headers:{'Authorization':`Bearer ${getToken()}`}});
        return obj.data;
        
    }
    catch(error){
        console.log(error);
    }
    
}

//Patient
export async function login(credentials){
    const response=await axios.post(`${BASE_URL}/login`,credentials);
    return response.data;
} 

export async function getPatientBookings(){
    try{
        const response = await axios.get(`${BASE_URL}/patient/appointments/${getId()}`,{headers:{'Authorization':`Bearer ${getToken()}`}});
        console.log(response);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}
//for admin login
export async function adminLogin(credentials){
    const response=await axios.post(`${BASE_URL}/admin/login`,credentials);
    return response.data;
} 


export async function PatientServices(){
    try{
        const response= await axios.get(`${BASE_URL}/patientlist`,{headers:{'Authorization':`Bearer ${getToken()}`}});
        return response;
    }
    catch(error){
        console.log(error);
    }
}

export async function getPatientHistory(){
    try{
        const response = await axios.get(`${BASE_URL}/history/${getId()}`,{headers:{'Authorization':`Bearer ${getToken()}`}});
        console.log(response);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

//admin
export async function updateUserProfile(patientId, updatedPatient) {
    try {
      console.log(updatedPatient);
        const response = await axios.put(`${BASE_URL}/admin/patientupdate/${patientId}`, updatedPatient,{headers:{'Authorization':`Bearer ${getToken()}`}});
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
//patient
export async function updatePatientProfile( updatedPatient) {
    try {
      console.log(updatedPatient);
        const response = await axios.put(`${BASE_URL}/patient/update/${(getId())}`, updatedPatient,{headers:{'Authorization':`Bearer ${getToken()}`}});
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export const updatePassword = async ( passwordData) => {
    try {
        const response = await axios.put(`${BASE_URL}/patient/updatePassword/${getId()}`, passwordData,{headers:{'Authorization':`Bearer ${getToken()}`}});
        
        return response.data;
    } catch (error) {
        throw error;
    }

};


export async function deletePatientById(patientId) {
    try {
        const response = await axios.delete(`${BASE_URL}/admin/patientdelete/${patientId}`,{headers:{'Authorization':`Bearer ${getToken()}`}});
        return response;
    } catch (error) {
        console.log(error);
    }
};

export async function adminSignup(adminData) {
    console.log(adminData);
    try {
        const response = await axios.post(`${BASE_URL}/adminsignup`, adminData, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};