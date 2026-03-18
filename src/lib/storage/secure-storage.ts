import * as SecureStore from "expo-secure-store";

const klappRefreshTokenKey = "joli.klapp.refreshToken";

export async function saveKlappRefreshToken(refreshToken: string) {
  await SecureStore.setItemAsync(klappRefreshTokenKey, refreshToken);
}

export async function getKlappRefreshToken() {
  return SecureStore.getItemAsync(klappRefreshTokenKey);
}

export async function clearKlappRefreshToken() {
  await SecureStore.deleteItemAsync(klappRefreshTokenKey);
}
