import type { NextApiRequest, NextApiResponse } from 'next'
import {authOptions} from '../auth/[...nextauth]';
import {unstable_getServerSession} from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { handleUnauthorized, TypedResult } from '../../../types/TypedResult';
import { getCurrentUser, UserInfo } from '../../../data/user';
import { getParticipantTypes, ParticipantTypeDTO } from '../../../data/participantType';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TypedResult<ParticipantTypeDTO[]>>
) 
{
    var token = await getToken({req});
    if(!token){
        await handleUnauthorized(res);
        return;
    }

    if(req.method?.toLowerCase() == "get"){
        var result = await getParticipantTypes(token.accessToken as string)
        res.status(result.statusCode).json(result);
    }
    else{
        return res.status(415).write("unsupported method");
    }
}