import { Spin } from "antd";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-[1001]">
      <Spin size="large" fullscreen />
    </div>
  );
};
