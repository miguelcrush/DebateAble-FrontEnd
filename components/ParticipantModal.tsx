import { Modal, ModalContent, ModalHeader, ModalOverlay, useToast } from '@chakra-ui/react';
import * as React from 'react';
import { ParticipantTypeDTO } from '../data/participantType';
import { TypedResult } from '../types/TypedResult';

type ParticipantModalProps = {
    isOpen: boolean;
    onClose(): any;

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
    },[])
    


    return (
        <Modal
            isOpen={props.isOpen} 
            onClose={props.onClose}
            >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader></ModalHeader>
            </ModalContent>
        </Modal>
    )
}