import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from 'native-base'

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { useAuth } from '@hooks/useAuth'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AppError } from '@utils/AppError';

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const toast = useToast()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({email, password}: FormData ) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível fazer o login. Tente novamente mais tarde.'
      setIsLoading(false);

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return(
  <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
    <VStack flex={1} px={10} pb={16}>
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="People training"
        resizeMode='contain'
        position="absolute"
      />
    <Center my={24}>
      <LogoSvg/>

      <Text color="gray.100" fontSize="sm">
         Treine sua mente e seu corpo
      </Text>
    </Center>
    <Center>
      <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
        Acesse sua conta
      </Heading>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'Informe o email' }}
        render={({field: { onChange }}) => (
          <Input 
            placeholder="Email" 
            keyboardType="email-address"
            onChangeText={onChange}            
            errorMessage={errors.email?.message}
            autoCapitalize="none"
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'Informe a senha' }}
        render={({field: { onChange }}) => (
          <Input 
          placeholder="password" 
          secureTextEntry
          onChangeText={onChange}
          errorMessage={errors.password?.message}
          />
        )}
      />
          
      <Button 
        title="Acessar"
        onPress={handleSubmit(handleSignIn)}
        isLoading={isLoading}
      />

    </Center>
    <Center marginTop={24}>
      <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
        Ainda não tem acesso?
      </Text>
      <Button 
        title="Criar conta" 
        variant="outline"
        onPress={handleNewAccount}
      />
    </Center>

    </VStack>
  </ScrollView>
  );
}