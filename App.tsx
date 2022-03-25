import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import History from './src/screens/History'
import Home from './src/screens/Home'

interface IProps {

}

const Stack = createNativeStackNavigator()

const App: FC<IProps> = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName='Home' 
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name='Home' component={Home}/>
                <Stack.Screen name='History' component={History}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App