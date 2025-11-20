<template>
    <footer id="footer" class="bg-black p-4">
        <div class="footer__navigation py-12">
            <div class="container flex gap-8">
                <Brand class="grayscale brightness-200" />
                <div class="grow flex justify-end gap-4">
                    <nav>
                        <h3 class="text-xl mb-4">Useful links</h3>
                        <ul>
                            <li><NuxtLink to="/about_us">About us</NuxtLink></li>
                            <li><NuxtLink to="/contact_us">Contact us</NuxtLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="container flex justify-between">
            <span class="copyright">copyright &copy; <NuxtLink to="/">Trailmandu Pvt. Ltd</NuxtLink>. {{ (new
                Date()).getFullYear() }}</span>
            <span class="developed__by">Developed by <NuxtLink to="http://janakstha.com.np" target="_blank">Janak
                    Shrestha</NuxtLink></span>
        </div>
    </footer>
</template>