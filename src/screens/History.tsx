import { useState } from 'react';
import {Heading, VStack, SectionList, Text } from 'native-base';


import { ScreenHeader } from '@components/ScreenHeader';
import { HistoryCard } from '@components/HistoryCard';

export function History(){
  const [exercises, setExercises] = useState([
    {
      title: "03.01.23",
      data: ["Puxada Frontal", "Remada Unilateral"]
    },
    {
      title: "01.01.23",
      data: ["Puxada Frontal"]
    },
  ]);

  return(
    <VStack flex={1}>

     <ScreenHeader title="Histórico de Exercícios"/>

    <SectionList
      sections={exercises}
      keyExtractor={item => item}
      renderItem={({item}) => (
        <HistoryCard/>
      )}
      renderSectionHeader={({ section }) => (
        <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
          {section.title}
        </Heading>
      )}
      px={8}
      contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center'}}
      ListEmptyComponent={() => (
        <Text color="gray.100" textAlign="center">
          Não há exercícios registrados ainda. {'\n'}
          Vamos praticar exercícios hoje?
        </Text>
      )}
    />
    </VStack>
  );
}