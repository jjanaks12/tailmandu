export const parseContent = (content: string): string => {
    if (!content) return ''
    try {
        // Try parsing as JSON
        const parsed = JSON.parse(content)
        if (typeof parsed !== 'object' || parsed === null) return content

        let extractedHtml = ''

        const walk = (obj: any) => {
            if (Array.isArray(obj)) {
                obj.forEach(walk)
            } else if (typeof obj === 'object' && obj !== null) {
                // If it's a known Hybrid Composer component with text content
                if (obj.component === 'hc_title') {
                    if (obj.title) extractedHtml += `<h2>${obj.title}</h2>`
                    if (obj.subtitle) extractedHtml += `<h3>${obj.subtitle}</h3>`
                } else if (obj.component === 'hc_wp_editor' && obj.editor_content) {
                    extractedHtml += `<div class="wp-editor-content mb-4">${obj.editor_content}</div>`
                } else if (obj.component === 'hc_text_block' && obj.content) {
                    extractedHtml += `<div class="mb-4">${obj.content}</div>`
                } else if (obj.component === 'hc_title_slider' || obj.component === 'hc_slider') {
                    if (Array.isArray(obj.slides)) {
                        extractedHtml += `<div class="swiper hc-swiper-slider w-full rounded-[2.5rem] overflow-hidden group mb-4">
                            <div class="swiper-wrapper">`
                        obj.slides.forEach((slide: any) => {
                            if (slide.component === 'hc_upload_img' && slide.link) {
                                const url = slide.link.split('|')[0]
                                if (url) extractedHtml += `<div class="swiper-slide"><img src="${url}" class="w-full h-full! object-cover m-0!" /></div>`
                            }
                        })
                        extractedHtml += `</div>
                            <div class="swiper-pagination"></div>
                            <div class="swiper-button-prev bg-white/50 w-12 h-12 rounded-full !text-slate-800 backdrop-blur-sm shadow-xl border border-white/20 after:!text-lg flex justify-center items-center absolute top-1/2 left-2 z-10 -translate-y-1/2 rotate-180"></div>
                            <div class="swiper-button-next bg-white/50 w-12 h-12 rounded-full !text-slate-800 backdrop-blur-sm shadow-xl border border-white/20 after:!text-lg flex justify-center items-center absolute top-1/2 right-2 z-10 -translate-y-1/2"></div>
                        </div>`
                        // Stop recursively walking inside the slider to avoid duplicating slides
                        return
                    }
                } else if (obj.component === 'hc_upload_img' && obj.link) {
                    // Extract image URL from link like "url|width|height|id"
                    const url = obj.link.split('|')[0]
                    if (url) extractedHtml += `<img src="${url}" class="rounded-xl my-4 w-full h-auto object-cover" />`
                }

                // Recursively check children
                for (const key in obj) {
                    // Avoid re-processing the string properties we just extracted
                    if (typeof obj[key] === 'object' || Array.isArray(obj[key])) {
                        walk(obj[key])
                    }
                }
            }
        }

        walk(parsed)
        return extractedHtml || content
    } catch (e) {
        // Not valid JSON, which means it's likely raw HTML or plain text
        return content
    }
}
