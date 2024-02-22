import axios from "axios";
import { BASE_URL } from "./APIconstants";
import { getId, getToken } from "./TokenUtil";

export async function doctorList() {
  try {
    const response = await axios.get(`${BASE_URL}/patient/doctorlist`,{headers:{'Authorization':`Bearer ${getToken()}`}});
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function DoctorServices() {
  try {
    const response = await axios.get(`${BASE_URL}/admin/doctorlist`,{headers:{'Authorization':`Bearer ${getToken()}`}});
    return response;
  } catch (error) {
    console.log(error);
  }
}

//Doctor Login
export async function doctorLogin(credentials) {
  const response = await axios.post(`${BASE_URL}/doctor/login`, credentials);
  return response.data;
}
//Doctor Profile
export async function getDoctorProfile() {
  try {
    const response = await axios.get(`${BASE_URL}/doctor/profile/${getId()}`,{headers:{'Authorization':`Bearer ${getToken()}`}});
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function BookAppointment(booking) {
  try {
    console.log(booking);
    const response = await axios.post(`${BASE_URL}/patient/appointment`,booking,{headers:{'Authorization':`Bearer ${getToken()}`}});
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateAppointment(updatedRec, appId) {
  try {
        const response = await axios.put(`${BASE_URL}/patient/appointment/updateDate/${appId}`,updatedRec,{headers:{'Authorization':`Bearer ${getToken()}`}}
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteAppointment(appId) {
  try {
    const response = await axios.delete(`${BASE_URL}/patient/appointment/delete/${appId}`,{headers:{'Authorization':`Bearer ${getToken()}`}});
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getBookingsByDoctorId() {
  try {
    const response = await axios.get(
      `${BASE_URL}/doctor/appointments/${getId()}`,{headers:{'Authorization':`Bearer ${getToken()}`}});
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateDoctorProfile(doctorId, formData) {
  try {
    const response = await axios.put(
      `http://localhost:8080/admin/doctorupdate/${doctorId}`,
      formData,{headers:{'Authorization':`Bearer ${getToken()}`}});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function acceptAppointment(appointmentId) {
  try {
    // console.log(getToken());
    // console.log(appointmentId);
    const response=await axios.put(`http://localhost:8080/doctor/accept/${appointmentId}`,null ,{headers:{'Authorization':`Bearer ${getToken()}`}})
      console.log(response);
    return response;
  } catch (error) {
    console.error("Error accepting appointment:", error);
    console.log("inside error");
  }
}
export async function rejectAppointment(appointmentId) {
  try {
    const response = await axios.put(
      `http://localhost:8080/doctor/reject/${appointmentId}`,null, {headers:{'Authorization':`Bearer ${getToken()}`}});
    console.log(response.data);
    return response.data; // Assuming the response contains some relevant data
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    throw error; // Rethrow the error to handle it in the component
  }
}

export async function deleteDoctorById(doctorId) {
  console.log(doctorId);
  try {
      const response = await axios.delete(`${BASE_URL}/admin/doctordelete/${doctorId}`,{headers:{'Authorization':`Bearer ${getToken()}`}});
      console.log(response);
      return response;
  } catch (error) {
      console.log(error);
  }
};

export async function addDoctor(userData){
  try {
    let url = `http://localhost:8080/admin/doctorsignup`;
      const response=  await axios.post(url,userData,{headers:{'Authorization':`Bearer ${getToken()}`}});
      console.log(response);
      return response.data;
  } catch (error) {
      if (error.response.status === 406) {
          throw new Error("Email is already registered");
      } else {
          console.log(error);
      }
  }
};
export const updatePassword = async (passwordData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/doctor/updatePassword/${getId()}`,
      passwordData,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    console.log(response);

    return response.data;
  } catch (error) {
    throw error;
  }
};