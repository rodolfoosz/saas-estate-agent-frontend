import { formatCep, formatCpf, formatPhone } from "@shared/utils/formatters"


describe('formatCpf', () => {
  it('should format a plain CPF string correctly', () => {
    expect(formatCpf('12345678901')).toBe('123.456.789-01')
  })

  it('should remove non-digit characters before formatting', () => {
    expect(formatCpf('123.456.789-01')).toBe('123.456.789-01')
  })

  it('should return incomplete formatted CPF if fewer digits are provided', () => {
    expect(formatCpf('12345')).toBe('123.45')
  })
})

describe('formatPhone', () => {
  it('should format a plain phone number correctly', () => {
    expect(formatPhone('11987654321')).toBe('(11) 98765-4321')
  })

  it('should handle formatted input and clean it', () => {
    expect(formatPhone('(11)98765-4321')).toBe('(11) 98765-4321')
  })

  it('should return partial format for short input', () => {
    expect(formatPhone('11987')).toBe('(11) 987')
  })
})

describe('formatCep', () => {
  it('should format a plain CEP string correctly', () => {
    expect(formatCep('12345678')).toBe('12345-678')
  })

  it('should clean already formatted CEP and reformat it', () => {
    expect(formatCep('12345-678')).toBe('12345-678')
  })

  it('should return partial format for incomplete CEP', () => {
    expect(formatCep('123')).toBe('123')
    expect(formatCep('123456')).toBe('12345-6')
  })
})
