import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Controller, useForm } from 'react-hook-form';

import { useAuth } from '@hooks/useAuth';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';


const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
}

export function Profile(){
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/pcaldi.png');
  
  const toast = useToast();
  const { user } = useAuth();
  const { control, handleSubmit } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    }
  });

  async function handleUserPhotoSelect(){
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true
      });
      
      if (photoSelected.canceled){
        return;
      }
      if (photoSelected.assets[0].uri){
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
       
        if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 5){
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: "top",
            bg: 'red.500'
          });
        }


        setUserPhoto(photoSelected.assets[0].uri)
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }  
  }
  async function handleProfileUpdate(date: FormDataProps){
    console.log(date);
  }


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
            source={{uri: userPhoto}}
            alt="Foto Usuário"
            size={PHOTO_SIZE}
          />
        }
        <TouchableOpacity onPress={handleUserPhotoSelect}>
          <Text color="green.500" fontSize="md" fontWeight="bold" mt={2} mb={8}>
            Alterar Foto
          </Text>
        </TouchableOpacity>

        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange} }) => (
            <Input
              bg="gray.600"
              placeholder="Nome"
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange} }) => (
            <Input
              bg="gray.600"
              placeholder="E-mail"
              isDisabled
              onChangeText={onChange}
              value={value}
            />
          )}
        />     

          <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={12} fontFamily="heading">
            Alterar Senha
          </Heading>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange} }) => (
              <Input
                bg="gray.600"
                placeholder="Senha Antiga"
                secureTextEntry
                onChangeText={onChange}
                
              />
            )}
          />    

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange} }) => (
              <Input
                bg="gray.600"
                placeholder="Nova Senha"
                secureTextEntry
                onChangeText={onChange}
                
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange} }) => (
              <Input
                bg="gray.600"
                placeholder="Confirmar Senha"
                secureTextEntry
                onChangeText={onChange}
                
              />
            )}
          />
        
          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
          />

        </Center>
      </ScrollView>
    </VStack>
  );
}