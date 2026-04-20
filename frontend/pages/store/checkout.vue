<template>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <!-- Left Column: Checkout Forms -->
        <div class="lg:col-span-7 space-y-8">
            <header class="mb-8">
                <h1 class="text-4xl font-black tracking-tight mb-2">Expedition Details</h1>
                <p class="text-on-surface-variant font-body">Configure your logistics for the upcoming journey.
                </p>
            </header>
            <!-- Section: Shipping Address -->
            <section class="bg-surface-container-lowest rounded-xl p-6 md:p-8 space-y-6">
                <div class="flex items-center gap-3 mb-2">
                    <span
                        class="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">1</span>
                    <h2 class="text-xl font-bold tracking-tight">Shipping Address</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-outline">First
                            Name</label>
                        <input
                            class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 transition-all"
                            placeholder="Tenzing" type="text" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-outline">Last
                            Name</label>
                        <input
                            class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 transition-all"
                            placeholder="Norgay" type="text" />
                    </div>
                    <div class="md:col-span-2 space-y-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-outline">Basecamp
                            Address</label>
                        <input
                            class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 transition-all"
                            placeholder="123 Summit Path" type="text" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-outline">City</label>
                        <input
                            class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 transition-all"
                            placeholder="Kathmandu" type="text" />
                    </div>
                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-outline">Zip Code</label>
                        <input
                            class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 transition-all"
                            placeholder="44600" type="text" />
                    </div>
                </div>
            </section>
            <!-- Section: Payment Method -->
            <section class="bg-surface-container-lowest rounded-xl p-6 md:p-8 space-y-6">
                <div class="flex items-center gap-3 mb-2">
                    <span
                        class="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">2</span>
                    <h2 class="text-xl font-bold tracking-tight">Payment Method</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        class="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary bg-primary-container/10 transition-all group">
                        <span class="material-symbols-outlined text-primary mb-2">credit_card</span>
                        <span class="text-sm font-bold">Credit Card</span>
                    </button>
                    <button
                        class="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-surface-container-low hover:bg-surface-container transition-all group">
                        <span
                            class="material-symbols-outlined text-outline group-hover:text-primary mb-2">account_balance</span>
                        <span class="text-sm font-bold">Bank Transfer</span>
                    </button>
                    <button
                        class="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-transparent bg-surface-container-low hover:bg-surface-container transition-all group">
                        <span
                            class="material-symbols-outlined text-outline group-hover:text-primary mb-2">payments</span>
                        <span class="text-sm font-bold">Crypto</span>
                    </button>
                </div>
                <div class="space-y-6 pt-4">
                    <div class="space-y-2">
                        <label class="text-xs font-bold uppercase tracking-widest text-outline">Cardholder
                            Name</label>
                        <input
                            class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 transition-all"
                            type="text" />
                    </div>
                    <div class="relative">
                        <label class="text-xs font-bold uppercase tracking-widest text-outline block mb-2">Card
                            Number</label>
                        <div class="relative">
                            <input
                                class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 pl-12 transition-all"
                                placeholder="0000 0000 0000 0000" type="text" />
                            <span
                                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">payment</span>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="text-xs font-bold uppercase tracking-widest text-outline">Expiry</label>
                            <input
                                class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 transition-all"
                                placeholder="MM/YY" type="text" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-xs font-bold uppercase tracking-widest text-outline">CVC</label>
                            <input
                                class="w-full bg-surface-container-low border-0 rounded-lg focus:ring-2 focus:ring-primary py-3 px-4 transition-all"
                                placeholder="***" type="text" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- Right Column: Mission Manifest (Order Summary) -->
        <aside class="lg:col-span-5">
            <div class="sticky top-24 space-y-6">
                <div class="bg-on-background text-surface-bright rounded-2xl p-6 md:p-8 overflow-hidden relative">
                    <!-- Subtle Background Element -->
                    <div class="absolute -right-10 -bottom-10 opacity-10">
                        <span class="material-symbols-outlined text-[200px]"
                            style="font-variation-settings: 'FILL' 1;">terrain</span>
                    </div>
                    <h2 class="text-2xl font-black mb-6 brand-font tracking-tight">Mission Manifest</h2>
                    <div class="space-y-6 mb-8 relative z-10">
                        <!-- Summary Item 1 -->
                        <div class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-highest">
                                <img class="w-full h-full object-cover"
                                    data-alt="Technical orange hardshell mountaineering jacket displayed against a rugged stone background in dramatic morning sunlight"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGbx7JXHwDD8daGXFT47VzHMG_qx08WmFBO1B9CoPrQFRnbjrsUqKspYxyYNrY83UXj-7AAgZMjM1dnhO_vIB22bnCkwCSqe2KnTWbQNTz19max-mtJx0v4xr0oL8OcFA9WEMV46tSmuq0FH7HnohTN_dJ54sSExdAEdaivLtp02gh0io1nuWsxRW0sne9za9f6uUT48Hjjf2FFXwzs3cOLxuNLzLfVTzxx4Fc0quP8EVISqkNMFLQyQeeJ35isIEbT9jRqP4iuf8" />
                            </div>
                            <div class="flex-grow">
                                <h3 class="font-bold text-lg leading-tight">Apex Pro Hardshell</h3>
                                <p class="text-surface-variant/70 text-sm">Size: Large • Orange</p>
                                <div class="flex justify-between items-center mt-1">
                                    <span class="font-bold text-primary-container">$450.00</span>
                                    <span class="text-xs font-medium uppercase tracking-widest opacity-60">Qty:
                                        1</span>
                                </div>
                            </div>
                        </div>
                        <!-- Summary Item 2 -->
                        <div class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-highest">
                                <img class="w-full h-full object-cover"
                                    data-alt="Durable technical hiking boots with muddy soles resting on a mountain peak during a hazy sunset"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_IJzUfADOuj0rn2dB3AJovdgNQdkVwCbYsP_tZ73WEAPOrINRxN7E-VeDk9Fjx3XryIyo9yQdOx_G3DV6NJAKMnQoLn4aiwd8XEavA3rvK6HQOadVDRJgbpeilbnfm_NDk35O_M5x6p8uBsXbYstfHFWWEHrXh52XsYnWuWzVYC8zOokhN0R9MAAr_WXLy_zn6-2z0kYTnvC-phSDqmYSmFWTDes108Dra5t3krFv_DADothN6w5-dQj1-qiT4ryxf7gV8ylfXDg" />
                            </div>
                            <div class="flex-grow">
                                <h3 class="font-bold text-lg leading-tight">Sherpa Grip V2 Boots</h3>
                                <p class="text-surface-variant/70 text-sm">Size: 44 • Obsidian</p>
                                <div class="flex justify-between items-center mt-1">
                                    <span class="font-bold text-primary-container">$280.00</span>
                                    <span class="text-xs font-medium uppercase tracking-widest opacity-60">Qty:
                                        1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-surface-variant/10 pt-6 space-y-4 relative z-10">
                        <div class="flex justify-between text-surface-variant/80">
                            <span>Gear Subtotal</span>
                            <span class="font-bold">$730.00</span>
                        </div>
                        <div class="flex justify-between text-surface-variant/80">
                            <span>Expedition Shipping</span>
                            <span class="font-bold">FREE</span>
                        </div>
                        <div class="flex justify-between text-surface-variant/80">
                            <span>Altitude Tax</span>
                            <span class="font-bold">$45.50</span>
                        </div>
                        <div class="pt-4 border-t border-surface-variant/20 flex justify-between items-end">
                            <div>
                                <span class="text-xs font-black uppercase tracking-[0.2em] text-primary-container">Total
                                    Investment</span>
                                <div class="text-4xl font-black brand-font tracking-tighter mt-1">$775.50</div>
                            </div>
                            <span class="material-symbols-outlined text-primary-container text-4xl"
                                style="font-variation-settings: 'FILL' 1;">verified</span>
                        </div>
                    </div>
                </div>
                <button
                    class="w-full py-5 rounded-full bg-gradient-to-tr from-[#a53d00] to-[#f06723] text-white font-black text-lg tracking-widest uppercase shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                    Confirm Order
                    <span class="material-symbols-outlined">rocket_launch</span>
                </button>
                <p class="text-center text-xs text-outline font-medium px-8">
                    By confirming, you agree to our Expedition Terms of Service and Environmental Ethics Policy.
                </p>
            </div>
        </aside>
    </div>
    <!-- Success Modal Background Pulse Mockup (Glassmorphism Detail) -->
    <div
        class="fixed bottom-8 left-8 p-4 bg-surface-bright/60 backdrop-blur-xl rounded-2xl flex items-center gap-4 shadow-xl border border-white/20 md:flex">
        <div class="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
            <span class="material-symbols-outlined">ac_unit</span>
        </div>
        <div>
            <div class="text-xs font-bold uppercase tracking-tighter text-secondary">Trail Condition</div>
            <div class="text-sm font-black">Clear skies at Basecamp</div>
        </div>
    </div>
</template>