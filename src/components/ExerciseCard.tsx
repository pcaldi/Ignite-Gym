import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons"

import { ExerciseDTO } from "@dtos/ExerciseDTO";


type Props = TouchableOpacityProps &{
  data: ExerciseDTO;
}

export function ExerciseCard({data, ...rest}: Props){
  return (
    <TouchableOpacity {...rest}>
      <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{uri: 'https://alcateiademonstros.com.br/wp-content/uploads/2022/01/remada-unilateral-com-halter.jpg'}}
          alt="Ex Unilateral"
          h={16}
          w={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1} >
          <Heading color="white" fontSize="lg" fontFamily="heading">
            {data.name}
          </Heading>
          <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
            {data.series} x séries {data.repetitions} x repetições
          </Text>
        </VStack>
        <Icon
          as={Entypo} 
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>

    </TouchableOpacity>
  );
}