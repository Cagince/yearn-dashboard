import { Menu } from 'antd';
import Link from 'next/link'
import { withRouter } from 'next/router';
import styled from 'styled-components';
const { Item } = Menu;


const StyledMainMenu = styled(Menu)`
    background: transparent;
`;

const StyledProductsMenuWrapper = styled.div`
    background: #fff;
    padding: 0 8em;
`;

const ProductRoutes = [
    { key: 'earn', label: 'Earn', path: '/products/earn' },
    { key: 'zap', label: 'Zap', path: '/products/zap' },
    { key: 'apr', label: 'APR', path: '/products/apr' },
    { key: 'vaults', label: 'Vaults', path: '/products/vaults' },
];

const Routes = [
    { key: 'about', label: 'About', path: '/about' },
    { key: 'documentation', label: 'Documentation', path: '/documentation', external: 'https://docs.yearn.finance/' },
    { key: 'learn', label: 'Learn', path: '/learn', external: 'https://www.learnyearn.finance/' },
    { key: 'products', label: 'Products', path: ProductRoutes[0].path },
    { key: 'governance', label: 'Governance', path: '/gov', external: 'https://gov.yearn.finance/' },
];


const routeToMainKey = (path) => path.split('/')[1];
const routeToProductKey = (path) => path.split('/')[2];

const MenuItem = ({ key, label, path, external }) => (
    <Item key={key}>
        {external 
            ? <a {...{ href: external, target: '_blank' }}>{label}</a>
            : (
                <Link {...{ href: path, as: path }} >
                    <a>{label}</a>
                </Link>
            )
        }
    </Item>
);

export const MainNavigationBar = withRouter(({ router }) => {
    const children = Routes.map(MenuItem);

    return (<StyledMainMenu {...{ selectedKeys: routeToMainKey(router.route), mode: 'horizontal', children }} />);
});

export const ProductsNavigationBar =  withRouter(({ router }) => {
    const children = ProductRoutes.map(MenuItem);

    return (
        <StyledProductsMenuWrapper>
            <Menu {...{ selectedKeys: routeToProductKey(router.route), mode: 'horizontal', children }} />
        </StyledProductsMenuWrapper>
    );
});

