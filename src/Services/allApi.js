import commonApi from "./commonApi"
import SERVERURL from "./ServerUrl"


export const signUpAPi = async(reqBody)=>{
  return await  commonApi("POST",`${SERVERURL}/signUp-user`,reqBody)
}

export const loginAPI = async(reqBody)=>{
  return await  commonApi("POST",`${SERVERURL}/logIn-user`,reqBody)
}

export const getUserForSidebarAPI = async(reqHeader)=>{
  return await  commonApi("GET",`${SERVERURL}/sidebar`,{},reqHeader)
}

export const sendMessageApi = async(reqBody,reqHeader)=>{
  return await  commonApi("POST",`${SERVERURL}/send`,reqBody,reqHeader)
}

export const getMessageApi = async(reciverId,reqHeader)=>{
  return await  commonApi("GET",`${SERVERURL}/${reciverId}`,{},reqHeader)
}