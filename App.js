import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen.js";
import ViewListScreen from "./screens/ViewListScreen.js";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            header: () => (
              <View
                style={{
                  backgroundColor: "#C7D3F5",
                  alignItems: "center",
                  paddingTop: 70,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", color: "#00141F", fontSize: 28 }}
                >
                  APP SOCKETS
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingVertical: 10,
                  }}
                ></View>
              </View>
            ),
            headerShown: true,
          })}
        />
        <Stack.Screen
          name="ViewListScreen"
          component={ViewListScreen}
          options={{
            title: "Lista",
            headerStyle: {
              backgroundColor: "#C7D3F5",
            },
            headerTitleStyle: { fontWeight: "bold", color: "#000" },
            headerTintColor: "black",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
