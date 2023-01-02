import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { Profile } from '@screens/Profile';
import { Exercise } from '@screens/Exercise';
import { History } from '@screens/History';

type AppRoutes = {
  home: undefined;
  profile: undefined;
  exercise: undefined;
  history: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;


const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>();


export function AppRoutes(){
  return(
    <Navigator>
      
      <Screen
        name="home"
        component={Home}
      />
      <Screen
        name="history"
        component={History}
      />
      <Screen
        name="profile"
        component={Profile}
      />
      <Screen
        name="exercise"
        component={Exercise}
      />
         
    </Navigator>
  );
}