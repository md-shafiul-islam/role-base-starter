import {
  ConsoleSqlOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons/lib/icons";
import { Button, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useState } from "react";
import { render } from "react-dom";

class MenuFilterPhones extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div style={{ width: 256 }}>
        <Button
          type="primary"
          onClick={this.toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {React.createElement(
            this.state.Collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["All"]}
          mode="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Items key="all">All</Menu.Items>
          <SubMenu key="brand" icon={<MailOutlined />} title="Brands">
            <Menu.Item key="apple">Apple</Menu.Item>
            <Menu.Item key="samsung">samsung</Menu.Item>
            <Menu.Item key="oneplus">oneplus</Menu.Item>
            <Menu.Item key="xiaomi">xiaomi</Menu.Item>
            <Menu.Item key="realme">realme</Menu.Item>
            <Menu.Item key="htc">htc</Menu.Item>
            <Menu.Item key="motorola">motorola</Menu.Item>
            <Menu.Item key="nokia">nokia</Menu.Item>
            <Menu.Item key="huawei">huawei</Menu.Item>
            <Menu.Item key="blackberry">blackberry</Menu.Item>
            <Menu.Item key="acer">acer</Menu.Item>
            <Menu.Item key="lg">lg</Menu.Item>
            <Menu.Item key="lava">lava</Menu.Item>
            <Menu.Item key="microsoft">microsoft</Menu.Item>
            <Menu.Item key="micromax">micromax</Menu.Item>
            <Menu.Item key="asus">asus</Menu.Item>
            <Menu.Item key="sony">sony</Menu.Item>
            <Menu.Item key="alcatel">alcatel</Menu.Item>
            <Menu.Item key="allview">allview</Menu.Item>
            <Menu.Item key="amazon">amazon</Menu.Item>
            <Menu.Item key="amoi">amoi</Menu.Item>
            <Menu.Item key="archos">archos</Menu.Item>
            <Menu.Item key="at&t">at&t</Menu.Item>
            <Menu.Item key="benefon">benefon</Menu.Item>
            <Menu.Item key="benq">benq</Menu.Item>
            <Menu.Item key="benq-siemens">benq-siemens</Menu.Item>
            <Menu.Item key="blackview">blackview</Menu.Item>
            <Menu.Item key="blu">blu</Menu.Item>
            <Menu.Item key="bosch">bosch</Menu.Item>
            <Menu.Item key="bq">bq</Menu.Item>
            <Menu.Item key="casio">casio</Menu.Item>
            <Menu.Item key="cat">cat</Menu.Item>
            <Menu.Item key="celkon">celkon</Menu.Item>
            <Menu.Item key="chea">chea</Menu.Item>
            <Menu.Item key="coolpad">coolpad</Menu.Item>
            <Menu.Item key="emporia">emporia</Menu.Item>
            <Menu.Item key="energizer">energizer</Menu.Item>
            <Menu.Item key="fujitsu-siemens">fujitsu-siemens</Menu.Item>
            <Menu.Item key="gionee">gionee</Menu.Item>
            <Menu.Item key="google">google</Menu.Item>
            <Menu.Item key="haier">haier</Menu.Item>
            <Menu.Item key="i-mate">i-mate</Menu.Item>
            <Menu.Item key="i-mobile">i-mobile</Menu.Item>
            <Menu.Item key="icemobile">icemobile</Menu.Item>
            <Menu.Item key="infinix">infinix</Menu.Item>
            <Menu.Item key="innostream">innostream</Menu.Item>
            <Menu.Item key="inq">inq</Menu.Item>
            <Menu.Item key="jolla">jolla</Menu.Item>
            <Menu.Item key="karbonn">karbonn</Menu.Item>
            <Menu.Item key="kyocera">kyocera</Menu.Item>
            <Menu.Item key="leeco">leeco</Menu.Item>
            <Menu.Item key="maxon">maxon</Menu.Item>
            <Menu.Item key="maxwest">maxwest</Menu.Item>
            <Menu.Item key="meizu">meizu</Menu.Item>
            <Menu.Item key="mitac">mitac</Menu.Item>
            <Menu.Item key="mitsubishi">mitsubishi</Menu.Item>
            <Menu.Item key="modu">modu</Menu.Item>
            <Menu.Item key="mwg">mwg</Menu.Item>
            <Menu.Item key="nec">nec</Menu.Item>
            <Menu.Item key="neonode">neonode</Menu.Item>
            <Menu.Item key="niu">niu</Menu.Item>
            <Menu.Item key="o2">o2</Menu.Item>
            <Menu.Item key="orange">orange</Menu.Item>
            <Menu.Item key="palm">palm</Menu.Item>
            <Menu.Item key="panasonic">panasonic</Menu.Item>
            <Menu.Item key="pantech">pantech</Menu.Item>
            <Menu.Item key="parla">parla</Menu.Item>
            <Menu.Item key="philips">philips</Menu.Item>
            <Menu.Item key="plum">plum</Menu.Item>
            <Menu.Item key="posh">posh</Menu.Item>
            <Menu.Item key="prestigio">prestigio</Menu.Item>
            <Menu.Item key="mwg">qmobile</Menu.Item>
            <Menu.Item key="qtek">qtek</Menu.Item>
            <Menu.Item key="razer">razer</Menu.Item>
            <Menu.Item key="sagem">sagem</Menu.Item>
            <Menu.Item key="sendo">sendo</Menu.Item>
            <Menu.Item key="sewon">sewon</Menu.Item>
            <Menu.Item key="sharp">sharp</Menu.Item>
            <Menu.Item key="siemens">siemens</Menu.Item>
            <Menu.Item key="sonim">sonim</Menu.Item>
            <Menu.Item key="zte">zte</Menu.Item>
            <Menu.Item key="sony-ericson">sony-ericson</Menu.Item>
            <Menu.Item key="spice">spice</Menu.Item>
            <Menu.Item key="t-mobile">t-mobile</Menu.Item>
            <Menu.Item key="tcl">tcl</Menu.Item>
            <Menu.Item key="tecno">tecno</Menu.Item>
            <Menu.Item key="tel.me.">tel.me.</Menu.Item>
            <Menu.Item key="telit">telit</Menu.Item>
            <Menu.Item key="thuraya">thuraya</Menu.Item>
            <Menu.Item key="toshiba">toshiba</Menu.Item>
            <Menu.Item key="ulefone">ulefone</Menu.Item>
            <Menu.Item key="unneto">unneto</Menu.Item>
            <Menu.Item key="vertu">vertu</Menu.Item>
            <Menu.Item key="verykool">verykool</Menu.Item>
            <Menu.Item key="vk-mobile">vk-mobile</Menu.Item>
            <Menu.Item key="vodafone">vodafone</Menu.Item>
            <Menu.Item key="wiko">wiko</Menu.Item>
            <Menu.Item key="xcute">xcute</Menu.Item>
            <Menu.Item key="xolo">xolo</Menu.Item>
            <Menu.Item key="yezz">yezz</Menu.Item>
            <Menu.Item key="xcute">yota</Menu.Item>
            <Menu.Item key="yu">yu</Menu.Item>
          </SubMenu>
        </Menu>
        MenuFilterPhones
      </div>
    );
  }
}

// export default MenuFilterPhones;
ReactDOM.render(<MenuFilterPhones />);
