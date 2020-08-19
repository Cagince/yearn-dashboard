import { useSelector, useDispatch } from "react-redux";
import { Form, Card, Row, Col, Space, Radio, Table, Input, Button, Slider, Divider, InputNumber } from "antd";
import { useState } from "react";
import styled from 'styled-components';
import { useForm } from "antd/lib/form/Form";

const calculateInterestRate = asset => asset.maxApr ? (asset.maxApr * 100).toFixed(4) + ' %' : 'N/A';

const columns = [
    {
        title: 'Asset',
        dataIndex: 'name',
        key: 'name',
        render: (_, record) => record.description
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

const StyledAssedDetailCard = styled(Card)`

    .ant-card-body {
        .ant-form-item {
            &:last-of-type {
                margin-bottom: 1em;
            }
        }
    }

    .ant-form-item-control-input-content {
        display: flex;
        flex-direction: column;

        .ant-input-number-lg {
            width: 100%;
        }
        
        label {
            width: 100%;
            text-align: right;
            font-weight: 700;
            margin-bottom: 0.5em;
        }
    }

    button {
        text-transform: capitalize
    }

`;

const SLIDER_MARKS = {
    0: '0%',
    25: '25%',
    50: '50%',
    75: '75%',
    100: '100%',
}

const ASSET_DETAIL_TABS = [
    { key: 'earn', tab: 'earn' },
    { key: 'claim', tab: 'claim' }
];

const ACTION_TO_PREFIX = {
    earn: 'Balance',
    claim: ''
}

const AssetDetail = ({ activeAsset = {} }) => {
    const max = 1234;
    const [form] = useForm();
    const [action, setAction] = useState(ASSET_DETAIL_TABS[0].key);
    const [amount, setAmount] = useState(0);
    const [percentage, setPercentage] = useState(0);

    return (
        <StyledAssedDetailCard 
            tabList={ASSET_DETAIL_TABS} 
            onTabChange={setAction}
        >
            <Form {...{ form }}>
                <Form.Item name="earn">
                    {activeAsset &&
                        <label>
                            {ACTION_TO_PREFIX[action]} {activeAsset.name}

                        </label>
                    }
                    <InputNumber size="large" onChange={setAmount} value={amount} />
                </Form.Item>
                <Form.Item name="percentage">
                    <Slider marks={SLIDER_MARKS} value={percentage} onChange={setPercentage} tooltipPlacement="bottom" tipFormatter={value => `${value}%`}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">{action}</Button>
                </Form.Item>
            </Form>
        </StyledAssedDetailCard>
    );
}

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
    const [activeAsset, setActiveAsset] = useState(undefined);

    return (
        <>
            <Row><Col span={24}><AssetTypeRadioButtons {...{ value: assetType, handleChange: setAssetType }} /></Col></Row>
            <Row gutter={[16, 16]}>
                <Col span={18}>
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
                    <Divider />
                    <Card 
                        title={`What is earn (${assetType})`} 
                        extra={<a href="https://www.learnyearn.finance/earn/coming-soon...">learn more</a>} 
                    >
                        Convert supported tokens into y-wrapped interest bearing tokens (eg. DAI to yDAI) <br />
                        similar to: a money market fund
                    </Card>
                </Col>
                <Col span={6}>
                    <AssetDetail {...{ activeAsset }} />
                </Col>
            </Row>
        </>
    );
}

export default EarnProductView;