import { StyleSheet, View, Pressable, Text } from "react-native";
//import PlaySong from './audioManip.js'

export default function Button({label, width}) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={() => console.log('pressed')}>
                <Text style={styles.buttonLabel}> {label} </Text>
            </Pressable>
        </View>
    );
}


const styles= StyleSheet.create ({
    buttonContainer: {
        width: 40,
        height: 40,
        marginHorizontal: 6,
        marginVertical: 24,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        top: 40,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'powderblue',
        borderColor: '#fffnpm',
        borderRadius: 10,
        width: 40,
        height: 40,
    },
    buttonIcon: {
        flex: 1,
        padding: 2,
    },
    buttonLabel: {
        color: 'black',
        fontSize: 9,
    },
});