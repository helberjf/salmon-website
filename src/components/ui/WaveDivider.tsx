interface WaveDividerProps {
  /** Classe de cor de texto: a onda é preenchida com `currentColor`. */
  className?: string;
}

/**
 * Onda de transição entre seções, no espírito das ondas do site da Norwell.
 * Fica ancorada na base da seção escura e é pintada com a cor da seção seguinte.
 */
export function WaveDivider({ className = 'text-white' }: WaveDividerProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -bottom-px block h-8 w-full sm:h-12 md:h-16 ${className}`}
    >
      <path
        fill="currentColor"
        d="M0 48C160 16 320 8 480 26s320 52 480 44 320-46 480-54v64H0Z"
      />
    </svg>
  );
}
