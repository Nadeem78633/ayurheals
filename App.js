import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import HomeScreen from "./Screens/HomeScreen";
import ProductDetailScreen from "./Screens/ProductDetail";
import Cart from "./Screens/Cart";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const client = new ApolloClient({
  uri: "https://mock.shop/api",
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({ updateCartItemsCount }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ProductDetails">
      {(props) => (
        <ProductDetailScreen
          {...props}
          updateCartItemsCount={updateCartItemsCount}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

const App = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const fetchCartItemsCount = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cart");
      const parsedCartItems = JSON.parse(cartItems);
      const count = parsedCartItems ? parsedCartItems.length : 0;
      setCartItemsCount(count);
    } catch (error) {
      console.error("Error fetching cart items count:", error);
    }
  };

  useEffect(() => {
    fetchCartItemsCount();
  }, []);

  const updateCartItemsCount = async () => {
    await fetchCartItemsCount();
  };

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconComponent;

                if (route.name === "HomeTab") {
                  iconComponent = (
                    <Ionicons name={"home"} size={size} color={color} />
                  );
                } else if (route.name === "Cart") {
                  iconComponent = (
                    <View style={styles.cartIconContainer}>
                      <FontAwesome5
                        name={"shopping-cart"}
                        size={size}
                        color={color}
                      />
                      {cartItemsCount > 0 && (
                        <View style={styles.badgeContainer}>
                          <Text style={styles.badge}>{cartItemsCount}</Text>
                        </View>
                      )}
                    </View>
                  );
                }

                return iconComponent;
              },
              tabBarActiveTintColor: "#98c8b8",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="HomeTab">
              {(props) => (
                <HomeStack
                  {...props}
                  updateCartItemsCount={updateCartItemsCount}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Cart" component={Cart} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartIconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeContainer: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    borderRadius: 20,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    color: "white",
    fontSize: 12,
  },
});

export default App;
