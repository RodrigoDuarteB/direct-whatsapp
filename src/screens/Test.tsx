import React, { FC, useEffect, useState, memo } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import Select from '../components/Select'
import { getCountryByCallingCode } from '../services/Countries.service'

interface IProps {

}

const Test: FC<IProps> = (props) => {
    const [selected, setSelected] = useState(0)
    const [dropped, setDropped] = useState(false)

    useEffect(() => {
        /* getCountryByCallingCode('1212')
        .then(res => console.log(res)) */
    }, [])

    function generateNthArray(nth: number) {
        var array = []
        for (let i = 0; i < nth; i++) {
            array[i] = i
        }
        return array
    }

    const _renderItem = (info: any) => {
        return (
            <Text style={{ color: 'black' }}>{info.item}</Text>
        )
    }

    return (
        <View style={{padding: 15}}>
            <Text style={styles.text}>{selected}</Text>

            {/* select */}
            <View>
                {/* select */}
                <TouchableOpacity
                    onPress={() => setDropped(!dropped)}
                >
                    <Text style={{ color: 'black', backgroundColor: 'green', padding: 5 }}>
                        { selected }
                    </Text>
                </TouchableOpacity>
                
                {/* dropdown */}
                {
                    dropped && 
                    <View style={{
                        backgroundColor: 'pink',
                        position: 'absolute',
                        top: '100%',
                        width: '100%',
                    }}>
                        <FlatList 
                            data={generateNthArray(105)}
                            renderItem={_renderItem}
                            initialNumToRender={8}
                        />
                    </View>
                }
                {/* <Text style={{ color: 'black', backgroundColor: 'green', padding: 5 }}>
                    Hola
                </Text> */}
            </View>

            
            {/* <Select<number> 
                data={generateNthArray(180)}
                renderItem={({ item }) => {
                    return (
                        <View style={{ backgroundColor: selected == item ? 'white' : 'black', alignItems: 'center', paddingVertical: 12 }}>
                            <Text style={{ color: selected == item ? 'black' : 'white'}}>{item}</Text>
                        </View>
                    )
                }}
                renderSelectedItem={(item) => {
                    return (
                        <View>
                            <Text style={{ color: 'white' }}>{item}</Text>
                        </View>
                    )
                }}
                prependChild={
                    <Text>Números</Text>
                }
                appendChild={
                    <Text>End</Text>
                }
                style={styles.select}
                dropdownStyle={{
                    top: '105%',
                    alignItems: 'center',
                    paddingVertical: 5, 
                    paddingHorizontal: 1,
                    width: 150,
                    zIndex: 999
                }}
                onSelect={(item) => setSelected(item)}
            /> */}
            {/* <Text style={{ backgroundColor: 'pink'}}>Holaa</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        backgroundColor: 'pink',
        width: 50
    },
    select: {
        paddingVertical: 10,
        paddingHorizontal: 15
    }
})

export default Test