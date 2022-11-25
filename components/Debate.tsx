import { Box, Heading, Text } from '@chakra-ui/react';
import * as React from 'react';
import { GetDebateDTO } from '../pages/api/debates';

type DebateProps = {
    debate: GetDebateDTO;
    canEdit: boolean;
}

export const Debate = (props: DebateProps) =>{

    const participantMarkup = props.debate.participants?.map(p=>{
        console.log(p);

        return (

            <div>
                {p.appUser.invited && (
                    <>Invited User</>
                )}

                {!p.appUser.invited && (
                    <>{p.appUser.email}</>
                )}
            </div>
        )
    })

    return (
        <>
            <Heading>{props.debate.title}</Heading>
            <Text>
                {props.debate.description}
            </Text>
            <Box>
                {participantMarkup}
            </Box>
        </>
    )
}
