import * as React from 'react';
import {Box, FormControl, FormLabel,Input,FormHelperText, Textarea, Button, Heading, useToast} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { TypedResult } from '../../types/TypedResult';
import { GetDebateDTO } from '../api/debates';

type NewDebateProps ={

}

const NewDebatePage = (props:NewDebateProps)=>{

    const [title, setTitle] = React.useState<string>('');
    const [premise, setPremise] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    
    const toast = useToast();
    const router = useRouter();

    const handleSave = async () =>{
        setIsLoading(true);
        var resp = await fetch('/api/debates?includes=participants&includes=comments&includes=posts', {
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                title: title,
                description: premise
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
            <FormControl isDisabled={isLoading}>
                <Button isDisabled={isLoading} onClick={handleSave}>Save</Button>
            </FormControl>
        </Box>
    )
}

export default NewDebatePage;