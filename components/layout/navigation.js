import { Menu } from 'antd';
import Link from 'next/link'
import { useRouter } from 'next/router';
const { Item } = Menu;

const ProductsRoutes = [
    { key: 'earn', label: 'Earn', path: '/app/earn' },
    { key: 'zap', label: 'Zap', path: '/app/zap' },
    { key: 'abr', label: 'APR', path: '/app/apr' },
    { key: 'vaults', label: 'Vaults', path: '/app/vaults' },
];

const MenuItem = ({ key, label, path }) => (
    <Item key={path}><Link href={path}>{label}</Link></Item>
);

const isProductPage = path => path.startsWith('/app');

const Navigation = () => {
    const { route } = useRouter();

    if (isProductPage(route)) {
        const children = ProductsRoutes.map(MenuItem);
        return (<Menu {...{ selectedKeys: route, mode: 'horizontal', children }} />);
    }

    return null;
}

export default Navigation;