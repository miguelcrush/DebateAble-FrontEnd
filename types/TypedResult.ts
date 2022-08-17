import type { NextApiRequest, NextApiResponse } from 'next'

export type TypedResult<TData>={
    data: TData;
    message: string;
    wasSuccessful:boolean;
    statusCode: number;
}

export const handleUnauthorized = async <T>(nextResponse:NextApiResponse<TypedResult<T>>) =>{
    nextResponse.status(401).send({
        data: undefined as unknown as T,
        message: "Unauthorized",
        wasSuccessful:false,
        statusCode:401
    });
}

export const makeRequest = async <T>(token: string, endpoint:string, method:string, body: any) : Promise<TypedResult<T>> =>{
    var result : TypedResult<T>;

    var fetchOpts : RequestInit = {
        method:method,
        headers:{
            "Authorization":`bearer ${token}`,
            "Content-Type": "application/json"
        }
    }

    method = method.toLowerCase();
    if(method == "post" || method == "put" || method == "patch"){
        fetchOpts.body = JSON.stringify(body);
    }

    var resp = await fetch(endpoint,fetchOpts);

    if(!resp.ok){
        var errorText = await resp.text();
        result= {
            data: undefined as unknown as T,
            message: errorText,
            wasSuccessful: false,
            statusCode: resp.status
        }
    }
    else{
        result= {
            data: (await resp.json()) as T,
            message: "",
            wasSuccessful: true,
            statusCode: resp.status
        };
    }

    return result;
}