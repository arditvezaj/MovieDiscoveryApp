import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient } from "@tanstack/react-query";
import { RootStackParamList } from "./app/src/types/RootStackTypes";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Providers } from "./app/src/redux/provider";

import Home from "./app/src/screens/Home";
import Category from "./app/src/screens/Category";
import MovieDetails from "./app/src/screens/MovieDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const App = () => {
  return (
    <Providers>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#F2F2F2",
                paddingHorizontal: 20,
              },
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Category" component={Category} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistQueryClientProvider>
    </Providers>
  );
};

export default App;
