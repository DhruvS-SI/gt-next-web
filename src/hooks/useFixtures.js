import { useState, useCallback, useEffect } from 'react'
import { API_BASE } from '@/lib/apiConfig'

export const useFixtures = ({
  url,
  baseUrl = API_BASE,
  autoFetch = true,
} = {}) => {

  const [fixtures, setFixtures] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(autoFetch && !!url)
  const [error, setError] = useState(null)

  const buildUrl = useCallback(() => {
    const fullUrl = baseUrl ? `${baseUrl}${url}` : url
    return fullUrl
  }, [url, baseUrl])

  const fetchFixtures = useCallback(async () => {
    try {
      const fetchUrl = buildUrl()
      const response = await fetch(fetchUrl)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch fixtures: ${response.statusText}`)
      }
      
      const result = await response.json()
      return Array.isArray(result) ? result : []
    } catch (err) {
      console.error('Failed to fetch fixtures:', err)
      // Don't throw, return empty array so component can handle gracefully
      return []
    }
  }, [buildUrl])

  const fetchInitial = useCallback(async () => {
    setInitialLoading(true)
    setError(null)

    const fixturesData = await fetchFixtures()
    
    if (fixturesData && Array.isArray(fixturesData)) {
      setFixtures(fixturesData)
    } else {
      setFixtures([])
    }
    
    setInitialLoading(false)
    setLoading(false)
  }, [fetchFixtures])

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    const fixturesData = await fetchFixtures()
    
    if (fixturesData && Array.isArray(fixturesData)) {
      setFixtures(fixturesData)
    } else {
      setFixtures([])
    }
    
    setLoading(false)
  }, [fetchFixtures])

  useEffect(() => {
    if (autoFetch && url) {
      fetchInitial()
    }
  }, [autoFetch, url, fetchInitial])

  return {
    fixtures,
    loading: initialLoading || loading,
    initialLoading,
    error,
    refetch,
  }
}
