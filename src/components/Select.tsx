import React, { PropsWithChildren, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, FlatList, TouchableWithoutFeedback, ListRenderItemInfo } from 'react-native'
import { ControlledInput, Props } from '../utils/interfaces'
import AbsoluteDropdown from './AbsoluteDropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { globalStyles } from '../styles/globals'
import IconButton from './IconButton'

interface IProps<T> extends Props, ControlledInput {
    data: Array<T>
    renderSelectedItem: (item?: T) => React.ReactNode
    renderListItem: (info: ListRenderItemInfo<T>) => React.ReactNode
    initialSelectedItem?: T
    extraDataBeforeList?: React.ReactNode
    extraDataAfterList?: React.ReactNode
    dropdownStyle?: StyleProp<ViewStyle>
    onSelect?: (selected: T) => void
}

function Select<T = any>(props: PropsWithChildren<IProps<T>>) {
    const [selected, setSelected] = useState<T | undefined>(props.initialSelectedItem)
    const [downed, setDowned] = useState(false)
    
    return (
        <View style={[styles.container, props.style]}>
            {props.renderSelectedItem(selected)}

            <IconButton 
                icon={
                    <MaterialIcons 
                        name={ downed ? 'expand-less' : 'expand-more' } 
                        color={'white'} 
                        size={20}
                        style={{ alignSelf: 'flex-end' }}
                    />
                }
                onPress={() => setDowned(!downed)}
            />

            {/* downed &&
                <View
                    style={[styles.dropdown, props.dropdownStyle]}
                >
                    {props.extraDataBeforeList}
                    <View style={{height: '100%', width: '100%'}}>

                    <FlatList 
                        data={props.data}
                        renderItem={(info) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        props.onSelect && props.onSelect(info.item)
                                        setSelected(info.item)
                                        setDowned(false)
                                    }}
                                >
                                    {props.renderListItem(info)}
                                </TouchableWithoutFeedback>
                            )
                        }}
                    />
                    </View>

                    {props.extraDataAfterList}
                </View> */
            }
            <AbsoluteDropdown
                style={props.dropdownStyle}
                dropped={downed}
            >
                {props.extraDataBeforeList}

                <FlatList 
                    data={props.data}
                    renderItem={(info) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    props.onSelect && props.onSelect(info.item)
                                    setSelected(info.item)
                                    setDowned(false)
                                }}
                            >
                                {props.renderListItem(info)}
                            </TouchableWithoutFeedback>
                        )
                    }}
                    style={{width: '100%'}}
                />

                {props.extraDataAfterList}
            </AbsoluteDropdown>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: globalStyles.colors.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10,
        width: 50,
    },
    dropdown: {
        backgroundColor: globalStyles.colors.secondary,
        position: 'absolute',
        shadowColor: globalStyles.colors.primary,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.27,
        borderRadius: 10,
        top: '100%',
        left: 0,
    }
})

export default Select