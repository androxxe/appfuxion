import {CommonActions, createNavigationContainerRef, StackActions,} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params: any = null) {
    if (navigationRef.isReady()) {
        // @ts-ignore
        return navigationRef.navigate(name, params);
    } else {
        throw new Error("Navigation is not ready!");
    }
}

export function push(name: string, params: any, key = null) {
    if (navigationRef.isReady()) {
        return navigationRef.dispatch(
            CommonActions.navigate({
                name,
                params: {...params},
                key,
            } as any)
        );
    } else {
        throw new Error("Navigation is not ready!");
    }
}

export function replace(name: string, params: any = null) {
    if (navigationRef.isReady()) {
        return navigationRef.current.dispatch(StackActions.replace(name, params));
    } else {
        throw new Error("Navigation is not ready!");
    }
}

export function goBack() {
    if (navigationRef.isReady()) {
        if (navigationRef.canGoBack()) {
            return navigationRef.goBack();
        } else {
            return false;
        }
    } else {
        throw new Error("Navigation is not ready!");
    }
}

export function popToTop() {
    if (navigationRef.isReady()) {
        StackActions.popToTop();
    } else {
        throw new Error("Navigation is not ready!");
    }
}

export function reset(screen) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{name: screen}],
        });
    } else {
        throw new Error("Navigation is not ready!");
    }
}
