import { useEffect } from "react";
import Heading from "./Heading";
import Paragraph from "./Paragraph";

export default function Alert({
  title,
  text,
  variant = "info",
  handleAlertClose,
}) {
  const variants = {
    info: "bg-blue-200",
    success: "bg-green-200",
    danger: "bg-red-200",
  };

  // Bonus: temporizzazione del alert con clean up function per evitare di aggiugnere troppi e inutili setTimeout alla pagina
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAlertClose();
    }, 3000);

    // 👇 clean up function che viene eseguita prima della funzione dello use effect
    return () => {
      clearTimeout(timeoutId);
    };
  }, [title, text, handleAlertClose]);

  if (!title || !text) return null;

  return (
    <div
      className={`w-sm fixed bottom-5 right-5 p-2 rounded-md shadow-md ${variants[variant]}`}
    >
      <div className="relative">
        <Heading level={5}>{title}</Heading>
        <Paragraph size="sm">{text}</Paragraph>
        <i
          onClick={handleAlertClose}
          className="fa-solid fa-circle-xmark absolute top-0 right-0 text-lg"
        ></i>
      </div>
    </div>
  );
}