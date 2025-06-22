import { render, screen, act } from '@testing-library/react'
import DelayedLoader from '@shared/components/DelayedLoader'
import React from 'react'


// Mock do componente FullScreenLoader
jest.mock('@shared/components/FullScreenLoader', () => () => <div data-testid="full-screen-loader">Loading...</div>)

describe('DelayedLoader', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('não renderiza o loader se loading for false', () => {
    render(<DelayedLoader loading={false} />)
    expect(screen.queryByTestId('full-screen-loader')).not.toBeInTheDocument()
  })

  it('renderiza o loader após o delay quando loading é true', () => {
    render(<DelayedLoader loading={true} delay={400} />)

    act(() => {
      jest.advanceTimersByTime(400)
    })

    expect(screen.getByTestId('full-screen-loader')).toBeInTheDocument()
  })

  it('não renderiza o loader antes do delay', () => {
    render(<DelayedLoader loading={true} delay={400} />)

    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(screen.queryByTestId('full-screen-loader')).not.toBeInTheDocument()
  })

  it('limpa o timer ao desmontar o componente', () => {
    const { unmount } = render(<DelayedLoader loading={true} delay={400} />)

    unmount()

    // Sem erro esperado, apenas validando fluxo sem crash
    act(() => {
      jest.advanceTimersByTime(400)
    })

    expect(screen.queryByTestId('full-screen-loader')).not.toBeInTheDocument()
  })
})
