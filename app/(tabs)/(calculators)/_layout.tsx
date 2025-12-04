import { Stack } from "expo-router";

export default function CalculatorsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e40af",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="home" 
        options={{ 
          title: "Calculators",
        }} 
      />
      <Stack.Screen 
        name="stock-average" 
        options={{ 
          title: "Stock Average",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="stock-split" 
        options={{ 
          title: "Stock Split",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="emi" 
        options={{ 
          title: "EMI Calculator",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="sip" 
        options={{ 
          title: "SIP Calculator",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="future-value" 
        options={{ 
          title: "Future Value",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="trip" 
        options={{ 
          title: "Trip Calculator",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="age" 
        options={{ 
          title: "Age Calculator",
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="bmi" 
        options={{ 
          title: "BMI Calculator",
          headerShown: true,
        }} 
      />
    </Stack>
  );
}