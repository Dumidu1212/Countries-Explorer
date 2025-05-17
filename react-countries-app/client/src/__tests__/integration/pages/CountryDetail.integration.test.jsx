import React from 'react'
import { vi } from 'vitest'
// Stub every MUI icon to a simple <span>
vi.mock('@mui/icons-material', () =>
    new Proxy(
        { __esModule: true },
        {
            get: (target, iconName) => (props) => <span data-testid={`icon-${String(iconName)}`} {...props} />,
        }
    )
)

import rest from 'msw'
import { setupServer } from 'msw/node'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CountryDetail from '../../../pages/CountryDetail'

const sampleCountry = {
    name: { common: 'Testland' },
    flags: { svg: 'https://flags.test/test.svg' },
    population: 123456,
    area: 654321,
    region: 'TestRegion',
    capital: ['Testville'],
    tld: ['.tl'],
    currencies: { TST: { name: 'TestDollar', symbol: '$' } },
    languages: { tst: 'Testish' },
    borders: ['ABC', 'DEF'],
    cca3: 'TST',
}

const server = setupServer(
    // mock the alpha/:code endpoint
    rest.get('https://restcountries.com/v3.1/alpha/:code', (req, res, ctx) => {
        return res(ctx.json([sampleCountry]))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<CountryDetail /> (integration)', () => {
    it('renders Overview and neighbor chip', async () => {
        render(
            <MemoryRouter initialEntries={['/country/TST']}>
                <Routes>
                    <Route path="/country/:code" element={<CountryDetail />} />
                </Routes>
            </MemoryRouter>
        )

        // Wait for the tabs to appear
        expect(await screen.findByRole('tab', { name: /overview/i })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: /stats/i })).toBeInTheDocument()

        // And the neighbor buttons
        expect(screen.getByRole('button', { name: /abc/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /def/i })).toBeInTheDocument()
    })
})
