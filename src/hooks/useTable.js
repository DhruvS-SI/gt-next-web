import { useState, useCallback, useEffect } from 'react'
import { API_BASE } from '@/lib/apiConfig'


export const useTable = ({
  url,
  baseUrl = API_BASE,
  initialPage = 1,
  pageSize = 10,
  enableLoadMore = false,
  autoFetch = true,
} = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(autoFetch && !!url)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const buildUrl = useCallback((page = null, limit = null) => {
    const fullUrl = baseUrl ? `${baseUrl}${url}` : url
    const separator = fullUrl.includes('?') ? '&' : '?'
    const params = []
    
    if (page !== null) {
      params.push(`_page=${page}`)
    }
    if (limit !== null) {
      params.push(`_limit=${limit}`)
    }
    
    return params.length > 0 ? `${fullUrl}${separator}${params.join('&')}` : fullUrl
  }, [url, baseUrl])


  const fetchData = useCallback(async (page = null, limit = null) => {
    if (!url) return []

    try {
      const fetchUrl = enableLoadMore 
        ? buildUrl(page || initialPage, limit || pageSize)
        : buildUrl()
      
      const response = await fetch(fetchUrl)
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`)
      
      const result = await response.json()
      return Array.isArray(result) ? result : []
    } catch (err) {
      console.error('Failed to fetch data:', err)
      throw err
    }
  }, [url, baseUrl, enableLoadMore, initialPage, pageSize, buildUrl])

 
  const fetchInitial = useCallback(async () => {
    if (!url) return

    setInitialLoading(true)

    try {
      // For loadMore tables, fetch with initial page and pageSize
      // For simple tables, fetch without pagination params
      const initialData = enableLoadMore 
        ? await fetchData(initialPage, pageSize)
        : await fetchData()
      
      if (initialData && Array.isArray(initialData)) {
        setData(initialData)
        setCurrentPage(initialPage)
        // If initial data is less than pageSize, no more data available
        if (enableLoadMore && initialData.length < pageSize) {
          setHasMore(false)
        } else {
          setHasMore(true)
        }
      }
    } catch (err) {
      console.error('Failed to fetch initial data:', err)
    } finally {
      setInitialLoading(false)
      setLoading(false)
    }
  }, [fetchData, initialPage, pageSize, enableLoadMore, url])

 

  const loadMore = useCallback(async () => {
    if (!enableLoadMore || loading || !hasMore || !url) return

    setLoading(true)

    try {
      const nextPage = currentPage + 1
      const newData = await fetchData(nextPage, pageSize)
      
      if (newData && Array.isArray(newData)) {
        if (newData.length === 0) {
          setHasMore(false)
        } else {
          setData(prev => [...prev, ...newData])
          setCurrentPage(nextPage)
          // If returned data is less than pageSize, no more data available
          if (newData.length < pageSize) {
            setHasMore(false)
          }
        }
      } else {
        setHasMore(false)
      }
    } catch (err) {
      console.error('Failed to load more data:', err)
    } finally {
      setLoading(false)
    }
  }, [fetchData, currentPage, pageSize, loading, hasMore, enableLoadMore, url])


  const loadMoreProps = enableLoadMore ? {
    onClick: loadMore,
    disabled: !hasMore || loading,
    loading: loading,
    text: hasMore ? 'Load More' : 'No More Data',
  } : null

  useEffect(() => {
    if (autoFetch && url) {
      fetchInitial()
    }
  }, [])

  return {
    data,
    initialLoading,
    loadMoreProps,
  }
}
