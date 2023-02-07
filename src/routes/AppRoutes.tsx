import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { House, Package, ShoppingCartSimple, User } from "phosphor-react-native";

import { Home } from "../screens/Home";
import { Searchh } from "../screens/Searchh";
import { Orders } from "../screens/Orders";
import { Account } from "../screens/Account";
import { Search } from "../screens/Search";
import { CategoryProducts } from "../screens/CategoryProducts";

import { styles } from "../globals/styles.global";
import { ProductDetails } from "../screens/ProductDetails";
import { AccountData } from "../screens/AccountData";
import { EditUserData } from "../screens/EditUserData";
import { EditUserAccessData } from "../screens/EditUserAccessData";
import { Adresses } from "../screens/Adresses";
import { EditAddress } from "../screens/EditAddress";
import { NewAddress } from "../screens/NewAddress";
import { OrderDetails } from "../screens/OrderDetais";
import { DeliveryAddressConfirmation } from "../screens/DeliveryAddressConfirmation";
import { Checkout } from "../screens/Checkout";

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
        component={Home}
        name="Home"
        options={{
          title: "Início",
          tabBarIcon: ({ focused, ...props }) => (
            <House weight={focused ? "duotone" : "regular"} {...props} />
          ),
        }}
      />
      <Tab.Screen
        component={Searchh}
        name="Searchh"
        options={{
          title: "Pesquisar",
          tabBarIcon: ({ focused, ...props }) => (
            <Package weight={focused ? "duotone" : "regular"} {...props} />
          ),
        }}
      />
      <Tab.Screen
        component={Orders}
        name="Orders"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ focused, ...props }) => (
            <ShoppingCartSimple
              weight={focused ? "duotone" : "regular"}
              {...props}
            />
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

export function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={TabRoutes} name="TabRoutes" />
      <Stack.Screen
        component={Search}
        name="Search"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={CategoryProducts}
        name="CategoryProducts"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={ProductDetails}
        name="ProductDetails"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={AccountData}
        name="AccountData"
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
        component={Adresses}
        name="Adresses"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={NewAddress}
        name="NewAddress"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={EditAddress}
        name="EditAddress"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={OrderDetails}
        name="OrderDetails"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={DeliveryAddressConfirmation}
        name="DeliveryAddressConfirmation"
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        component={Checkout}
        name="Checkout"
        options={{ animation: "fade" }}
      />
    </Stack.Navigator>
  );
}
