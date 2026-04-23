import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [
      {
          id: 1,
          name: 'Apex 75L Expedition Pack',
          category: 'Technical Gear',
          rating: '4.9',
          price: '289.00',
          originalPrice: null,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdyRF8v-V1ijzN0m-TiYTlWquuEKXqtdnvt37qRweGqotqttHDseuV64DE-qeq8yShkOpMAU4F4cAkMf3Y0EiiiaqMsCeeSG6xOn7-QboTG27u4sdfCDwIOWs8JqsLh4Z_vxIYST70w43iuAh8xnBS90ZIZXC3bgbw3fhMq4mXzhL-chJ9vzPawIZtXinEiaIgFpm9hxl2Dg4eKS3dnp7UtkVnGucqkNTyTkOZ1bKGR_cqRmfR7TcYNdmYcsjTV3wS79ZARoWHQ0E',
          imageAlt: 'professional high-performance orange and black trekking backpack standing upright on a grey rock background',
          badge: null
      },
      {
          id: 2,
          name: 'Summit GORE-TEX Boots',
          category: 'Footwear',
          rating: '4.7',
          price: '155.00',
          originalPrice: '199.00',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYH7PnKHdMBEYSejec6JLGAiLArtxDhZysd5r97saO45NxvDVFVaNYZichkCycE5SFxiqyVistIjc_LDa4I1h0IXpwkzl6CKZ9ssxj5hURaN4qw8hwgypM0MVqmOLksxabaAvxD2Jx2-QyOVBC5txnqKpCyhyjvjWGB8ko2A5NJC9xPAdT1K_LEVTmR6GzmMXUraLQ9eag3gcKsEHVXcL5RYoK7U_uoRq5IQQcbIyP9ZpDkGueZrq-H9nyDgH6MqJmyCClJpwBc9Q',
          imageAlt: 'vibrant red technical mountain running shoes with aggressive tread on a clean studio background',
          badge: 'Sale'
      },
      {
          id: 3,
          name: 'Glacier Down Parka v4',
          category: 'Apparel',
          rating: '5.0',
          price: '420.00',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9H_D_t8cyf3q3x-mXZ4u4RhA3QdL_QDu5gwV6J3jP6hE4cQ4SnFUCmi5qvYY039evUyBYrm34GvsZqIgsomCnclDCNd77lnSF2YxGC0I0qk08aaHRqkKDnNUBmO44-k0CjO8PoIHxm-0lZdWhibemeASp_q6jXJumhz8nh1uz20U6klo9mxHMETgbwPbKgbfR_IP0rBcrqxS3j0-jXZQMm0cgWwqdZWIEq66it-UEIihDS-Hkr-tOjpmo3nt632ZnXySSVr95Mh4',
          imageAlt: 'premium bright orange down-filled insulated jacket for high altitude mountaineering against a soft neutral background'
      },
      {
          id: 4,
          name: 'Helios Ultralight 2P Tent',
          category: 'Camping',
          rating: '4.8',
          price: '345.00',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqOFWZcPs9sZqp2ibXQMX0wMKjY8r5WY-ET8b5vEo0M8yHgXHWuyeJCQnC-qtvTkuBDeK7CEYA4UoTt8eI_Wldjr9RsdHJJtR-RNDqBM58CtoyaaGswe37wOiA5T7aqditqyVjYgBeS5zbWBUU-7HmVcIWlrsEL-IrX5XADb7djeKKvJyfDVuv9SHyJ2a4Se5v5TMs0_nWO4G-Uk6g9ncyRaLN8TK_oYTqZ8kdYLbi0-gH_qij3SJoxLr1_q129mUE2IXFRqSqlB4',
          imageAlt: 'lightweight yellow two-person mountain tent pitched on a rocky alpine terrain with a dramatic sunset background'
      },
      {
          id: 5,
          name: 'Photon Beam 800 Lumens',
          category: 'Technical Gear',
          rating: '4.6',
          price: '79.00',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7UFCsAhZA_GLEZDVdmOWHoXNXEwkXQtGlgd6XuXd2QNGBjR7RRdJKnwakFl6vNjKIL_R5N8dUyAB0DEbSadXozCEonTpkoOqSkYCoWc53o7Efg72vmbUA3v0e60IZeFD0_RKktJWryfBSO0-X7-Nv9O8uzN1REHrkapBCRxG3KJtjqA7MkV2hsaBTwpVTIV5-k_MF8l3bjxZ2LHlRYmRfQBAhwkYjHZCqbQxbepkV2owNGUzZegDKHlJasr8JpSao29nBRyeq8g',
          imageAlt: 'close up of a high-power rechargeable LED headlamp with black straps on a dark textured background'
      },
      {
          id: 6,
          name: 'Titan Gripper Alpine Gloves',
          category: 'Apparel',
          rating: '4.9',
          price: '115.00',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDewP0hPl0NPsz8eUoosfUCk3bhMlFbx3nBF8neRM9xMjutKH_lkxakt2L0bOTeF7nujDoPU7QL_VQTA_pgO_TWYcQLdJZJUF300ea1bait5ds6Lc_NCKkJntudNYJDIq3J2xkmn_8eeKn2lzXStDH_geUMzOgGQVQfNALsLvPEvHn75-KaxGzhPxnpIHUtewIFMEakbYXiiAsPgIcKMeJMC6JUxvk9Wi2-GtcdGiHLOAMFJri5YVCmSMeGoCyrOTVGblDEJTM6SYM',
          imageAlt: 'durable leather and synthetic trekking gloves in black and yellow colors placed on a wooden surface'
      }
    ],
    categories: [
      { name: 'All Gear', active: true },
      { name: 'Apparel', active: false },
      { name: 'Footwear', active: false },
      { name: 'Camping', active: false },
      { name: 'Navigation', active: false },
    ]
  }),
  getters: {
    allProducts: (state) => state.products,
    allCategories: (state) => state.categories
  }
})
