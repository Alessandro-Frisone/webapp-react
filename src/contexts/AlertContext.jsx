import Alert from "../components/ui/Alert";
import { createContext, useContext, useState } from "react";

// Creo il contesto
const AlertContext = createContext();

// Creo il componente "custom provider"
const initialAlertState = {
  title: "",
  text: "",
  variant: "",
};
function AlertProvider({ children }) {
  const [alertData, setAlertData] = useState(initialAlertState);

  return (
    <AlertContext.Provider value={{ alertData, setAlertData }}>
      <Alert
        title={alertData.title}
        text={alertData.text}
        variant={alertData.variant}
        handleAlertClose={() => setAlertData(initialAlertState)}
      />
      {children}
    </AlertContext.Provider>
  );
}

// custom hook per consumare il contesto
function useAlertContext() {
  const context = useContext(AlertContext);
  return context;
}

export { AlertProvider, useAlertContext };