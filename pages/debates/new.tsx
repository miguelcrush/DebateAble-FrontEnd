import * as React from 'react';
import {Box, FormControl, FormLabel,Input,FormHelperText, Textarea, Button, Heading, useToast} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TypedResult } from '../../types/TypedResult';
import { GetDebateDTO } from '../api/debates';
import { ParticipantModal } from '../../components/ParticipantModal';
import { ParticipantTypeEnum, PostDebateParticipantDTO } from '../../data/participant';

type NewDebateProps ={

}

const NewDebatePage = (props:NewDebateProps)=>{

    const [title, setTitle] = React.useState<string>('');
    const [premise, setPremise] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [participantModalOpen, setParticipantModalOpen] = React.useState<boolean>(false);
    const [participants, setParticipants] = React.useState<PostDebateParticipantDTO[]>([]);
    
    const toast = useToast();
    const router = useRouter();

    const onParticipantChosen = (p: PostDebateParticipantDTO) =>{
        var existing = participants;
        existing.push(p);
        setParticipants(existing);
    }

    const handleSave = async () =>{
        setIsLoading(true);
        var resp = await fetch('/api/debates?includes=participants&includes=comments&includes=posts', {
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                title: title,
                description: premise,
                participants: participants
            })
        })

        var result = await resp.json() as TypedResult<GetDebateDTO>;


        if(!result.wasSuccessful){
            toast({
                title: "Error",
                description: result.message,
                status: "error"
            });
            setIsLoading(false);
            return;
        }

        router.push(`/debates/${result.data.id}/${result.data.slug}`)
    }

    const participantsMarkup = participants.map(p=>{
        return (
        <Box>
            {p.appUserEmail}
            {ParticipantTypeEnum[ p.participantType]}
        </Box>
        )
    });

    return (
    
        <Box>
            <Heading>New Debate</Heading>
            <FormControl isDisabled={isLoading}>
                <FormLabel>Title</FormLabel>
                <Input type="text" onChange={(e : React.ChangeEvent<HTMLInputElement>)=>{setTitle(e.target.value)}}/>
            </FormControl>
            <FormControl isDisabled={isLoading}>
                <FormLabel>Debate Premise</FormLabel>
                <Textarea onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setPremise(e.target.value)}}></Textarea>
            </FormControl>
            <ParticipantModal 
                isOpen={participantModalOpen}
                onClose={()=>{setParticipantModalOpen(false)}}
                onParticipantChosen={(p)=>{onParticipantChosen(p)}}
                />
            <FormControl isDisabled={isLoading}>
                <Button isDisabled={isLoading} onClick={()=>{setParticipantModalOpen(true);}}>Add</Button>
            </FormControl>

            <Box>
                {participantsMarkup}
            </Box>

            <FormControl isDisabled={isLoading}>
                <Button isDisabled={isLoading} onClick={handleSave}>Save</Button>
            </FormControl>
            
        </Box>
    )
}

export default NewDebatePage;