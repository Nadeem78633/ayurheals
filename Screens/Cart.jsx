import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const cartItems = await AsyncStorage.getItem("cart");
    if (cartItems) {
      setCart(JSON.parse(cartItems));
    }
  };

  const updateCart = async (updatedCart) => {
    setCart(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const incrementQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const decrementQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    updateCart(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    updateCart(updatedCart);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image.url }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => decrementQuantity(index)}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => incrementQuantity(index)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => removeItem(index)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.empty}>Your cart is empty</Text>
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  cartItem: {
    flexDirection: "row",
    marginBottom: 16,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
    padding: 20,
  },
  image: { width: 100, height: 100, marginRight: 16 },
  details: { flex: 1, justifyContent: "center" },
  title: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, color: "#666" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantity: { fontSize: 16, marginHorizontal: 10 },
  button: {
    backgroundColor: "#ddd",
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: "#98c8b8",
    borderRadius: 5,
  },
  buttonText: { fontSize: 18, fontWeight: "bold", color: "white" },
  empty: { textAlign: "center", fontSize: 18, marginTop: 20 },
});

export default CartScreen;
