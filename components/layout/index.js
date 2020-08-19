import { Row, Col, Layout } from 'antd';
const { Header, Content, Footer } = Layout;
import Link from 'next/link'
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
    cursor: pointer;
`;

const StyledName = styled.span`
    font-size: 1.5em;
    font-weight: 700;
    color: #242A31;
    margin-left: 0.5em;
`

export const createPage = (Component, SubHeader) => () => {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <StyledHeader>
                    <Link href="/" as="/">
                        <a>
                            <StyledLogo src={"/yearn-logo.png"} alt="yearn-logo" /> 
                            <StyledName>yearn.finance</StyledName>
                        </a>
                    </Link>
                    <MainNavigationBar />
                </StyledHeader>
                {SubHeader && <SubHeader />}
                <Content style={{ margin: '2em' }}>
                    <Row>
                        <Col span={18} offset={3}>
                            <Component />
                        </Col>
                    </Row>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    built by <a href="https://twitter.com/cagince_">@cagince_</a> using ❤️ and ☕ 
                </Footer>
            </Layout>
        </Layout>
    )
};

export const createProductPage = (Component) => createPage(Component, ProductsNavigationBar);

