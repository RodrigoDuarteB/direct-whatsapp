import React, { FC, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Select from '../components/Select'
import { getCountryByCallingCode } from '../services/Countries.service'

interface IProps {

}

const Test: FC<IProps> = (props) => {

    useEffect(() => {
        getCountryByCallingCode('59')
        .then(res => console.log(res))
    }, [])

    return (
        <View>
            <Text style={styles.text}>Holaaa</Text>
            <Select 
                data={[1, 2, 3, 4, 5, 6, 7]}
                renderSelectedItem={(item) => {
                    return (
                        <View>
                            <Text style={{ color: 'white' }}>{item}</Text>
                        </View>
                    )
                }}
                renderListItem={({ item }) => {
                    return (
                        <View style={{ backgroundColor: 'pink', alignItems: 'center' }}>
                            <Text>{item}</Text>
                        </View>
                    )
                }}
                extraDataBeforeList={
                    <Text>Números</Text>
                }
                extraDataAfterList={
                    <Text>End</Text>
                }
                style={styles.select}
                dropdownStyle={{
                    top: '150%',
                    left: 3,
                    alignItems: 'center',
                    maxHeight: '60%',
                    paddingVertical: 5, 
                    paddingHorizontal: 1,
                    width: 150,
                    zIndex: 1
                }}
                onSelect={(item) => console.log(item)}
            />
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
        alignSelf: 'flex-start'
    }
})

export default Test