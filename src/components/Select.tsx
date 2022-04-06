import React, { PropsWithChildren, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, FlatList, ListRenderItem } from 'react-native'
import { ControlledInput, Props } from '../utils/interfaces'
import AbsoluteDropdown from './AbsoluteDropdown'

interface IProps<T> extends Props, ControlledInput {
    data: Array<T>
    renderSelectedItem: (item?: T) => React.ReactNode
    renderListItem: ListRenderItem<T>
    initialSelectedItem?: T
    extraDataBeforeList?: React.ReactNode
    extraDataAfterList?: React.ReactNode
    dropdownStyle?: StyleProp<ViewStyle>
    onSelect?: (selected: any) => void
}

function Select<T = any>({ data, renderSelectedItem, extraDataBeforeList, extraDataAfterList, renderListItem, dropdownStyle, style, initialSelectedItem }: PropsWithChildren<IProps<T>>) {
    const [selected, setSelected] = useState<T | undefined>(initialSelectedItem)
    
    return (
        <View style={style}>
            {renderSelectedItem(selected)}

            <AbsoluteDropdown
                style={dropdownStyle}
            >
                {extraDataBeforeList}
                <FlatList 
                    data={data}
                    renderItem={renderListItem}
                />
                {extraDataAfterList}
            </AbsoluteDropdown>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Select