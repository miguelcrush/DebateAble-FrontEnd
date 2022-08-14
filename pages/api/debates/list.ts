// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {authOptions} from '../auth/[...nextauth]';
import {unstable_getServerSession} from 'next-auth/next';
import { getToken } from 'next-auth/jwt';

type Data = {
  name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) 
{
    var token = await getToken({req});
    if(!token){
        res.status(401).json({name:"unauthorized"});
        return;
    }

    var result = await fetch("https://localhost:5001/api/appusers/whoami",{
        method:"GET",
        headers:{
            "Authorization":`bearer ${token.accessToken}`
        }
    });

    if(!result.ok){
        console.log(`status ${result.status} ${await result.text()}`);
        res.status(500).json({name: "error"});
        return;
    }

    res.status(200).json({name: await result.text()});
}
