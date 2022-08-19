import { applyIncludes, makeRequest, TypedResult } from "../types/TypedResult";
import { ParticipantTypeDTO } from "./participantType";

export type GetDebateParticipantDTO = {
    appUserId:string;
    debateId:string;
    participantType:ParticipantTypeDTO;
}

export type PostDebateParticipantDTO= {
    appUserId?:string;
    appUserEmail?:string;
    debateId?:string;
    participantTypeId:number;
}

export const getDebateParticipants = async (token:string, debateId:string) : Promise<TypedResult<GetDebateParticipantDTO>> =>{
    var url = applyIncludes(`https://localhost:5001/api/debates/${debateId}/participants/list`,[]);
    var result = await makeRequest<GetDebateParticipantDTO>(token, url,"get",null);
    return result;
}