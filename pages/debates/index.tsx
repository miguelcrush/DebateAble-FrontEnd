import { Box } from '@chakra-ui/react';
import { unstable_getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import Link from 'next/link';
import * as React from 'react';
import { DebateIncludes, getDebate, GetDebateDTO, getDebates } from '../../data/debate';
import { TypedResult } from '../../types/TypedResult';
import { authOptions } from '../api/auth/[...nextauth]';

type DebatePageProps ={
    debatesResult: TypedResult<GetDebateDTO[]>;
}

const DebatePage = (props:DebatePageProps)=>{

    var debatesMarkup = props.debatesResult.data.map(d=>{
        return (
            <>
                <Box>
                    <Link href={`/debates/${d.id}/${d.slug}`}>
                        {d.title}
                    </Link>
                </Box>
            </>
        )
    })

    return (
        <>
          {debatesMarkup}  
        </>
    )
}

export default DebatePage;

export async function getServerSideProps(context:any){
    var req = context.req;
    var session = await unstable_getServerSession(context.req, context.res, authOptions);
    var token = await getToken({req});

    var result = await getDebates(token?.accessToken as string, [DebateIncludes.None]);

    console.log(result);

    return {
        props: {
            debatesResult: result
        }
    }
}