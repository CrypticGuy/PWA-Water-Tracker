import React, {useState, useCallback, useEffect} from "react";
import {get, set} from 'idb-keyval';

export default function usePersistedState(keyToPersistWith, defaultState) {
    const [state, setState] = useState(undefined);

    useEffect(() => {
        get(keyToPersistWith).then(retrievedState =>
            // If a value is retrieved then use it; otherwise default to defaultValue
            setState(retrievedState ? retrievedState : defaultState));
    }, [keyToPersistWith, setState, defaultState]);

    const setPersistedValue = useCallback((newValue) => {
        setState(newValue);
        set(keyToPersistWith, newValue);
    }, [keyToPersistWith, setState]);

    return [state, setPersistedValue];
}