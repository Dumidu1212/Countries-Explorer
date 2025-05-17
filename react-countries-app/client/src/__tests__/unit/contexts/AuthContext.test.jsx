// src/__tests__/unit/contexts/AuthContext.test.jsx
import { renderHook, act } from '@testing-library/react'
import { AuthProvider, AuthContext } from '../../../contexts/AuthContext.jsx'
import React from "react";

describe('AuthContext (unit)', () => {
    it('login and logout update user', () => {
        const { result } = renderHook(() => React.useContext(AuthContext), {
            wrapper: AuthProvider
        })

        expect(result.current.user).toBeNull()
        act(() => result.current.login({ name: 'Me' }))
        expect(result.current.user).toEqual({ name: 'Me' })
        act(() => result.current.logout())
        expect(result.current.user).toBeNull()
    })
})
