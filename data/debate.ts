import { applyIncludes, makeRequest, TypedResult } from "../types/TypedResult";

export type GetDebateDTO = {
    title: string;
    description:string;
    id:string;
    slug:string;
  }

export type PostDebateDTO ={
    title: string;
    description:string;
}

export enum DebateIncludes {
    None= "None",
    Posts = "Posts",
    Comments = "Comments",
    Participants = "Participants",
    ResponseRequests = "ResponseRequests"
}

export const postDebate = async (debate: PostDebateDTO, token: string, includes:any[]) : Promise<TypedResult<GetDebateDTO>> =>{
    console.log(includes);
    var url = applyIncludes('https://localhost:5001/api/debates', includes);
    console.log(url);
    var result = await makeRequest<GetDebateDTO>(token,url, "post", debate);
    return result;
}

export const getDebate = async (debateId:string, token: string, includes:any[]) : Promise<TypedResult<GetDebateDTO>> =>{
    var url = applyIncludes(`https://localhost:5001/api/debates/${debateId}`, includes);
    var result = await makeRequest<GetDebateDTO>(token, url,"get",null);
    return result;
}

export const getDebates = async (token:string, includes:any[]) : Promise<TypedResult<GetDebateDTO[]>> =>{
    var url = applyIncludes(`https://localhost:5001/api/debates/list`, includes);
    var result = await makeRequest<GetDebateDTO[]>(token, url, "get", null);
    return result;
}

