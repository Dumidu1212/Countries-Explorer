// src/__tests__/unit/contexts/FavoritesContext.test.jsx
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { FavoritesProvider, FavoritesContext } from '../../../contexts/FavoritesContext.jsx'
import { AuthContext } from '../../../contexts/AuthContext.jsx'

const wrapper = ({ children }) => (
    <AuthContext.Provider value={{ user: { name: 'Bob' } }}>
        <FavoritesProvider>{children}</FavoritesProvider>
    </AuthContext.Provider>
)

describe('FavoritesContext (unit)', () => {
    beforeEach(() => localStorage.clear())

    it('toggles and persists favorites', () => {
        const { result } = renderHook(() => React.useContext(FavoritesContext), { wrapper })
        expect(result.current.list).toEqual([])

        act(() => result.current.toggle('XYZ'))
        expect(result.current.list).toEqual(['XYZ'])
        expect(localStorage.getItem('favs_Bob')).toBe(JSON.stringify(['XYZ']))

        act(() => result.current.toggle('XYZ'))
        expect(result.current.list).toEqual([])
    })
})
