import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'typeorm-capacitor-test',
    webDir: 'build/static',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        CapacitorSQLite: {
            iosDatabaseLocation: 'Library/CapacitorDatabase',
            iosIsEncryption: true,
            iosKeychainPrefix: 'sqlite-app-starter',
            iosBiometric: {
                biometricAuth: false,
                biometricTitle: "Biometric login for capacitor sqlite"
            },
            androidIsEncryption: true,
            androidBiometric: {
                biometricAuth: false,
                biometricTitle: "Biometric login for capacitor sqlite",
                biometricSubTitle: "Log in using your biometric"
            },
        }
    }
};

export default config;
