import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavbarComponent from "./components/common/NavbarComponent";
import QuickGameRoundScreen from "./screens/QuickGameRoundScreen";
import StartScreen from "./screens/StartScreen";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ScreenNames } from "./constants/ScreenNames";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator
            headerMode="float"
            screenOptions={{
              animation: "fade_from_bottom",
              header: () => <NavbarComponent />,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
            <Stack.Screen name={ScreenNames.QuickGameRoundScreen} component={QuickGameRoundScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
