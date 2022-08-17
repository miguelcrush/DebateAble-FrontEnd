import { makeRequest, TypedResult } from "../../types/TypedResult";

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

export const postDebate = async (debate: PostDebateDTO, token: string, includes:DebateIncludes[]) : Promise<TypedResult<GetDebateDTO>> =>{
    var url = applyIncludes('https://localhost:5001/api/debates', includes);
    var result = await makeRequest<GetDebateDTO>(token,url, "post", debate);
    return result;
}

export const getDebate = async (debateId:string, token: string, includes:DebateIncludes[]) : Promise<TypedResult<GetDebateDTO>> =>{
    var url = applyIncludes(`https://localhost:5001/api/debates/${debateId}`, includes);
    var result = await makeRequest<GetDebateDTO>(token, url,"get",null);
    return result;
}

export const getDebates = async (token:string, includes:DebateIncludes[]) : Promise<TypedResult<GetDebateDTO[]>> =>{
    var url = applyIncludes(`https://localhost:5001/api/debates/list`, includes);
    var result = await makeRequest<GetDebateDTO[]>(token, url, "get", null);
    return result;
}

const applyIncludes = (url:string, includes:DebateIncludes[]): string =>{
    if(!includes){
        return url;
    }
    for(var i = 0; i<includes.length; i++){
        if(url.indexOf("?")>-1){
            url += `&includes=${includes[i]}`;
        }
        else{
            url += `?includes=${includes[i]}`;
        }
    }

    return url;
}