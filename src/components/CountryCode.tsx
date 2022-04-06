import React, { FC, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native'
import { useCountries } from '../context/Countries.context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AbsoluteDropdown, { DropdownProps } from './AbsoluteDropdown'
import Divider from './Divider'
import { globalStyles } from '../styles/globals'

interface IProps {

}

const CountryCode: FC<IProps> = (props) => {
    const { selected } = useCountries()
    const [dropped, setDropped] = useState(false)

    const hasMoreThanOneSuffix = selected ? selected.idd.suffixes.length > 1 : false

    return selected ? (
        <TouchableOpacity
            onPress={() => hasMoreThanOneSuffix && setDropped(!dropped)}
            style={styles.container}
        >
            <Text style={[styles.code]}>{`${selected.code.root}(${selected.code.suffix})`}</Text>
            {
                hasMoreThanOneSuffix && 
                <MaterialIcons 
                    name={ dropped ? 'expand-less' : 'expand-more' } 
                    color={'white'} 
                    size={20}
                />
            }
            <SuffixesDropdown dropped={dropped && hasMoreThanOneSuffix}/>
        </TouchableOpacity>
    ) : (
        <View style={styles.container}>
            <Text>--</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: globalStyles.colors.secondaryLight,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        marginBottom: 5,
        paddingHorizontal: 5
    },
    code: {
        color: 'white',
        fontSize: 13,
        marginLeft: 3,
        fontWeight: 'bold'
    }
})

export default CountryCode



interface ISuffixesDropdownProps extends DropdownProps {

}

const SuffixesDropdown: FC<ISuffixesDropdownProps> = (props) => {
    const { selected } = useCountries()

    return (
        <AbsoluteDropdown {...props} style={suffixesDropdownStyles.container} >
            <Text style={suffixesDropdownStyles.title}>Sufijos</Text>

            <Divider style={suffixesDropdownStyles.divider}/>

            {
                selected && 
                <FlatList 
                    data={selected.idd.suffixes}
                    renderItem={({ item, index }) => 
                        <SuffixBadge 
                            key={index}
                            suffix={item}
                            isSelected={item === selected.code.suffix}
                        />
                    }
                />
            }
        </AbsoluteDropdown>
    )
}

const suffixesDropdownStyles = StyleSheet.create({
    container: {
        zIndex: 2,
        top: 20,
        elevation: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
        maxHeight: 300,
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%'
    },
    divider: {
        borderColor: 'white',
        marginVertical: 3
    },
    suffixesContainer: {
        alignItems: 'center'
    },
    title: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    }
})



interface ISuffixBadgeProps {
    suffix: string
    isSelected?: boolean
}

const SuffixBadge: FC<ISuffixBadgeProps> = ({ suffix, isSelected }) => {
    const { selected, setSelected } = useCountries()

    function changeSuffix(){
        selected && setSelected({...selected, code: {
            ...selected.code, 
            suffix
        }})
    }

    return (
        <TouchableOpacity
            onPress={() => changeSuffix()}
            style={[suffixBadgeStyles.container, { backgroundColor: isSelected ? '#C4C4C4' : '' }]}
        >
            <Text style={[suffixBadgeStyles.text, { color: isSelected ? 'black' : 'white' }]}>
                {suffix}
            </Text>
        </TouchableOpacity>
    )
}

const suffixBadgeStyles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 5
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})