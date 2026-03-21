# KU Parking Mobile App

Expo mobile app for browsing live parking spot availability from `mobile_backend`.

## Connect to `mobile_backend`

The app fetches parking spots from:

`GET {EXPO_PUBLIC_API_URL}/parking-spots`

Set `EXPO_PUBLIC_API_URL` before starting Expo:

```bash
EXPO_PUBLIC_API_URL=http://localhost:8080 npx expo start
```

For Android emulator (when backend runs on your host machine):

```bash
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080 npx expo start
```

If the backend is unreachable, the app falls back to bundled sample parking data.

## Run

```bash
npm install
npx expo start
```
