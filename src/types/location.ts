import {LocationGeocodedAddress, LocationObject, LocationPermissionResponse} from 'expo-location'

export type LocationForegroundPermissionType = [
        LocationPermissionResponse | null, () => Promise<LocationPermissionResponse>, () => Promise<LocationPermissionResponse>
]

export type useLocationResponseType = {
    response: LocationPermissionResponse | null,
    requestPermission: () => Promise<LocationPermissionResponse>,
    error: string | null,
    location: LocationObject | undefined,
    reverseGeocode: LocationGeocodedAddress[] | undefined,
    getLocation: () => void,
    getReverseGeocode: () => void
}

export  type useLocationPropsType = {
    getReverseCode: boolean
}