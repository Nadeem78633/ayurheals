import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import ProductDetailScreen from "./Screens/ProductDetail";

const Stack = createNativeStackNavigator();

export default function HomeStack({
  updateCartItemsCount,
  cartItems,
  setCartItems,
}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ProductDetails">
        {(props) => (
          <ProductDetailScreen
            cartItems={cartItems}
            setCartItems={setCartItems}
            {...props}
            updateCartItemsCount={updateCartItemsCount}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
