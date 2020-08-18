import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import styled from 'styled-components';
import { MainNavigationBar, ProductsNavigationBar } from './navigation';

const StyledHeader = styled(Header)`
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledLogo = styled.img`
    height: 40px;
`;

export const createPage = (Component, SubHeader) => () => {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <StyledHeader>
                    <StyledLogo src={"/yearn-logo.png"} alt="yearn-logo" />
                    <MainNavigationBar />
                </StyledHeader>
                {SubHeader && <SubHeader />}
                <Content style={{ margin: '2em' }}>
                    <div style={{ padding: 24, minHeight: 360, background: 'white' }}>
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

export const createProductPage = (Component) => createPage(Component, ProductsNavigationBar);

