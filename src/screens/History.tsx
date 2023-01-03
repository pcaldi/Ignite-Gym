import { useState } from 'react';
import {Heading, VStack, SectionList } from 'native-base';


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
    />
    </VStack>
  );
}