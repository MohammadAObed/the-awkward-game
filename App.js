import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavbarComponent from "./components/common/NavbarComponent";
import GameScreen from "./screens/GameScreen";
import StartScreen from "./screens/StartScreen";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ScreenNames } from "./constants/ScreenNames";
import PersonsScreen from "./screens/PersonsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon, HomeModernIcon, StarIcon } from "react-native-heroicons/solid";
import ProgressScreen from "./screens/ProgressScreen";
import { View } from "react-native";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator
            screenOptions={{
              animation: "fade_from_bottom",
              headerShown: false,
            }}
          >
            <Stack.Screen name={ScreenNames.StartScreen} component={StartScreen} />
            <Stack.Screen name={ScreenNames.GameScreen} component={GameScreen} />
            <Stack.Screen name={ScreenNames.HomeScreen} component={HomeScreenWithTabs} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function HomeScreenWithTabs() {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.PersonsScreen}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F4C41C",
        tabBarIconStyle: { marginTop: 10 },
        tabBarStyle: {
          backgroundColor: "#1D1D1D",
          borderTopColor: "#212121",
        },
      }}
    >
      <Tab.Screen
        name={ScreenNames.PersonsScreen}
        component={PersonsScreen}
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => <HomeIcon size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={ScreenNames.ProgressScreen}
        component={ProgressScreen}
        options={{
          title: "",
          tabBarIcon: ({ size, color }) => <StarIcon size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
