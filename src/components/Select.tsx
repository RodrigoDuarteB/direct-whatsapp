import React, { PropsWithChildren, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, FlatList, TouchableWithoutFeedback, ListRenderItemInfo, Text, TouchableOpacity, VirtualizedList } from 'react-native'
import { ControlledInput, Props } from '../utils/interfaces'
import AbsoluteDropdown from './AbsoluteDropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { globalStyles } from '../styles/globals'
import IconButton from './IconButton'

interface IProps<T> extends Props, ControlledInput {
    data: Array<T>
    renderItem?: (info: ListRenderItemInfo<T>) => React.ReactNode
    renderSelectedItem?: (item?: T) => React.ReactNode
    initialSelectedItem?: T
    prependChild?: React.ReactNode
    appendChild?: React.ReactNode
    dropdownStyle?: StyleProp<ViewStyle>
    onSelect?: (selected: T) => void
}

function Select<T = any>(props: PropsWithChildren<IProps<T>>) {
    const [selected, setSelected] = useState<T | undefined>(props.initialSelectedItem)
    const [downed, setDowned] = useState(false)
    
    return (
        <View>
            {/* select */}
            <View 
                style={[styles.container, props.style]}
            >
                {props.renderSelectedItem ? 
                    props.renderSelectedItem(selected) : 
                    <View>
                        <Text>{selected}</Text>
                    </View>
                }

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
            </View>

            {/* { downed && <FlatList<T> 
                    data={props.data}
                    initialNumToRender={4}
                    renderItem={(info) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    props.onSelect && props.onSelect(info.item)
                                    setSelected(info.item)
                                    setDowned(false)
                                }}
                            >
                                {props.renderItem ? 
                                    props.renderItem(info) :
                                    <View style={{ 
                                        alignItems: 'center',
                                        backgroundColor: info.item == selected ? 'white' : 'black'
                                    }}>
                                        <Text style={{
                                            color: info.item == selected ? 'black' : 'black'
                                        }}>
                                            {info.item}
                                        </Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        )
                    }}
                    style={{width: '100%', height: 150, position: 'absolute', top: '100%', zIndex: 3}}
                />} */}

            {/* dropdown */}
            <AbsoluteDropdown
                style={props.dropdownStyle}
                dropped={downed}
            >
                {
                    props.data.length > 0 ?
                <>
                    {props.prependChild}
                    
                    <FlatList<T> 
                        data={props.data}
                        initialNumToRender={4}
                        renderItem={(info) => {
                            return (
                                <TouchableOpacity
                                    delayPressIn={50}
                                    onPress={() => {
                                        props.onSelect && props.onSelect(info.item)
                                        setSelected(info.item)
                                        setDowned(false)
                                    }}
                                >
                                    {props.renderItem ? 
                                        props.renderItem(info) :
                                        <View style={{ 
                                            alignItems: 'center',
                                            backgroundColor: info.item == selected ? 'white' : 'black'
                                        }}>
                                            <Text style={{
                                                color: info.item == selected ? 'black' : 'white'
                                            }}>
                                                {info.item}
                                            </Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            )
                        }}
                        style={{width: '100%'}}
                    />

                    {props.appendChild}
                </>
                    : 
                <Text>Sin datos</Text>
                }
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
        width: 70,
    }
})

export default Select