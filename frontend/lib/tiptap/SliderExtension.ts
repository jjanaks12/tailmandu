import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import SliderNodeView from '~/components/tiptap/SliderNodeView.vue'

export const SliderExtension = Node.create({
  name: 'slider',

  group: 'block',
  
  atom: true, // It acts as a single block that can't be edited like text
  draggable: true,

  addAttributes() {
    return {
      images: {
        default: [],
        parseHTML: element => {
          const imgs = Array.from(element.querySelectorAll('img'))
          return imgs.map(img => img.getAttribute('src')).filter(Boolean)
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div.hc-swiper-slider',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    // We recreate the exact HTML structure that we want to save and render on the frontend
    const images: string[] = HTMLAttributes.images || []
    
    // Create the wrapper elements
    const wrapper = document.createElement('div')
    wrapper.className = 'swiper hc-swiper-slider w-full rounded-[2.5rem] overflow-hidden group mb-4'
    
    const swiperWrapper = document.createElement('div')
    swiperWrapper.className = 'swiper-wrapper'
    
    images.forEach(src => {
      const slide = document.createElement('div')
      slide.className = 'swiper-slide'
      const img = document.createElement('img')
      img.src = src
      img.className = 'w-full h-full! object-cover m-0!'
      slide.appendChild(img)
      swiperWrapper.appendChild(slide)
    })
    
    wrapper.appendChild(swiperWrapper)
    
    // Add pagination and navigation
    const pagination = document.createElement('div')
    pagination.className = 'swiper-pagination'
    wrapper.appendChild(pagination)
    
    const prev = document.createElement('div')
    prev.className = 'swiper-button-prev bg-white/50 w-12 h-12 rounded-full !text-slate-800 backdrop-blur-sm shadow-xl border border-white/20 after:!text-lg flex justify-center items-center absolute top-1/2 left-2 z-10 -translate-y-1/2 rotate-180'
    wrapper.appendChild(prev)
    
    const next = document.createElement('div')
    next.className = 'swiper-button-next bg-white/50 w-12 h-12 rounded-full !text-slate-800 backdrop-blur-sm shadow-xl border border-white/20 after:!text-lg flex justify-center items-center absolute top-1/2 right-2 z-10 -translate-y-1/2'
    wrapper.appendChild(next)
    
    // Return DOM structure as required by renderHTML
    // According to Tiptap docs, we can return an array or a DOM node.
    // However, when providing a complex nested structure, we usually return a DOM node object:
    // [ 'div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0 ]
    // But since we are generating child tags dynamically based on attributes, returning a built DOM node is better.
    return wrapper
  },

  addNodeView() {
    return VueNodeViewRenderer(SliderNodeView)
  },
})
