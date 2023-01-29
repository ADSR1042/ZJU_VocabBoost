import { FloatButton } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
const History = () => {
  return (
    <FloatButton
      style={{ width:"50px",height:"50px" }}
      icon={<FileTextOutlined />}
      description="记录"
      onClick={() => console.log("click")}
    />
  );
};
export default History;
