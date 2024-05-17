import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import hero from "../assets/images/hero.jpg";


const GET_COLLECTIONS = gql`
  {
    collections(first: 4) {
      edges {
        cursor
        node {
          id
          handle
          title
          description
          image {
            id
            url
          }
        }
      }
    }
  }
`;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { loading, error, data } = useQuery(GET_COLLECTIONS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const manCollections = data.collections.edges.slice(0, 2);
  const topsCollections = data.collections.edges.slice(2, 4);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <Image source={hero} style={styles.heroImage} />

      <Text style={styles.categoryTitle}>Man & Woman</Text>
      <View style={styles.cardContainer}>
        {manCollections.map((collection) => (
          <Pressable
            key={collection.node.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                product: collection.node,
              })
            }
          >
            <Image
              source={{ uri: collection.node.image.url }}
              style={styles.cardImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{collection.node.title}</Text>
              <View>
                <Text style={styles.price}>100$</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>

      <Text style={styles.categoryTitle}>Tops & Unisex</Text>
      <View style={styles.cardContainer}>
        {topsCollections.map((collection) => (
        
          <Pressable
            key={collection.node.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                product: collection.node,
              })
            }
          >
            <Image
              source={{ uri: collection.node.image.url }}
              style={styles.cardImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{collection.node.title}</Text>
              <View>
                <Text style={styles.price}>100$</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 10,
    overflow: "hidden",
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 10,
  },
  card: {
    width: "48%",
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    fontWeight: "500",
    paddingLeft: 20,
    paddingBottom: 10,
    color: "#ccc",
  },
});
