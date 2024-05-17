import React from "react";
import {
  View,
  Text,
  Image,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const handleAddToCart = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cart");
      let cart = cartItems ? JSON.parse(cartItems) : [];

      const productIndex = cart.findIndex((item) => item.id === product.id);
      if (productIndex >= 0) {
        cart[productIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem("cart", JSON.stringify(cart));
      ToastAndroid.show(`${product.title} added to cart`, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show("Error adding to cart", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {product && (
          <>
            <Image
              source={{ uri: product.image.url }}
              style={styles.cardImage}
            />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>100$</Text>
            <Text style={styles.description}>{product.description}</Text>

            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  card: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    padding: 20, 
  },
  cardImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  description: {
    fontWeight: "500",
    marginBottom: 10,
    color: "gray",
  },
  price: {
    fontWeight: "800",
    fontSize: 25,
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#98c8b8",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: 150,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
