import { TouchableOpacity } from "react-native";
import { Heading, VStack , HStack, Text, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { api } from "@services/api";

import { UserPhoto } from "./UserPhoto";
import  userPhotoDefaultImg  from "@assets/userPhotoDefault.png";

import { useAuth } from "@hooks/useAuth";

export function HomeHeader(){
  const { user, signOut } = useAuth();
  return(
    <HStack bg="gray.600" pt={16} pb={6} px={8} alignItems="center">
      <UserPhoto
      source={user.avatar 
        ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } 
        : userPhotoDefaultImg
      }
      alt="Imagem do usuário"
      size={16}
      mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">  
          Olá,
        </Text>
        <Heading color="gray.100" fontSize="md" fontFamily="heading">
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon 
          as={MaterialIcons}
          name="logout" 
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
      
    </HStack>
  );
}