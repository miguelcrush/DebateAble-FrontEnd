import { Heading, Text } from '@chakra-ui/react';
import * as React from 'react';
import { GetDebateDTO } from '../pages/api/debates';

type DebateProps = {
    debate: GetDebateDTO;
    canEdit: boolean;
}

export const Debate = (props: DebateProps) =>{

    return (
        <>
            <Heading>{props.debate.title}</Heading>
            <Text>
                {props.debate.description}
            </Text>
        </>
    )
}
