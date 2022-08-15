import * as React from 'react';
import {Box, FormControl, FormLabel,Input,FormHelperText, Textarea} from '@chakra-ui/react';

type NewDebateProps ={

}

const NewDebatePage = (props:NewDebateProps)=>{

    return (
        <Box>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type="text"/>
            </FormControl>
            <FormControl>
                <FormLabel>Debate Premise</FormLabel>
            </FormControl>
        </Box>
    )
}

export default NewDebatePage;