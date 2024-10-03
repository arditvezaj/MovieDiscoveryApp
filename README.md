# MOVIEDISCOVERYAPP

Overview
- This is a React Native application utilizing React Query for API data fetching with caching strategies, alongside Redux for client-side global state. Caching in React Query is persisted using PersistQueryClientProvider, allowing for efficient data retrieval and management.

Features:
- React Navigation for app routing
- React Query for API data fetching
- Redux for client-side state management
- Caching Strategy using PersistQueryClientProvider to persist cached queries across app sessions


Setup Instructions
1. Clone the repository
   git clone <repository-url>
   cd <repository-directory>

2. Install dependencies
   npm install

3. Running app
   npx expo start

   
Brief Explanation of Caching Strategy:
React Query + Redux + PersistQueryClientProvider
- This app implements a caching strategy to persist server-side data across sessions, improving the user experience by minimizing unnecessary network requests. Here’s a breakdown of the caching setup:

React Query: 
- React Query is used for fetching, caching, and synchronizing server-side data.
- It caches API responses and efficiently updates the UI based on this cached data, reducing the need for repetitive requests.
- Stale-While-Revalidate strategy is used, meaning cached data is immediately shown while a request to the server is initiated in the background to revalidate and refresh the data.


Persisting Cache with PersistQueryClientProvider
- PersistQueryClientProvider from @tanstack/react-query-persist-client is used to persist cached queries between app sessions.
- This ensures that data is available even when the app is closed or restarted, without the need for refetching.
- The persistence layer is configured using AsyncStorage for React Native.
