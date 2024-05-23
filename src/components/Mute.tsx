import { LineOutlined, MutedOutlined } from "@ant-design/icons";

const Mute = ({ isMuted }) => {
  
    return (
      <div className="w-max h-max relative text-slate-400 relative">
        <MutedOutlined />
        {isMuted && <LineOutlined className="absolute rotate-45 block top-[1px]"/>}
      </div>
    );
  };

export default Mute;
