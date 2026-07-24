import "./global.css";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Text, View } from "react-native";

import { RootNavigator } from "./src/navigation/RootNavigator";
import { persistor, store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoading />} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}

function PersistLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-[#010827]">
      <Text className="text-[#FFFFFF]">Loading...</Text>
    </View>
  );
}
