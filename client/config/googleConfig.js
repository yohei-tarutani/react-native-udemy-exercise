import * as AuthSession from "expo-auth-session";
import { Platform } from "react-native";

export const redirectUri = AuthSession.makeRedirectUri({
  // useProxy: true, // For testing in Expo Go
  native: Platform.select({
    ios: "com.wmdd4950.ytarutani-project:/oauthredirect", // iOS bundle ID
    android: "com.wmdd4950.ytarutani_project:/oauthredirect", // Android package name
  }),
});
// console.log("Redirect URI:", redirectUri);

export const expoWebClientId =
  "469992452339-drpc28p7o5459hbvs5ak7u551ao2u7no.apps.googleusercontent.com";
export const iosClientId =
  "469992452339-526v8s4eba0vpc0terg2gk0frcfp78vl.apps.googleusercontent.com";
export const androidClientId =
  "469992452339-dfh37n3a67iemq46dv4e93taureaett0.apps.googleusercontent.com";
// export const redirectUri =
//   "https://auth.expo.io/@yohei_taru/react-native-udemy2";
