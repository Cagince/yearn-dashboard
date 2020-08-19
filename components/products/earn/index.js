import { useSelector, useDispatch } from "react-redux";
import { Space, Radio, Table } from "antd";
import { useState } from "react";

const calculateInterestRate = asset => asset.maxApr ? (asset.maxApr * 100).toFixed(4) + ' %' : 'N/A';

const columns = [
    {
        title: 'Asset',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Interest Rate',
        dataIndex: 'interest-rate',
        key: 'interest-rate',
        align: 'center',
        render: (_, asset) => calculateInterestRate(asset)
    },
    {
        title: 'Available Balance',
        dataIndex: 'balance',
        key: 'balance',
        align: 'center',
        render: (_, { balance, symbol }) => `${balance} ${symbol}`
    },

];

//#region Asset types
const ASSET_TYPES = ['v1', 'y.curve.fi', 'busd.curve.fi'];
const ASSET_TYPE_TO_VERSION = {
    v1: 1,
    'y.curve.fi': 2,
    'busd.curve.fi': 3
};
const assetsOfType = (assets, type) => assets.filter(asset => 
    asset.version === ASSET_TYPE_TO_VERSION[type] && 
    asset.symbol !== 'iDAI'
);

const AssetTypeRadioButtons = ({ value, handleChange }) => (
    <Space direction="vertical" style={{ marginBottom: '1em' }}>
        <Radio.Group {...{ buttonStyle: 'solid', value, onChange: e => handleChange(e.target.value)}}>
            {ASSET_TYPES.map(value => (
                <Radio.Button {...{ key: `asset-type-${value}`, value, children: value }} />
            ))}
        </Radio.Group>
    </Space>
);
//#endregion

const useAssets = () => {
    const assets = useSelector(state => state.assets);
    const dispatch = useDispatch();
    /**
     * @todo: add actions here!
     */

    return { assets: assets.map(a => ({ ...a, key: a.id })) };
}

const EarnProductView = () => {
    const { assets } = useAssets();
    const [assetType, setAssetType ] = useState(ASSET_TYPES[1]);
    const [activeAsset, setActiveAsset] = useState(null);

    return (
        <div>
            <AssetTypeRadioButtons {...{ value: assetType, handleChange: setAssetType }} />
            <Table {...{
                columns,
                dataSource: assetsOfType(assets, assetType),
                showHeader: false,
                pagination: false,
                expandable: {
                    expandRowByClick: true,
                    expandIcon: ({ record }) => record.symbol,
                    expandedRowKeys: [activeAsset?.key],
                    onExpand: (expanded, record) => setActiveAsset(expanded ? record : null),
                    expandedRowRender: record => <div>todo;</div>,
                }
            }}/>
        </div>
    );
}

export default EarnProductView;