import * as Location from 'expo-location';
import {LocationForegroundPermissionType, useLocationPropsType, useLocationResponseType} from "../types/location";
import {useEffect, useState} from "react";


const useLocation = (props: useLocationPropsType): useLocationResponseType => {
    const {
        isReverseGeocode = true
    } = props

    const [response, requestPermission]: LocationForegroundPermissionType = Location.useForegroundPermissions();
    const [error, setError] = useState(null)
    const [location, setLocation] = useState<Location.LocationObject | undefined>()
    const [reverseGeocode, setReverseGeocode] = useState<Location.LocationGeocodedAddress[] | undefined>()
    const getLocation = async () => {
        try {
            const location: Location.LocationObject = await Location.getCurrentPositionAsync();
            setLocation(location)
        } catch (error: any) {
            setError(error.message)
        }
    }

    const getReverseGeocode = async () => {
        try {
            const reverseGeocode: Location.LocationGeocodedAddress[] = await Location.reverseGeocodeAsync({
                latitude: location?.coords.latitude || 0,
                longitude: location?.coords.longitude || 0,
            })

            setReverseGeocode(reverseGeocode)
        } catch (error: any) {
            setError(error.message)
        }
    }


    useEffect(() => {
        requestPermission()
    }, [])

    useEffect(() => {
        if (response?.status === Location.PermissionStatus.GRANTED) {
            getLocation()
        }
    }, [response?.status])

    useEffect(() => {
        if (location && location?.coords && isReverseGeocode) {
            getReverseGeocode()
        }
    }, [location])

    return {
        response,
        requestPermission,
        error,
        location,
        reverseGeocode,
        getLocation,
        getReverseGeocode
    }
}

export default useLocation
