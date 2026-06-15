const FOOTER = `<!-- Footer -->
<footer class="bg-inverse-surface text-white py-20 px-6 mt-12 mb-20 lg:mb-0 rounded-t-[3rem]">
    <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-12 mb-16">
            <div class="col-span-1 md:col-span-2">
                <img class="h-12 mb-6 object-cover" alt="Invest hub logo" src="/src/assets/invest-hub-logo-alt.svg"
                    loading="lazy" />
                <p class="text-secondary-fixed-dim max-w-sm mb-8 leading-relaxed opacity-70">
                    Elevando la experiencia y tomando el control de tu hogar inteligente. Construyendo el futuro,
                    proyecto a proyecto.
                </p>
            </div>
            <div>
                <h4 class="font-bold mb-6 text-[#D4FF5D]">Donar</h4>
                <ul class="space-y-4 text-sm opacity-70">
                    <li><a class="hover:text-white transition-colors" href="#">Educación</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Medicina</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Social</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Desastre</a></li>
                </ul>
            </div>
            <div>
                <h4 class="font-bold mb-6 text-[#D4FF5D]">Ayuda</h4>
                <ul class="space-y-4 text-sm opacity-70">
                    <li><a class="hover:text-white transition-colors" href="#">FAQ</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Accesibilidad</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Privacidad</a></li>
                    <li><a class="hover:text-white transition-colors" href="#">Contacto</a></li>
                </ul>
            </div>
        </div>
        <div class="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div class="text-xs opacity-50">
                © Invest Hub2026. Todos los derechos reservados.
            </div>
            <div class="flex gap-6 text-xs font-bold uppercase tracking-widest opacity-70">
                <a class="hover:text-[#D4FF5D]" href="#">Instagram</a>
                <a class="hover:text-[#D4FF5D]" href="#">Facebook</a>
                <a class="hover:text-[#D4FF5D]" href="#">Twitter</a>
                <a class="hover:text-[#D4FF5D]" href="#">LinkedIn</a>
            </div>
        </div>
    </div>
</footer>`;

export const renderFooter = () => {
  document.body.insertAdjacentHTML('beforeend', FOOTER);
};
