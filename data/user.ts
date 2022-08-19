import { applyIncludes, makeRequest, TypedResult } from "../types/TypedResult";

export type UserInfo = {
    id:string;
}

export const getCurrentUser = async (token: string) : Promise<TypedResult<UserInfo>> =>{
    var url = applyIncludes(`https://localhost:5001/api/appusers/me`,[]);
    var result = await makeRequest<UserInfo>(token, url,"get",null);
    return result;
}
