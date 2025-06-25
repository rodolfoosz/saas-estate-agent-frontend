import { useEffect, useState } from 'react'

export function useAuthUser() {
  const [user, setUser] = useState<{ fullName: string } | null>(null)

  useEffect(() => {
    try {
      const userData = localStorage.getItem('user')

      if (userData && userData !== 'undefined') {
        setUser(JSON.parse(userData))
      }
    } catch (err) {
      console.error('Erro ao fazer parse do usuário:', err)
      setUser(null)
    }
  }, [])

  return user
}
