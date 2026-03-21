import Constants from "expo-constants";
import { Platform } from "react-native";
const { manifest2 } = Constants;


const resolveApiBaseUrl = (): string => {
    const envApiBaseUrl = process.env.EXPO_PUBLIC_API_URL;
    if (envApiBaseUrl) {
        return envApiBaseUrl;
    }

    const debuggerHost = manifest2?.extra?.expoGo?.debuggerHost?.split(":")[0];
    if (debuggerHost) {
        return `http://${debuggerHost}:8080`;
    }

    return Platform.OS === "android" ? "http://10.0.2.2:8080" : "http://localhost:8080";
};
export const Config = {
    apiBaseUrl: resolveApiBaseUrl(),
    colorThresholds: {
        green: 0.7,  // >= 50% available
        yellow: 0.30 // >= 15% available (below green)
        // Anything below the yellow threshold defaults to red (< 15%)
    }
};
