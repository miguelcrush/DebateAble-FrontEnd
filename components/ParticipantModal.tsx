import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { GetDebateParticipantDTO } from '../data/participant';
import { ParticipantTypeDTO } from '../data/participantType';
import { TypedResult } from '../types/TypedResult';

type ParticipantModalProps = {
    isOpen: boolean;
    onClose(): any;
    onParticipantChosen(participant: PostDebateParticipantDTO):any;
}

export const ParticipantModal = (props :ParticipantModalProps)=>{

    const [emailAddress, setEmailAddress] = React.useState<string>('');
    const [selectedParticipantTypeId, setSelectedParticipantTypeId] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [participantTypes, setParticipantTypes] = React.useState<ParticipantTypeDTO[]>([]);

    const toaster = useToast();

    React.useEffect(()=>{
        async function getParticipantTypes(){
            setIsLoading(true);
            try{
                const resp = await fetch('/api/participantTypes/list',{method:'get'});
                if(!resp.ok){
                    toaster({title: 'Error', description: await resp.text(), status: 'error'});
                    return;
                }

                var getParticipantTypesResult = await resp.json() as TypedResult<ParticipantTypeDTO[]>;
                if(!getParticipantTypesResult.wasSuccessful){
                    toaster({title: 'Error', description: getParticipantTypesResult.message, status: 'error'});
                    return;
                }
                setParticipantTypes(getParticipantTypesResult.data);
            }
            finally{
                setIsLoading(false);
            }
        }

        getParticipantTypes();
    },[])

    const onOkClicked = () =>{
        console.log(emailAddress);
        console.log(selectedParticipantTypeId);
        if(emailAddress && selectedParticipantTypeId){
            props.onParticipantChosen({
                appUserEmail: emailAddress,
                participantTypeId: selectedParticipantTypeId
            });
            props.onClose();
        }
    }

    const onCancelClicked = () =>{
        props.onClose();
    }
    
    const participantTypeOptions = 
        participantTypes.map(pt=>{
            return <option value={pt.id}>{pt.name}</option>
        });


    return (
        <Modal
            isOpen={props.isOpen} 
            onClose={props.onClose}
            closeOnOverlayClick={false}
            >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Choose Participant</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Email:</FormLabel>
                        <Input type='text' value={emailAddress} onChange={(e:any)=>{setEmailAddress(e.target.value)}}/>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Participant Type:</FormLabel>
                        <Select placeholder='Select Role' onChange={(e)=>{setSelectedParticipantTypeId(e.target.value)}}>
                            {participantTypeOptions}
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button mr={2} onClick={()=>{onOkClicked()}}>Ok</Button>
                    <Button onClick={()=>{onCancelClicked()}}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}