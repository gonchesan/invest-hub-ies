import { getPercentage, formatArs } from '../utils/currency.js';

const CATEGORY_STYLES = {
  Tecnología: {
    container: 'bg-primary-container/90 text-on-primary-container',
  },
  Sostenibilidad: {
    container: 'bg-tertiary-container/90 text-on-tertiary-container',
  },
  Arte: {
    container: 'bg-secondary-container/90 text-on-secondary-container',
  },
  Impacto: {
    container: 'bg-primary-container/90 text-on-primary-container',
  },
};

const getCategoryClass = (category) => {
  return (
    CATEGORY_STYLES[category]?.container ||
    'bg-surface-container-high text-on-surface'
  );
};

export const createProjectCard = (card) => {
  const percentage = getPercentage(card.collected, card.goal);
  const daysLeft =
    card.lastHours === 0
      ? 'Finalizado'
      : `${Math.ceil(card.lastHours / 24)} días restantes`;

  return `
    <article
      class="bg-surface-container-lowest rounded-2xl overflow-hidden ambient-shadow flex flex-col group hover:-translate-y-1 transition-transform duration-300">

      <div class="relative h-64 overflow-hidden">
        <img
          alt="${card.title}"
          src="${card.image}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div
          class="absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getCategoryClass(
            card.category,
          )}">
          ${card.category}
        </div>
      </div>

      <div class="p-8 flex flex-col flex-grow">
        <h3 class="font-headline text-2xl font-bold text-on-surface mb-3 leading-tight">
          ${card.title}
        </h3>

        <p class="text-on-surface-variant body-md mb-6 flex-grow leading-relaxed">
          ${card.shortDescription}
        </p>

        <div class="space-y-4">
          <div class="flex justify-between items-end mb-1">
            <span class="text-sm font-bold text-primary">
              ${percentage}% ${percentage >= 100 ? 'Financiado' : 'Completado'}
            </span>

            <span class="text-sm text-outline font-medium">
              ${daysLeft}
            </span>
          </div>

          <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
            <div
              class="h-full bg-primary-container rounded-full"
              style="width: ${Math.min(percentage, 100)}%">
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div>
              <span class="block text-[10px] uppercase font-bold text-outline-variant tracking-wider">
                Recaudado
              </span>

              <span class="text-lg font-extrabold text-on-surface">
                ${formatArs(card.collected)}
              </span>
            </div>

            <button
              class="bg-on-surface text-surface py-2 px-6 rounded-full font-bold text-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer">
              Ver más
            </button>
          </div>
        </div>
      </div>

    </article>
  `;
};

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
