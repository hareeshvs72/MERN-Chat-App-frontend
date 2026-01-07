import commonApi from "./commonApi"
import SERVERURL from "./ServerUrl"


export const signUpAPi = async(reqBody)=>{
  return await  commonApi("POST",`${SERVERURL}/signUp-user`,reqBody)
}

export const loginAPI = async(reqBody)=>{
  return await  commonApi("POST",`${SERVERURL}/logIn-user`,reqBody)
}