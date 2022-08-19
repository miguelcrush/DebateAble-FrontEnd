import internal from "stream";
import { applyIncludes, makeRequest, TypedResult } from "../types/TypedResult";

export type ParticipantTypeDTO = {
    id:number;
    name: string;
    canPost: boolean;
    canComment: boolean;
    canView:boolean;
}

export const getParticipantTypes = async (token:string) : Promise<TypedResult<ParticipantTypeDTO[]>> =>{
    var url = applyIncludes(`https://localhost:5001/api/participantTypes/list`,[]);
    var result = await makeRequest<ParticipantTypeDTO[]>(token, url,"get",null);
    return result;
}