export default function Button({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-orange-500 text-white py-2 px-6 rounded-lg text-center cursor-pointer select-none font-bold text-lg"
    >
      {text}
    </div>
  );
}
