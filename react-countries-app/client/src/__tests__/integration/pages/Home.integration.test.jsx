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
import Home from '../../../pages/Home'

const countries = [
    {
        name: { common: 'Testland' },
        flags: { svg: 'https://flags.test/test.svg' },
        population: 1000000,
        region: 'TestRegion',
        capital: ['Testopolis'],
        cca3: 'TST',
    },
    {
        name: { common: 'Sampleia' },
        flags: { svg: 'https://flags.test/sample.svg' },
        population: 500000,
        region: 'SampleRegion',
        capital: ['Sample City'],
        cca3: 'SMP',
    },
]

const server = setupServer(
    rest.get('https://restcountries.com/v3.1/all', (req, res, ctx) => {
        return res(ctx.json(countries))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('<Home /> integration', () => {
    it('fetches and displays a list of countries', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </MemoryRouter>
        )

        // Wait for the first country to show up
        expect(await screen.findByText('Testland')).toBeInTheDocument()
        // And the second one
        expect(screen.getByText('Sampleia')).toBeInTheDocument()
    })
})
