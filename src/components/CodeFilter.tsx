import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { View, StyleSheet, Text } from 'react-native'
import { useCountries } from '../context/Countries.context'
import { getCountryByCallingCode } from '../services/Countries.service'
import { globalStyles } from '../styles/globals'
import Button from './Button'
import Disabled from './Disabled'
import Input from './Input'

interface IProps {
    onFilter: Function
}

const CodeFilter: FC<IProps> = ({ onFilter }) => {
    const { setSelected } = useCountries()
    const [inserting, setInserting] = useState(false)
    const [fetching, setFetching] = useState(false)
    const { handleSubmit, control } = useForm()

    async function setCodeManually(data: any){
        const countryByCode = await getCountryByCallingCode(data.code)
        setSelected(countryByCode)
        setInserting(false)
        setFetching(false)
    }

    return inserting ? (
        <Disabled enabled={!fetching}>
            <View style={styles.container}>
                <Input 
                    label='Código'
                    keyboardType='number-pad'
                    style={[styles.input, { marginTop: 2 }]}
                    containerStyle={{ margin: 10 }}
                    controlled={{
                        name: 'code',
                        control,
                        rules: {
                            required: true
                        }
                    }}
                />

                <View style={styles.buttonsContainer}>
                    <Button 
                        label='Aceptar'
                        onPress={handleSubmit(setCodeManually)}
                        style={[styles.button, styles.buttonGreen]}
                        textStyle={styles.buttonText}
                    />
                    <Button 
                        label='Cancelar'
                        onPress={() => setInserting(false)}
                        style={[styles.button, styles.buttonRed]}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </Disabled>
    ) : (
        <View style={styles.container}>
            <Input 
                placeholder='Busca por nombre o codigo'
                onChangeText={(text) => onFilter(text)}
                style={styles.input}
            />
            <Text style={styles.text}>No encontraste el país?</Text>
            <Button 
                label='Ingresar Manualmente'
                onPress={() => setInserting(true)}
                style={[styles.button, styles.buttonGreen]}
                textStyle={styles.buttonText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8
    },
    input: {
        backgroundColor: globalStyles.colors.secondaryLight,
        margin: 10,
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 2
    },
    button: {
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    },
    buttonGreen: {
        backgroundColor: globalStyles.colors.primaryLight
    },
    buttonRed: {
        backgroundColor: globalStyles.colors.red
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 2,
        alignSelf: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default CodeFilter