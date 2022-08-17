import { Heading, Text } from '@chakra-ui/react';
import { unstable_getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import * as React from 'react';
import { DebateIncludes, getDebate } from '../../../data/debates/debate';
import { TypedResult } from '../../../types/TypedResult';
import { authOptions } from '../../api/auth/[...nextauth]';
import { GetDebateDTO } from '../../api/debates';

type IndividualDebateWithSlugPageProps ={
    getDebateResult: TypedResult<GetDebateDTO>;
}
const IndividualDebatePage = (props: IndividualDebateWithSlugPageProps) =>{

    const router = useRouter();

    return (
        <>
            <Heading>{props.getDebateResult.data.title}</Heading>
            <Text>
                {props.getDebateResult.data.description}
            </Text>
        </>
    )
}

export default IndividualDebatePage;

export async function getServerSideProps(context:any){
    var req = context.req;
    var session = await unstable_getServerSession(context.req, context.res, authOptions);
    var token = await getToken({req});

    var result = await getDebate(context.query.id, token?.accessToken as string, [DebateIncludes.None]);

    console.log(result);

    return {
        props: {
            getDebateResult: result
        }
    }
}