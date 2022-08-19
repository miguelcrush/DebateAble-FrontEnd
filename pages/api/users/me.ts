import type { NextApiRequest, NextApiResponse } from 'next'
import {authOptions} from '../auth/[...nextauth]';
import {unstable_getServerSession} from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { handleUnauthorized, TypedResult } from '../../../types/TypedResult';
import { getCurrentUser, UserInfo } from '../../../data/user';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TypedResult<UserInfo>>
) 
{
    var token = await getToken({req});
    if(!token){
        await handleUnauthorized(res);
        return;
    }

    if(req.method?.toLowerCase() == "get"){
        var result = await getCurrentUser(token.accessToken as string)
        res.status(result.statusCode).json(result);
    }
    else{
        return res.status(415).write("unsupported method");
    }
}