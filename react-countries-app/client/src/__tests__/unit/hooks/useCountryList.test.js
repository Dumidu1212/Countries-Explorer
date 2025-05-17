// src/__tests__/unit/hooks/useCountryList.test.js
import { renderHook, act, waitFor } from '@testing-library/react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { useCountryList } from '../../../hooks/useCountryList.js'

describe('useCountryList (unit)', () => {
    let mock
    beforeEach(() => {
        mock = new MockAdapter(axios)
    })
    afterEach(() => mock.restore())

    it('fetchAllCountries when no args', async () => {
        const sample = [{ name: { common: 'A' }, cca3: 'AAA' }]
        mock.onGet(/\/all$/).reply(200, sample)

        const { result } = renderHook(() => useCountryList('', '', ''))
        await waitFor(() => {
            expect(result.current.countries).toEqual(sample)
            expect(result.current.error).toBe('')
        })
    })

    it('404 yields “No countries found.”', async () => {
        mock.onGet(/\/name\/bad/).reply(404)

        const { result } = renderHook(() => useCountryList('bad', '', ''))
        await waitFor(() => {
            expect(result.current.error).toBe('No countries found.')
        })
    })
})
