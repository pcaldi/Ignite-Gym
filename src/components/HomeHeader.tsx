import { Heading, VStack , HStack, Text } from "native-base";

export function HomeHeader(){
  return(
    <HStack>
      <VStack>
        <Text color="gray.100"> 
          Olá,
        </Text>
        <Heading color="gray.100">
          Paulo Caldi
        </Heading>
      </VStack>
    </HStack>
  );
}