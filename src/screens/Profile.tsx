import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from 'native-base';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';


const PHOTO_SIZE = 33;

export function Profile(){
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return(
    <VStack flex={1}>
     <ScreenHeader title='Perfil'/>
      <ScrollView contentContainerStyle={{paddingBottom: 36}}>
        <Center mt={6} px={10}>
        {
          photoIsLoading ?
          <Skeleton 
            w={PHOTO_SIZE} 
            h={PHOTO_SIZE} 
            rounded="full"
            startColor="gray.500"
            endColor="gray.400"
          />
         :
          <UserPhoto
            source={{uri: 'https://github.com/pcaldi.png'}}
            alt="Foto Usuário"
            size={PHOTO_SIZE}
          />
        }
        <TouchableOpacity>
          <Text color="green.500" fontSize="md" fontWeight="bold" mt={2} mb={8}>
            Alterar Foto
          </Text>
        </TouchableOpacity>

        <Input
          bg="gray.600"
          placeholder="Nome"
        />

        <Input
          bg="gray.600"
          placeholder="E-mail"
          isDisabled
        />

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12}>
            Alterar Senha
          </Heading>

          <Input
            bg="gray.600"
            placeholder="Senha Antiga"
            secureTextEntry
          />

           <Input
            bg="gray.600"
            placeholder="Nova Senha"
            secureTextEntry
          />
           <Input
            bg="gray.600"
            placeholder="Confirmar Senha"
            secureTextEntry
          />

          <Button
            title="Atualizar"
            mt={4}
          />

        </Center>
      </ScrollView>
    </VStack>
  );
}