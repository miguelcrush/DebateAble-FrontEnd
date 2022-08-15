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

    var result: Response;

    console.log(req.headers["Content-Type"]);

    if(req.method?.toLowerCase() == "post"){
        result = await fetch("https://localhost:5001/api/debates",{
            method:"POST",
            headers:{
                "Authorization":`bearer ${token.accessToken}`,
                "Content-Type": "application/json"
            },
            body: req.body
        });
    }
    else{
        res.status(415).write("unsupported method");
        return;
    }

    

    if(!result.ok){
        console.log(`status ${result.status} ${await result.text()}`);
        res.status(500).json({name: "error"});
        return;
    }

    res.status(200).json({name: await result.text()});
}
