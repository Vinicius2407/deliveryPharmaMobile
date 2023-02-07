import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { House, User } from "phosphor-react-native";

import { Account } from "../screens/Account";
import { Search } from "../screens/Search";

import { styles } from "../globals/styles.global";
import { AccountData } from "../screens/AccountData";
import { EditUserData } from "../screens/EditUserData";
import { EditUserAccessData } from "../screens/EditUserAccessData";
import { OrderDetails } from "../screens/OrderDetais";
import { ClientsOrders } from "../screens/ClientsOrders";
import { ClientOrderRevision } from "../screens/ClientOrderRevision";
import { DenyOrder } from "../screens/DenyOrder";

const Tab = createBottomTabNavigator();

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: styles.colors.contrast,
          elevation: 0,
          borderTopWidth: 1,
          borderColor: styles.colors.border,
          height: 70,
        },
        tabBarItemStyle: {
          padding: 12,
        },
        tabBarIconStyle: {
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontFamily: styles.fonts.medium,
          fontSize: 14,
        },
        tabBarActiveTintColor: styles.colors.blue,
      }}
    >
      <Tab.Screen
        component={ClientsOrders}
        name="ClientsOrders"
        options={{
          title: "Solicitações",
          tabBarIcon: ({ focused, ...props }) => (
            <House weight={focused ? "duotone" : "regular"} {...props} />
          ),
        }}
      />
      <Tab.Screen
        component={Account}
        name="Account"
        options={{
          title: "Conta",
          tabBarIcon: ({ focused, ...props }) => (
            <User weight={focused ? "duotone" : "regular"} {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export function AppPharmaceuticalRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={TabRoutes} name="TabRoutes" />
      <Stack.Screen
        component={ClientOrderRevision}
        name="ClientOrderRevision"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={DenyOrder}
        name="DenyOrder"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={Search}
        name="Search"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={AccountData}
        name="AccountData"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={EditUserData}
        name="EditUserData"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={EditUserAccessData}
        name="EditUserAccessData"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={OrderDetails}
        name="OrderDetails"
        options={{ animation: "fade" }}
      />
    </Stack.Navigator>
  );
}
