import React from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType } from "react-native";
import { Link } from "expo-router";

interface CardProps {
  title: string;
  content: string;
  backgroundColor: string;
  icon: ImageSourcePropType;
  href: string;
}

export function Card({ title, content, backgroundColor, icon, href }: CardProps) {
  return (
    <Link href={href}>
      <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.cardRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardContent}>{content}</Text>
          </View>
          <Image 
            style={styles.icon}
            source={icon}
            resizeMode="cover"
          />
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 25,
    marginVertical: 20, // Aumentado de 15 para 20
    width: "100%",
    height: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3 // Adicionado paddingBottom para espaçamento
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    gap: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2F4172",
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 15,
    color: "#555",
    lineHeight: 20,
  },
  icon: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginLeft: 10,
  },
});