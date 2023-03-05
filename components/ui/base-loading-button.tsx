type Props = {
  loading: boolean;
  style: string;
  text: string;
  loadingText?: boolean;
  onClick: () => void;
};

export const BaseLoadingButton = ({
  loading,
  style,
  text,
  onClick,
  loadingText = true,
}: Props) => {
  return (
    <button onClick={onClick} disabled={loading} className={style}>
      {loading ? <LoadingSvg text={loadingText} /> : text}
    </button>
  );
};

const LoadingSvg = ({ text }: { text: boolean }) => (
  <>
    <svg
      className="w-4 h-4 text-white animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    {text ? <span>Loading...</span> : null}
  </>
);
