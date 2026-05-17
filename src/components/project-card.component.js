import { getPercentage, formatArs } from '../utils/currency.js';

export const URGENT_PROJECTS = [
  {
    title: 'Quantum Neural Lab',
    lastHours: 48,
    shortDescription:
      'Desarrollo de procesadores orgánicos inspirados en el cerebro humano.',
    goal: 900000,
    link: '#',
    collected: 528000,
    image: './src/assets/q-neural-lab.webp',
  },
  {
    title: 'Verde Vertical Madrid',
    lastHours: 24,
    shortDescription:
      'Transformación de edificios industriales en pulmones urbanos sostenibles.',
    goal: 2000000,
    link: '#',
    collected: 1700000,
    image: './src/assets/verde-vertical-madrid.jpg',
  },
  {
    title: 'Aero-Drone Delivery',
    lastHours: 12,
    shortDescription:
      'Logística aérea autónoma para suministros médicos de emergencia.',
    goal: 500000,
    link: '#',
    collected: 475000,
    image: './src/assets/aero-drone-delivery.webp',
  },
];

export const createUrgentCard = (card) => {
  return `
    <div
        class="bg-surface-container-lowest rounded-2xl overflow-hidden group border border-transparent hover:border-primary-container/30 transition-all duration-300">
        <div class="h-56 relative overflow-hidden">
            <img alt="${card.title}"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="${card.image}" />
            <div
                class="absolute top-4 left-4 bg-error-container text-on-error text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Últimas ${card.lastHours} Horas</div>
        </div>
        <div class="p-8">
            <h3 class="text-xl font-bold mb-2">${card.title}</h3>
            <p class="text-on-surface-variant text-sm mb-6 line-clamp-2">${card.shortDescription}</p>
            <div class="space-y-4">
                <div class="flex justify-between text-sm font-bold">
                    <span class="text-primary">${getPercentage(card.collected, card.goal)}% Financiado</span>
                    <span class="text-on-surface">${formatArs(card.collected)}</span>
                </div>
                <div class="w-full h-3 bg-surface-container-low rounded-full overflow-hidden">
                    <div class="bg-primary h-full rounded-full" style="width: ${getPercentage(card.collected, card.goal)}%"></div>
                </div>
                <div class="flex justify-between items-center pt-2">
                    <div class="text-xs text-on-surface-variant">Meta: <b>${formatArs(card.goal)}</b></div>
                    <button
                        class="bg-primary-container text-on-primary-fixed px-4 py-2 rounded-full text-xs font-bold hover:opacity-80 cursor-pointer">Invertir</button>
                </div>
            </div>
        </div>
    </div>
`;
};
