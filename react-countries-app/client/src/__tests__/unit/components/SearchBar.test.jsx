// src/__tests__/unit/components/SearchBar.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from '../../../components/SearchBar/SearchBar.jsx'
import { describe, it, expect, vi } from 'vitest'

describe('SearchBar (unit)', () => {
    it('renders input and calls onSearch', () => {
        const onSearch = vi.fn()
        render(<SearchBar value="foo" onSearch={onSearch} />)
        const input = screen.getByPlaceholderText(/search for a country/i)
        fireEvent.change(input, { target: { value: 'bar' } })
        expect(onSearch).toHaveBeenCalledWith('bar')
    })
})
