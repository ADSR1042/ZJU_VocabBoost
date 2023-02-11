import { ConfigProvider } from "antd";
import App from "./App";
// ConfigProvider.config({
  // theme: { primaryColor: "#25b864",},
// });
const Main = () => {
  return (
    <>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </>
  );
};
export default Main;
