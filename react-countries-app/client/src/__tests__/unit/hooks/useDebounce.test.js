// src/__tests__/unit/hooks/useDebounce.test.js
import { renderHook, act } from '@testing-library/react'
import useDebounce from '../../../hooks/useDebounce.js'
import { vi } from 'vitest'

describe('useDebounce (unit)', () => {
    it('delays the value update by given ms', () => {
        vi.useFakeTimers()
        const { result, rerender } = renderHook(
            ({ val }) => useDebounce(val, 200),
            { initialProps: { val: 'x' } }
        )
        expect(result.current).toBe('x')

        rerender({ val: 'xy' })
        expect(result.current).toBe('x')

        act(() => vi.advanceTimersByTime(200))
        expect(result.current).toBe('xy')
        vi.useRealTimers()
    })
})
