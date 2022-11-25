import { applyIncludes, makeRequest, TypedResult } from "../types/TypedResult";
import { GetAppUserDTO } from "./appUser";
import { ParticipantTypeDTO } from "./participantType";

export type GetDebateParticipantDTO = {
    appUserId:string;
    debateId:string;
    participantType:ParticipantTypeDTO;
    appUser: GetAppUserDTO;
}

export type PostDebateParticipantDTO= {
    appUserId?:string;
    appUserEmail?:string;
    debateId?:string;
    participantType: ParticipantTypeEnum;
}

export enum ParticipantTypeEnum {
    Debater = 1,
    Commenter = 2,
    Viewer = 3
}

export const getDebateParticipants = async (token:string, debateId:string) : Promise<TypedResult<GetDebateParticipantDTO>> =>{
    var url = applyIncludes(`https://localhost:5001/api/debates/${debateId}/participants/list`,[]);
    var result = await makeRequest<GetDebateParticipantDTO>(token, url,"get",null);
    return result;
}