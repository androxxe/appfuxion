import SelectDropdown, {type SelectDropdownProps} from 'react-native-select-dropdown'
import {Text, View} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

interface SelectProps {
    data: SelectDropdownProps['data'] | Array<{ label: string; value: string }>
    onSelect: SelectDropdownProps['onSelect']
    rightIcon?: React.ReactNode
    buttonPlaceholder?: SelectDropdownProps['defaultButtonText']
    leftIcon?: React.ReactNode
    disabled?: SelectDropdownProps['disabled']
    defaultValue?: SelectDropdownProps['defaultValue']
    defaultValueByIndex?: SelectDropdownProps['defaultValueByIndex']
    searchPlaceHolderColor?: string
    isRenderCustomizedButtonChild?: boolean
    label?: string

    [key: string]: any // Index signature for additional props
}

export default function Select(props: SelectProps) {
    const {
        data = [],
        disabled,
        leftIcon,
        rightIcon,
        buttonPlaceholder,
        onSelect,
        searchPlaceHolderColor,
        isRenderCustomizedButtonChild = true,
        label
    } = props

    let isPlainArray = true
    if (
        data.length > 0 &&
        typeof data[0] === 'object' &&
        data[0].hasOwnProperty('label') &&
        data[0].hasOwnProperty('value')
    ) {
        isPlainArray = false
    }

    return (
        <View>
            {label && <Text className={"mb-2"}>{label}</Text>}
            <SelectDropdown
                disabled={disabled}
                data={isPlainArray ? data : data.map(item => item.label)}
                renderDropdownIcon={isOpen => (
                    <Ionicons
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={colors.slate[400]}
                    />
                )}
                renderCustomizedButtonChild={
                    isRenderCustomizedButtonChild
                        ? selectedItem => {
                            return (
                                <View className='flex-row'>
                                    {leftIcon && <>{leftIcon}</>}
                                    <Text
                                        className={`text-sm ${leftIcon && 'ml-2.5'} ${
                                            selectedItem ? 'text-primary-black' : 'text-primary-dark-gray'
                                        }`}
                                    >
                                        {selectedItem ? selectedItem : buttonPlaceholder}
                                    </Text>
                                </View>
                            )
                        }
                        : false as any
                }
                onSelect={onSelect}
                defaultButtonText={buttonPlaceholder}
                {...props}
                searchPlaceHolderColor={searchPlaceHolderColor ?? colors.slate[400]}
                buttonStyle={{
                    borderRadius: 8,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: colors.slate[100],
                    paddingHorizontal: 14,
                    width: '100%',
                    ...(props as any).buttonStyle
                }}
                buttonTextStyle={{
                    fontSize: 14,
                    textAlign: 'left',
                    marginHorizontal: 0,
                    color: colors.slate[400],
                    fontWeight: '500',
                    ...(props as any).buttonTextStyle
                }}
                rowTextStyle={{
                    fontSize: 14,
                    textAlign: 'left',
                    color: colors.slate[400],
                    ...(props as any).rowTextStyle
                }}
                dropdownStyle={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: colors.slate[100],
                    ...(props as any).dropdownStyle
                }}
                dropdownOverlayColor='rgba(0, 0, 0, 0.1)'
                rowStyle={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    ...(props as any).rowStyle
                }}
                selectedRowTextStyle={{
                    color: colors.slate[800],
                    ...(props as any).selectedRowTextStyle
                }}
            />
        </View>
    )
}
