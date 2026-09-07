export default defineSitemapEventHandler(async () => {
    try {
        const { apiUrl } = useRuntimeConfig().public
        const imgBaseUrl = apiUrl ? apiUrl.replace('/api/', '/resources/images/') : ''
        
        const [blogsRes, eventsRes, treksRes, productsRes, tmClicksImagesRes] = await Promise.all([
            $fetch<any>(`${apiUrl}blogs/public?per_page=1000`),
            $fetch<any>(`${apiUrl}events/public?per_page=1000`),
            $fetch<any>(`${apiUrl}treks?per_page=1000`),
            $fetch<any>(`${apiUrl}products?per_page=1000`),
            $fetch<any>(`${apiUrl}medias/images?per_page=1000`)
        ].map(p => p.catch((e) => {
            console.error('Sitemap fetch error:', e)
            return null
        })))

        const urls: { loc: string, lastmod?: string | Date, images?: { loc: string }[] }[] = []

        if (blogsRes?.data) {
            blogsRes.data.forEach((post: any) => {
                if (post.slug) {
                    const urlObj: any = {
                        loc: `/blogs/${post.slug}`,
                        lastmod: post.updated_at || post.created_at || new Date()
                    }
                    if (post.featured_image?.file_name) {
                        urlObj.images = [{ loc: `${imgBaseUrl}${post.featured_image.file_name}` }]
                    }
                    urls.push(urlObj)
                }
            })
        }
        
        if (eventsRes?.data) {
            eventsRes.data.forEach((event: any) => {
                if (event.slug) {
                    const urlObj: any = {
                        loc: `/races/${event.slug}`,
                        lastmod: event.updated_at || event.created_at || new Date()
                    }
                    if (event.thumbnail?.file_name) {
                        urlObj.images = [{ loc: `${imgBaseUrl}${event.thumbnail.file_name}` }]
                    }
                    urls.push(urlObj)
                }
            })
        }
        
        if (treksRes?.data) {
            treksRes.data.forEach((trek: any) => {
                if (trek.slug) {
                    const category = trek.category?.name?.toLowerCase() || 'fastpacking'
                    const urlObj: any = {
                        loc: `/${category}/${trek.slug}`,
                        lastmod: trek.updated_at || trek.created_at || new Date()
                    }
                    if (trek.thumbnail?.file_name) {
                        urlObj.images = [{ loc: `${imgBaseUrl}${trek.thumbnail.file_name}` }]
                    }
                    urls.push(urlObj)
                }
            })
        }
        
        if (productsRes?.data) {
            productsRes.data.forEach((product: any) => {
                if (product.slug) {
                    const urlObj: any = {
                        loc: `/store/${product.slug}`,
                        lastmod: product.updated_at || product.created_at || new Date()
                    }
                    if (product.thumbnail?.file_name) {
                        urlObj.images = [{ loc: `${imgBaseUrl}${product.thumbnail.file_name}` }]
                    }
                    urls.push(urlObj)
                }
            })
        }
        
        if (tmClicksImagesRes?.data) {
            const tmClicksImages = tmClicksImagesRes.data
                .filter((img: any) => img.file_name)
                .map((img: any) => ({
                    loc: `${imgBaseUrl}${img.file_name}`
                }))
            
            if (tmClicksImages.length > 0) {
                urls.push({
                    loc: '/tm_clicks',
                    lastmod: new Date(),
                    images: tmClicksImages
                })
            }
        }

        return urls
    } catch (error) {
        console.error('Failed to fetch sitemap URLs:', error)
        return []
    }
})
