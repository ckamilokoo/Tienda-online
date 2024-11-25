import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const usePaginacion = () => {
  const route = useRoute();
  const pagina = ref(Number(route.query.pagina || 1));

  watch(
    () => route.query.page,
    (NewPage) => {
      pagina.value = Number(NewPage || 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  );
  return {
    pagina,
  };
};
