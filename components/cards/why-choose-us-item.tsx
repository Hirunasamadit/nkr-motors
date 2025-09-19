import { FaCheck } from "react-icons/fa";

interface WhyChooseUsItemProps {
  text: string;
}

export function WhyChooseUsItem({ text }: WhyChooseUsItemProps) {
  return (
    <li className="group flex items-center text-[var(--dark-300)] hover:text-[var(--dark-200)] transition-colors duration-300 ease-out">
      <span className="flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-white bg-[var(--primary-500)] group-hover:bg-[var(--primary-300)] transition-colors duration-300 ease-out">
        <FaCheck className="w-3 h-3" />
      </span>
      {text}
    </li>
  );
}
