import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HStack, VStack, FlatList, Heading, Text} from 'native-base';

import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { Group } from '@components/Group';
import { HomeHeader } from '@components/HomeHeader';
import { ExerciseCard } from '@components/ExerciseCard';

export function Home(){
  const [groupSelected, setGroupSelected] = useState('costas');
  const [groups, setGroups] = useState(['Costas', 'Biceps', 'Triceps', 'Ombro']);
  const [exercises, setExercises] = useState(['Puxada Frontal', 'Remada Curvada', 'Remada Unilateral', 'Levantamento Terra']);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExercisesDetails(){
    navigation.navigate('exercise')
  }

  return(
    <VStack flex={1}>
      <HomeHeader/>

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Group 
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{px: 8 }}
        my={10}
        maxH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md">
            Exercícios
          </Heading>

          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>

      <FlatList
        data={exercises}
        keyExtractor={item => item}
        renderItem={({item}) => ( 
          <ExerciseCard
            onPress={handleOpenExercisesDetails}
          /> 
        )}
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{paddingBottom: 20}}
      />
      </VStack>
    </VStack>
  );
}