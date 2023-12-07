import { StyleSheet, View, Pressable, Text } from "react-native";

export default function Button({label}) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => alert('button was pressed')}>
                <Text style={styles.buttonLabel}>{label} </Text>
            </Pressable>
        </View>
    );
}

const styles= StyleSheet.create ({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    button: {
        backgroundColor: 'powderblue',
        borderColor: '#fff',
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        flex: 1,
        padding: 200,
    },
    buttonLabel: {
        color: 'black',
        fontSize: 16,
    },
});