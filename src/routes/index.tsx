import { Box, useTheme } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";


import { useAuth } from "@hooks/useAuth"
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes(){

  const { user } = useAuth();
  
  console.log('USUARIO LOGADO =>>', user)

  const { colors } = useTheme();

  const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];
  return (
    <Box flex={1} bg="gray.700">
    <NavigationContainer theme={theme}>
      <AuthRoutes />
    </NavigationContainer>
    </Box>
  )
}