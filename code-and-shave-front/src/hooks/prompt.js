import React, { useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export const usePrompt = (message, when) => {
    const navigator = React.useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const unblock = navigator.navigator.block((tx) => {
            if (window.confirm(message)) {
                unblock();
                tx.retry();
            }
        });

        return unblock;
    }, [navigator, message, when]);
}