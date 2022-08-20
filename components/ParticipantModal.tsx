import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { GetDebateParticipantDTO, ParticipantTypeEnum, PostDebateParticipantDTO } from '../data/participant';
import { ParticipantTypeDTO } from '../data/participantType';
import { TypedResult } from '../types/TypedResult';

type ParticipantModalProps = {
    isOpen: boolean;
    onClose(): any;
    onParticipantChosen(participant: PostDebateParticipantDTO):any;
}

export const ParticipantModal = (props :ParticipantModalProps)=>{

    const [emailAddress, setEmailAddress] = React.useState<string>('');
    const [selectedParticipantType, setSelectedParticipantTypeId] = React.useState<ParticipantTypeEnum>(ParticipantTypeEnum.Debater);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const toaster = useToast();

    const onOkClicked = () =>{
        if(emailAddress && selectedParticipantType){
            props.onParticipantChosen({
                appUserEmail: emailAddress,
                participantType: selectedParticipantType
            });
            props.onClose();
        }
    }

    const onCancelClicked = () =>{
        props.onClose();
    }

    const onParticipantTypeChanged = (e : any) =>{
        if(isNaN(e.target.value)){
            return;
        }
        setSelectedParticipantTypeId(parseInt(e.target.value));
    }
    
    const participantTypeOptions = 
        (Object.keys(ParticipantTypeEnum) as Array<keyof typeof ParticipantTypeEnum>)
        .filter(pt=> {return isNaN(Number(pt))})
        .map(pt=>{
            return <option value={ParticipantTypeEnum[pt]}>{pt}</option>
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
                        <Select placeholder='Select Role'
                            value={selectedParticipantType} 
                            onChange={(e)=>{onParticipantTypeChanged(e)}}
                            >
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