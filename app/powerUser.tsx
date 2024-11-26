import {Image, StyleSheet, Text, View} from 'react-native';
import MapView from "react-native-maps";

export default function PowerWalaUser() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.naamKaam}>
                    <Text style={styles.naam}>Jayadeep Mc</Text>
                    <Text style={styles.kaam}>Stripper at CC</Text>
                </View>
                <View style={styles.rightWaala}>
                    <Image source={require('../assets/btnNotifications.png')}/>
                    <Image source={require('../assets/01.png')}/>
                </View>
            </View>
            <View style={styles.belowHeader}>
                <Image source={require('../assets/img.png')}/>
                <Text style={styles.wlcm}>Welcome Madafaka</Text>
            </View>
            <Text style={styles.task}>Tasks</Text>
            <View style={styles.taskDiv}>
                <View style={styles.div1}>
                    <Text style={styles.txt}>Add School</Text>
                    <Text style={styles.txt}>Ongoing</Text>
                </View>
                <View style={styles.div2}>
                    <Text></Text>
                    <Image source={require('../assets/Vector 3.png')} />
                </View>
            </View>
            <View style={styles.taskDiv}>
                <View style={styles.div1}>
                    <Text style={styles.txt}>Add Coordinator</Text>
                    <Text style={styles.txt}>Ongoing</Text>
                </View>
                <View style={styles.div2}>
                    <Text></Text>
                    <Image source={require('../assets/Vector 3.png')} />
                </View>
            </View>
            <Text style={styles.task}>Schools Added</Text>
            <View style={styles.badaDiv}>
                <View style={styles.chotaDiv}>
                    <Text style={styles.txt} >School-1</Text>
                    <MapView style={styles.map} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center",
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: '15%',
        backgroundColor: '#509DB9',
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
        width: '100%',
    },
    naamKaam: {
        flexDirection: "column",
        marginLeft: '10%',
    },
    naam: {
        fontSize: 20,
        marginBottom: 2,
        color: '#ffffff',
    },
    kaam: {
        color: '#ffffff',
    },
    rightWaala: {
        width: '15%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: '10%',
    },
    belowHeader: {
        flexDirection: "row",
        backgroundColor: '#84D6F4',
        alignItems: 'center',
        marginTop: '6%',
        justifyContent: "center",
        padding: 15,
        borderRadius: 5,
    },
    wlcm: {
        fontSize: 25,
        color: '#ffffff',
    },
    task: {
        fontSize: 25,
        marginTop: 60,
    },
    taskDiv: {
        backgroundColor: '#90DEFB',
        flexDirection: "row",
        width: '90%',
        justifyContent: 'space-between',
        height: '10%',
        padding: 15,
        marginTop: 15,
        borderRadius: 5,
    },
    div1: {
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    div2: {
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    txt: {
        color: '#007B7F',
    },
    map: {
        marginTop: 60,
        flex: 1,
        width: '75%',
        height: '50%',
    },
    badaDiv: {
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF',
        height: '25%',
        width: '75%',
        marginTop: 15,

    },
    chotaDiv: {
        flexDirection: "column",
        backgroundColor: '#90DEFB',
        height: '75%',
        alignItems: "center",
        padding: 10,
        borderRadius: 7.5,
    },
});
