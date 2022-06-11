import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { createUploadLink } from "apollo-upload-client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavProvider } from "../context/navContext";
import { UserDataProvider } from "../context/userData";
import { UsersDataProvider } from "../context/usersData";
import { ProductsDataProvider } from "../context/productsContext";
import { PropertiesDataProvider } from "../context/propertiesContext";

const link = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_URL}/graphql`,
});
console.log(process.env.URL_API);
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("Authorization");

  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
  return {
    headers: {
      ...headers,
    },
  };
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  //@ts-ignore
  link: authLink.concat(link),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <NextUIProvider>
        <NavProvider>
          <UserDataProvider>
            <UsersDataProvider>
              <ProductsDataProvider>
                <PropertiesDataProvider>
                  <Component {...pageProps} />
                </PropertiesDataProvider>
              </ProductsDataProvider>
            </UsersDataProvider>
          </UserDataProvider>
        </NavProvider>
      </NextUIProvider>
    </ApolloProvider>
  );
}

export default MyApp;
