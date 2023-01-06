import {  StatusBar } from 'react-native';
import {NativeBaseProvider} from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
import { AuthContext } from '@contexts/AuthContext';

import { Loading } from '@components/Loading';
import { THEME } from './src/theme'


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <AuthContext.Provider value={{
        id: '1',
        name: 'Paulo',
        email: 'paulo@email.com',
        avatar: 'paulo.png'
      }}>
        {fontsLoaded ? <Routes/> : <Loading/>}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}

