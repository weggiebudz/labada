import { Platform, StatusBar } from "react-native"

export const COLORS = {
    PRIMARY: '#34495E',
    SECONDARY: 'white'
}

export const SAFEAREAVIEW = {
    droidsafearea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
}
