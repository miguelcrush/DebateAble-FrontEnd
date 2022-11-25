import { Heading, Text } from '@chakra-ui/react';
import { unstable_getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Debate } from '../../../components/Debate';
import { DebateIncludes, getDebate } from '../../../data/debate';
import { TypedResult } from '../../../types/TypedResult';
import { authOptions } from '../../api/auth/[...nextauth]';
import { GetDebateDTO } from '../../api/debates';
import {UserInfo} from '../../../data/user';
import { getParticipantTypes, ParticipantTypeDTO } from '../../../data/participantType';

type IndividualDebateWithSlugPageProps ={
    getDebateResult: TypedResult<GetDebateDTO>;
}
const IndividualDebatePage = (props: IndividualDebateWithSlugPageProps) =>{

    const router = useRouter();
    

    return (
        <>
            <Debate 
                debate={props.getDebateResult.data}
                canEdit={true}
            />
        </>
    )
}

export default IndividualDebatePage;

export async function getServerSideProps(context:any){
    var req = context.req;
    var session = await unstable_getServerSession(context.req, context.res, authOptions);
    var token = await getToken({req});

    var getDebateResult = await getDebate(context.query.id, token?.accessToken as string, [DebateIncludes.Participants]);

    console.log(getDebateResult);

    return {
        props: {
            getDebateResult: getDebateResult
        }
    }
}