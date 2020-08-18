import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

export default ({ children }) => {

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout">
                <Header style={{ background: '#fff'}} />
                <Content style={{ margin: '2em' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: 'white' }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    built by <a href="https://twitter.com/cagince_">@cagince_</a> using ❤️ and ☕ 
                </Footer>
            </Layout>
        </Layout>
    )
}