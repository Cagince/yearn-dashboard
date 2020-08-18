import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import styled from 'styled-components';

const StyledLogo = styled.img`
    height: 40px;
`;

const withLayout = Component => () => {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout">
                <Header style={{ background: '#fff'}} >
                    <StyledLogo src={"/yearn-logo.png"} alt="yearn-logo" />

                </Header>
                <Content style={{ margin: '2em' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: 'white' }}>
                        <Component />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    built by <a href="https://twitter.com/cagince_">@cagince_</a> using ❤️ and ☕ 
                </Footer>
            </Layout>
        </Layout>
    )
};

export default withLayout;
