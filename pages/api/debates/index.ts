// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {authOptions} from '../auth/[...nextauth]';
import {unstable_getServerSession} from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { handleUnauthorized, TypedResult } from '../../../types/TypedResult';
import { DebateIncludes, postDebate } from '../../../data/debates/debate';

export type GetDebateDTO = {
  title: string;
  description:string;
  id:string;
  slug:string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TypedResult<GetDebateDTO>>
) 
{
    var token = await getToken({req});
    if(!token){
        await handleUnauthorized(res);
        return;
    }

    if(req.method?.toLowerCase() == "post"){
        console.log(`body: ${JSON.stringify(req.body)}`);
        var result = await postDebate(req.body, token.accessToken as string, req.query.includes as DebateIncludes[]);
        res.status(result.statusCode).json(result);
    }
    else{
        return res.status(415).write("unsupported method");
    }
}
