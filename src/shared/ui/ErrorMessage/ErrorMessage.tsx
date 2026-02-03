import { Alert, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-[1001] p-6">
      <div className="max-w-md w-full">
        <Alert
          message="Ошибка"
          description={message}
          type="error"
          showIcon
          action={
            onRetry && (
              <Button size="small" danger onClick={onRetry} icon={<ReloadOutlined />}>
                Повторить
              </Button>
            )
          }
        />
      </div>
    </div>
  );
};
