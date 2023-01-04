import { useNavigation } from '@react-navigation/native';

import { Heading, HStack, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'

import BodySvg from '@assets/body.svg'

import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Exercise(){


  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack(){
    navigation.goBack();
  }

  return(
    <VStack flex={1}>
     <VStack bg="gray.600" px={8} pt={12}>
      <TouchableOpacity onPress={handleGoBack}>
        <Icon
          as={Feather}
          name="arrow-left"
          color="green.500"
          size={6}
        />
      </TouchableOpacity>

      <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
        <Heading color="gray.100" fontSize="lg" flexShrink={1}>
          Puxada Frontal 
        </Heading>
        <HStack alignItems="center">
          <BodySvg/>
          <Text color="gray.200" ml={1} textTransform="capitalize">
            Costas
          </Text>
        </HStack>
      </HStack>

     </VStack>
    </VStack>
  );
}