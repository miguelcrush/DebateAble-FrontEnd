import { unstable_getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import * as React from 'react';
import { DebateIncludes, getDebate } from '../../../data/debate';
import { authOptions } from '../../api/auth/[...nextauth]';
import { GetDebateDTO } from '../../api/debates';

type IndividualDebatePageProps ={
    debate: GetDebateDTO;
}
const IndividualDebatePage = (props: IndividualDebatePageProps) =>{

    const router = useRouter();

    console.log(props);

    return (
        <>
            {props.debate.id}
        </>
    )
}

export default IndividualDebatePage;

export async function getServerSideProps (context:any){
    var req = context.req;
    var session = await unstable_getServerSession(context.req, context.res, authOptions);
    var token = await getToken({req});

    var result = await getDebate(context.query.id, token?.accessToken as string, [DebateIncludes.None]);

    console.log(result);

    //if slug differs from our slug, redirect permanent

    if(result.data.slug != context.query.slug){
        return {
            redirect:{
                permanent:true,
                destination: `/debates/${result.data.id}/${result.data.slug}`
            }
        }
    }

    else{
        return {
            props: {
                debate: result.data
            }
        }
    }

}