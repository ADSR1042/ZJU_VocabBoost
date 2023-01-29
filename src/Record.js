import { Button, Popover, Space } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
const Record = () => (
  <Space wrap>
    <Popover content={content} title="Title" trigger="click">
      <Button
      type="text"
      icon={<FileTextOutlined />}
      >

      </Button>
    </Popover>
  </Space>
);
export default Record;