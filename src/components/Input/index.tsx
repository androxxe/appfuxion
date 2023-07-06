import {type ReactNode, useState} from 'react'
import {Text, TextInput, TextInputProps, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import colors from 'tailwindcss/colors'
import {TouchableOpacity} from 'react-native-gesture-handler'

interface InputProps extends TextInputProps {
    variant?: 'bordered' | 'shadow'
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    parentStyle?: string
    parentTextStyle?: string
    customTextInput?: ReactNode
    secureTextEntry?: boolean
    error?: string
}

export default function Input(props: InputProps) {
    const {
        variant = 'bordered',
        leftIcon,
        rightIcon,
        parentStyle,
        parentTextStyle,
        customTextInput,
        error,
        secureTextEntry = false,
    } = props

    const [stateSecureTextEntry, setStateSecureTextEntry] = useState(secureTextEntry)

    const defaultTextInput = (
        <TextInput
            className={`text-primary-text font-medium flex items-center justify-center flex-1 ml-2.5 ${parentTextStyle}`}
            placeholderTextColor={colors.slate[400]}
            secureTextEntry={stateSecureTextEntry}
            {...props}
        />
    )
    switch (variant) {
        case 'shadow':
            return (
                <>
                    <View
                        className={`bg-white px-2 py-4 flex-row items-center rounded-lg flex-1 shadow-card ${parentStyle}`}
                    >
                        {leftIcon}
                        {customTextInput ?? defaultTextInput}
                        {rightIcon}
                        {secureTextEntry ? (
                            <TouchableOpacity onPress={() => setStateSecureTextEntry(!stateSecureTextEntry)}>
                                <FontAwesome
                                    name={stateSecureTextEntry ? 'eye-slash' : 'eye'}
                                    size={16}
                                    color={colors.slate[400]}
                                />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    {error && <Text className='text-red-500 text-xs mt-1'>{error}</Text>}
                </>
            )
        case 'bordered':
            return (
                <>
                    <View
                        className={`bg-white px-2 py-4 flex-row items-center border border-slate-400 rounded-lg ${parentStyle}`}
                    >
                        {leftIcon}
                        {customTextInput ?? defaultTextInput}
                        {rightIcon}
                        {secureTextEntry ? (
                            <TouchableOpacity onPress={() => setStateSecureTextEntry(!stateSecureTextEntry)}>
                                <FontAwesome
                                    name={stateSecureTextEntry ? 'eye-slash' : 'eye'}
                                    size={16}
                                    color={colors.slate[400]}
                                />
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    {error && <Text className='text-red-500 text-xs mt-1'>{error}</Text>}
                </>
            )
    }
}
