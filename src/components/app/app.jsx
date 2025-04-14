import React from "react";
import ErrorBoundry from '../error-boundry/error-boundry'

const app = () => {
    return (
        <ErrorBoundry>
            <div>App</div>
        </ErrorBoundry>
    )
}

export default app;