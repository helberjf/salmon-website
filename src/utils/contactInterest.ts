/**
 * Assunto do formulário de contato: cotação de salmão (padrão) ou entrada no
 * mercado brasileiro. Os links que levam a `#contato` informam o assunto com
 * `data-contact-interest="market"`; sem o atributo, vale a cotação.
 *
 * O clique é observado no documento inteiro porque o formulário só existe na
 * home e é carregado sob demanda: o assunto fica guardado na sessão para
 * sobreviver à navegação vinda de outra página.
 */
export type ContactInterest = 'salmon' | 'market';

const STORAGE_KEY = 'bridgepoint.contact-interest';
export const CONTACT_INTEREST_EVENT = 'bridgepoint:contact-interest';

export function readContactInterest(): ContactInterest {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === 'market' ? 'market' : 'salmon';
  } catch {
    return 'salmon';
  }
}

export function watchContactLinks(): () => void {
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[href$="#contato"]');
    if (!link) return;

    const interest: ContactInterest =
      link.getAttribute('data-contact-interest') === 'market' ? 'market' : 'salmon';
    try {
      window.sessionStorage.setItem(STORAGE_KEY, interest);
    } catch {
      // Sem armazenamento (aba privada, bloqueio): o evento abaixo ainda cobre a mesma página.
    }
    window.dispatchEvent(new CustomEvent<ContactInterest>(CONTACT_INTEREST_EVENT, { detail: interest }));
  };

  document.addEventListener('click', onClick, { capture: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
}
