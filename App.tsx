import 'react-native-screens';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/model';
import { PredictionScreen, ResultsScreen } from './src/view';
import { Colors } from './src/components';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Dark navigation theme matching our colour palette. */
const DarkNavTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    card: Colors.surface,
    text: Colors.textPrimary,
    border: Colors.border,
    notification: Colors.accent,
  },
};

const App: React.FC = () => {
  return (
    <NavigationContainer theme={DarkNavTheme}>
      <Stack.Navigator
        initialRouteName="Prediction"
        screenOptions={{
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.textPrimary,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: Colors.background },
          animation: 'slide_from_right',
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Prediction"
          component={PredictionScreen}
          options={{ title: 'Product Prediction' }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: 'Results' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
