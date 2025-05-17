// vitest.setup.js
import React from 'react'
import { vi } from 'vitest'

// mock entire @mui/icons-material so each import returns a dummy component
vi.mock('@mui/icons-material', () => {
    return new Proxy(
        {},
        {
            get(target, iconName) {
                // return a React component that renders nothing (or an empty <svg/>)
                return () => <svg data-testid={`icon:${String(iconName)}`} />
            },
        }
    )
})
