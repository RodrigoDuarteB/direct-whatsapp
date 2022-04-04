import { ControllerProps } from "react-hook-form"
import { StyleProp, ViewStyle, TextStyle, ImageStyle } from "react-native"

export interface Props {
    children?: React.ReactNode
    style?: StyleProp<ViewStyle | TextStyle | ImageStyle>
}

export interface ScreenProps {
    navigation?: any
}

export interface ControlledInput {
    controlled?: Omit<ControllerProps, 'render'> 
}