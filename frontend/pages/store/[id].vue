<template>

    <main class="pt-24 pb-32 px-6 max-w-screen-2xl mx-auto">
        <!-- Breadcrumbs -->
        <nav class="mb-8 flex items-center gap-2 text-sm text-on-surface-variant font-medium">
            <a class="hover:text-primary transition-colors" href="#">Technical Gear</a>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <a class="hover:text-primary transition-colors" href="#">Footwear</a>
            <span class="material-symbols-outlined text-xs">chevron_right</span>
            <span class="text-on-surface">Summit Pro G-XVIII</span>
        </nav>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Hero Gallery -->
            <div class="lg:col-span-7 space-y-6">
                <div class="aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-container relative group">
                    <img class="w-full h-full object-cover"
                        data-alt="Premium high-altitude mountaineering boots with orange accents and rugged technical soles, resting on a slab of slate with cold blue alpine light"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAep9GmDpVxRh48l74idbvdB85Fg2wi-JFMt6PufHVYI4Ptb3jeN1x2OkHLD87PCkvI75NxpNwZjvWJbMlX9ZRlKyGDVeR0bhle-BqFl-sR8bNgr-DAkRAg_KQD3DWxtBZEV5PkJ8mPuuJQjrpAZaqbKkqM2iqkQqcaNxs7LEs_ibsSRbd8CU6HVA1MyWimm3fZ521FafutcYbc6i5gU_8EAjOFhzUdxHu2QiDUvEipmoPxoJShzvZJo8tQr0GLTtpdPVWAFdOco-A" />
                    <div class="absolute inset-0 bg-gradient-to-t from-on-background/20 to-transparent"></div>
                    <button
                        class="absolute top-6 right-6 p-4 bg-surface-container-lowest/80 backdrop-blur-md rounded-full shadow-lg hover:scale-105 transition-transform">
                        <span class="material-symbols-outlined">favorite</span>
                    </button>
                </div>
                <div class="grid grid-cols-4 gap-4">
                    <div
                        class="aspect-square rounded-2xl overflow-hidden cursor-pointer ring-2 ring-primary ring-offset-2">
                        <img class="w-full h-full object-cover"
                            data-alt="Side profile of technical mountaineering boot showing lace system and carbon fiber heel"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeBueP4qI5lpPRnL7_2N-mJjWmyNrW9ljor-qniPup4GWVE2XJ1ec7qhAlxz5TLZb7jWle7MfamGfsYe9T_b959I3Gn1Veytt_r2gJVMuihZDYwdnMjCv3gY8Wc9T15dRpDPT5CKNF2DEXTqlQTDmMWs5heILWymCl3bm1ARDbxJKfQvHpYcMFtTQfFL44xeuXjEpx15opHheOozt8GiIqKtaCpwCn7q1uM_suJqPmMSUzb4GnpZuG2h59WVj8cgnbQngg5FByKlg" />
                    </div>
                    <div
                        class="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                        <img class="w-full h-full object-cover"
                            data-alt="Detail shot of Vibram sole pattern with deep lugs for snow and ice grip"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLGXmqTPQRWhq3Lm-lVR8kHUNTocpRfR2SlG_yKs0QO4plsASmW7RDbFsGLsje0B5xrDnuWqz2s7Kb4aaPkyYqVZ1EiDsJl6zrFAkuKUtDylA3OYcQYZY0P3ww9RjSslXcL5P67OC_IKVB1X29-LslOvpIFZAeYRb_5FWGoUy6VE1VJLAucTZs1ljUygoM0KrCLuoS2ykJW_PajF7b0Jbx7KAGey3_kC0XgAM5nuM-7UQ2tCfx6RLD-Crse00rL8lAYkK6ZSAMEnE" />
                    </div>
                    <div
                        class="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                        <img class="w-full h-full object-cover"
                            data-alt="Interior view of GORE-TEX thermal lining and heat-reflective footbed"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwZMV7TaF8R7so1IqrQYyOuD-TuGw7_e1JNlR2RGV6LOW3OB9EsPvEFXXd3CJAKlXwg3512KOCe8HsmFR8igVL3ZKI222mIKN5YqLDjojSc6bAIDBOtKyg86QDkpTqjJZFtXviafAeZXAr6Ptm0hgoCvdr5gWcHwiBOCtrV4WtvPPRzsk18-ZyIXisnmJus2kqRnyXiTO96nheFO-J2nOmTD9-pEZZp63N7rDojX1cbXw25JhBUCTi7AI7w-icUMi93Q7V7Jq22go" />
                    </div>
                    <div
                        class="aspect-square rounded-2xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity relative">
                        <img class="w-full h-full object-cover"
                            data-alt="Expedition boots being worn in a snowy basecamp environment"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7x7sWjZLOFUqwsnvypb987UmxSdARjYmTChaR7bF3J1GLODST_rgX31ZHxHY7P-85xUo7AkLDKD5Nn-ko2VX4o0jv9pnofxxo2QsWA8TJYJu1hJZCq65HXLzkihi_ZEN6_VvTi5iUmBJEFc8H5KsTEf6WlwjqVPyXlgFVRFnlDQ-wypHyjWU4wvf9dQS5vev8LViTgUgzEmVn3Q9n2cj16-2yKRvTCYKYV4uyRDPvpVVSIiA4z02lRdr6bWD-G4zOACdwE4jfWx8" />
                        <div
                            class="absolute inset-0 bg-on-background/40 flex items-center justify-center text-white font-bold">
                            +2</div>
                    </div>
                </div>
            </div>
            <!-- Product Info & CTA -->
            <div class="lg:col-span-5 flex flex-col">
                <div class="mb-2 flex items-center gap-3">
                    <span
                        class="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider">Expert
                        Grade</span>
                    <div class="flex items-center text-[#f06723]">
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="ml-2 text-sm font-bold">(42 Reviews)</span>
                    </div>
                </div>
                <h1 class="text-5xl font-headline font-black text-on-background tracking-tight mb-4 leading-none">
                    Summit Pro G-XVIII Boots</h1>
                <p class="text-2xl font-headline font-bold text-primary mb-8">$849.00 USD</p>
                <div class="bg-surface-container rounded-3xl p-6 mb-8 relative overflow-hidden">
                    <div class="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4">
                        <span class="material-symbols-outlined text-[120px]">terrain</span>
                    </div>
                    <h3 class="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-3">Expedition
                        Intel</h3>
                    <p class="text-on-surface leading-relaxed relative z-10">
                        Engineered for vertical ice and mixed terrain at altitudes exceeding 6,000m. The G-XVIII
                        features a triple-layer thermal barrier and integrated gaiter system designed for the Khumbu
                        Icefall.
                    </p>
                </div>
                <div class="space-y-6 mb-10">
                    <div>
                        <span class="block text-sm font-bold uppercase mb-3">Select Size (EU)</span>
                        <div class="grid grid-cols-4 gap-2">
                            <button
                                class="py-3 rounded-xl border border-outline-variant hover:border-primary transition-all font-bold">41</button>
                            <button
                                class="py-3 rounded-xl border-2 border-primary bg-primary/5 text-primary font-black">42</button>
                            <button
                                class="py-3 rounded-xl border border-outline-variant hover:border-primary transition-all font-bold">43</button>
                            <button
                                class="py-3 rounded-xl border border-outline-variant opacity-30 cursor-not-allowed font-bold">44</button>
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <button
                            class="flex-1 bg-gradient-to-tr from-[#a53d00] to-[#f06723] text-white py-5 rounded-full font-headline font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all">
                            Secure for Expedition
                        </button>
                        <button
                            class="p-5 border-2 border-outline-variant rounded-full hover:bg-surface-container-high transition-colors">
                            <span class="material-symbols-outlined">share</span>
                        </button>
                    </div>
                    <div class="flex items-center justify-center gap-6 text-sm text-on-surface-variant">
                        <div class="flex items-center gap-1"><span
                                class="material-symbols-outlined text-base">local_shipping</span> Free Basecamp
                            Delivery</div>
                        <div class="flex items-center gap-1"><span
                                class="material-symbols-outlined text-base">verified</span> Lifetime Warranty</div>
                    </div>
                </div>
                <!-- Technical Specs Table -->
                <div class="mt-auto">
                    <div class="border-t border-outline-variant/30 pt-8">
                        <h3 class="font-headline font-bold text-xl mb-6">Technical Specifications</h3>
                        <div class="grid grid-cols-2 gap-y-4 gap-x-12">
                            <div class="flex justify-between border-b border-outline-variant/15 pb-2">
                                <span class="text-on-surface-variant text-sm">Weight</span>
                                <span class="font-bold">980g (Single)</span>
                            </div>
                            <div class="flex justify-between border-b border-outline-variant/15 pb-2">
                                <span class="text-on-surface-variant text-sm">Crampon</span>
                                <span class="font-bold">Full Auto</span>
                            </div>
                            <div class="flex justify-between border-b border-outline-variant/15 pb-2">
                                <span class="text-on-surface-variant text-sm">Insulation</span>
                                <span class="font-bold">Primaloft®</span>
                            </div>
                            <div class="flex justify-between border-b border-outline-variant/15 pb-2">
                                <span class="text-on-surface-variant text-sm">Temp Rating</span>
                                <span class="font-bold">-35°C / -31°F</span>
                            </div>
                            <div class="flex justify-between border-b border-outline-variant/15 pb-2">
                                <span class="text-on-surface-variant text-sm">Sole</span>
                                <span class="font-bold">Vibram® Mulaz</span>
                            </div>
                            <div class="flex justify-between border-b border-outline-variant/15 pb-2">
                                <span class="text-on-surface-variant text-sm">Upper</span>
                                <span class="font-bold">Cordura® GX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Reviews Bento Grid -->
        <section class="mt-32">
            <div class="flex justify-between items-end mb-12">
                <div>
                    <h2 class="text-4xl font-headline font-black tracking-tight mb-2">Field Tested</h2>
                    <p class="text-on-surface-variant">Real insights from the world's most demanding peaks.</p>
                </div>
                <button class="text-primary font-bold flex items-center gap-2 group">
                    View All Reports <span
                        class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Large Review Card -->
                <div
                    class="md:col-span-2 bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-8 items-center">
                    <div class="w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden">
                        <img class="w-full h-full object-cover"
                            data-alt="Professional climber in high-altitude suit adjusting boots in a snowy landscape"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdd-iof4kpXUfjrIMVEiRBK7SQ5iJ7aHer6JDRP8BxmCOreA_Cu10j23AxJDFmBEmDJ7IUClyWNSSVAoXqOvbMTP0MIcHOAZJS_duALUAvJWfE_id3iL_LkBhH055gakhf1kV4q9aOsGUbZ5g7X84WSwxjC2FRa6njMXYb4Zxaphb1SnZj6ZaznpDamWhw4it1spDb_Gb86YIZ53WLZUXRmJXzyoewyGVrwYPafoUDzTHmggjgaCEEbaBOpN1WgpxHv6h8hDL_w7w" />
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-4">
                            <div
                                class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center font-bold text-primary">
                                AK</div>
                            <div>
                                <h4 class="font-bold text-sm">Anders Kjellberg</h4>
                                <p class="text-xs text-on-surface-variant">Lhotse Summit Expedition</p>
                            </div>
                        </div>
                        <h3 class="text-2xl font-headline font-bold mb-4">"Survived the -40°C night at Camp 4
                            without losing a toe."</h3>
                        <p class="text-on-surface-variant leading-relaxed mb-6 italic">
                            The heat retention is unparalleled. I've used several double boots before, but the
                            G-XVIII provides the precision of a technical climber with the warmth of an 8k boot. The
                            lacing system didn't freeze once.
                        </p>
                        <div class="flex gap-4">
                            <span
                                class="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-surface-container rounded-full">
                                <span class="material-symbols-outlined text-sm">thermostat</span> -40°C Tested
                            </span>
                            <span
                                class="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-surface-container rounded-full">
                                <span class="material-symbols-outlined text-sm">altitude</span> 7,800m Reach
                            </span>
                        </div>
                    </div>
                </div>
                <!-- Vertical Stats Card -->
                <div
                    class="bg-primary text-white p-8 rounded-[2rem] flex flex-col justify-between overflow-hidden relative">
                    <span class="material-symbols-outlined absolute top-4 right-4 opacity-20 text-6xl">verified</span>
                    <div>
                        <p class="text-sm font-bold uppercase tracking-widest opacity-80 mb-8">Basecamp Verified</p>
                        <div class="space-y-6">
                            <div>
                                <p class="text-4xl font-headline font-black">98%</p>
                                <p class="text-sm opacity-80">Heel Lock Security Rating</p>
                            </div>
                            <div>
                                <p class="text-4xl font-headline font-black">2.4k</p>
                                <p class="text-sm opacity-80">Kilometers Tracked in Beta</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 pt-8 border-t border-white/20">
                        <p class="text-xs font-medium italic">"The gold standard for Ama Dablam aspirants." -
                            Alpinist Magazine</p>
                    </div>
                </div>
                <!-- Small Review Cards -->
                <div class="bg-surface-container-low p-6 rounded-[2rem]">
                    <div class="flex gap-1 text-primary mb-4">
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                    </div>
                    <p class="font-bold mb-2">Perfect Ice Grip</p>
                    <p class="text-sm text-on-surface-variant leading-relaxed">
                        The sole stiffness is exactly where it needs to be for front-pointing on blue ice. No flex
                        means no calf fatigue.
                    </p>
                    <p class="mt-4 text-xs font-bold text-on-surface">— Sarah J., Ice Guide</p>
                </div>
                <div class="bg-surface-container-low p-6 rounded-[2rem]">
                    <div class="flex gap-1 text-primary mb-4">
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="material-symbols-outlined text-sm"
                            style="font-variation-settings: 'FILL' 1;">star_half</span>
                    </div>
                    <p class="font-bold mb-2">Built Like a Tank</p>
                    <p class="text-sm text-on-surface-variant leading-relaxed">
                        Heavier than some competitors but the durability is 10x better. After two seasons in the
                        Andes, they look new.
                    </p>
                    <p class="mt-4 text-xs font-bold text-on-surface">— Mike T., High Altitude Porter</p>
                </div>
            </div>
        </section>
        <!-- Recommended Gear Section -->
        <section class="mt-32">
            <h2 class="text-3xl font-headline font-black mb-8">Complete Your Kit</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="group cursor-pointer">
                    <div class="aspect-square bg-surface-container-low rounded-3xl overflow-hidden mb-4">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            data-alt="Technical mountaineering socks with compression zones and heavy merino wool build"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLr_vas8eydmyN7Yn3a2CuIw8_aHAjgZkiQQb_PG-q-HPxgghdO8CWsUpV8_7C7amWd6DYLOTUWsWJQqHRINBQp98LMBOzYYSCRcCF2jAEn689lmV-9euTgl5-gYUGxFz86sMlMij-YvWphaYW9EuGIlfGcbzdOw7jok1jiabVZiNmsM5cw-1AR7s6s6on4ui--Q8Jki1W2r2GOsiT1Zk2OAuKMMr3lJp88KzGY7SIN2QGJTsBOvAtahrZHp6-ihCHO7uhNUtI91k" />
                    </div>
                    <h4 class="font-bold">Arctic Merino Sock</h4>
                    <p class="text-sm text-on-surface-variant">$45.00</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-square bg-surface-container-low rounded-3xl overflow-hidden mb-4">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            data-alt="Black semi-automatic crampons with sharp steel points and orange bindings"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWbwRolj_o5raZUvuxDn7B9qBnQlku_00Eh9C9pS0eg6ylEwX522M9tpfIjo8ttKkmt301FDOU7nezqHaJb6BiGMDjhHGyT5vuRCAg5UU6BZtwycXtURjpNwBWGXxK4Hd9kY4dGmoY3faE9O3kFf8iYfzRERDBuAxqC9JTp5g-LWa7MiBxoF8HRb3mKpvbFwe1laIlN0ofMT33hbNYXlVFCHV2PmssE-MtFkGh1UCp8_j7ykEl4nLCnoSN9J-A_3M21Dco00OPKHc" />
                    </div>
                    <h4 class="font-bold">Ice-Fang 12 Crampons</h4>
                    <p class="text-sm text-on-surface-variant">$189.00</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-square bg-surface-container-low rounded-3xl overflow-hidden mb-4">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            data-alt="Lightweight telescopic trekking poles with cork handles and snow baskets"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAmDewoV9Ei2R9BxhQQcCVGgUmxRayKF_aVeTiY6BrujJqeBaCxHq-6aSA4qYemS-zGJlsHj0Q8XtmaNnW7TquJ_jQZeA6vwdOHEva-QhItx2nrypAjTq5QhkIJhSPM6nbWhxAUG0r1PiroEMpvh9V3J8rm10xOyj2lUEgk0m8-ptbs4EBxt7PNdtrNu3Fe2QqRDrtXsu5AX0L1bLo80SAtEog_s7XlXs0cbaDk4e4Cf0buiFSkaZq_Pr1Y7KpK_ZEgefU5Y84w9E" />
                    </div>
                    <h4 class="font-bold">Apex Carbon Poles</h4>
                    <p class="text-sm text-on-surface-variant">$160.00</p>
                </div>
                <div class="group cursor-pointer">
                    <div class="aspect-square bg-surface-container-low rounded-3xl overflow-hidden mb-4">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            data-alt="Heavy duty waterproof gear duffel bag in bright orange"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTqkmmdyQRwsk7sD_s96mSEjL_epfLvZ19yc4dxc6QVL5q-1eNi4gqM2VPtj4mu0whwKfDB9GyHkEkqzysdFQXbbuhutF24fHrQHPooxYDB_x3JyXQi8dZtN8k6JmsFYRx6nh5PATUQ9dMepakgWmSg7SuSr5v9XrBkdgPgNGS7pNPgaV8iga7bWzPsmKUSXCLzxjPlrUnpkMjm5mSeFjhae3o9f-NXWjoczFI8iiMT9Q0fJrj9W9KGAQJdcHCniFduDisgPiRcH8" />
                    </div>
                    <h4 class="font-bold">Basecamp Duffel 90L</h4>
                    <p class="text-sm text-on-surface-variant">$220.00</p>
                </div>
            </div>
        </section>
    </main>
</template>