import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa6";

const Loading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <FaSpinner
        role="status"
        aria-label="loading"
        className={cn("size-4 animate-spin")}
      />
      <p>{children ? children : "Loading..."}</p>
    </div>
  );
};

export default Loading;
