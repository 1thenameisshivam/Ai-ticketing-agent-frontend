import React, { useState } from "react";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<NavLink to={"/"}>Ticket</NavLink>, "1", <PieChartOutlined />),
  getItem(<NavLink to={"/create"}>Create</NavLink>, "2", <DesktopOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="dark"
        style={{ backgroundColor: "" }} // ✅ Teal sidebar
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="text-xl font-bold text-white flex items-center justify-center h-16">
          ⚙️Agentra
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ backgroundColor: "", color: "white" }} // ✅ White text on teal
        />
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: "",
            color: "white",
            padding: "0 20px",
          }}
        >
          <h1 style={{ color: "white" }}>Dashboard</h1>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={[{ title: "User" }, { title: "Ticket" }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "#f0f2f5" }}>
          <span style={{ color: "#00CC8E" }}>
            Agentra Ai ©{new Date().getFullYear()} Created by Ant UED
          </span>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
