import React, { useContext, useEffect, useState } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';
import { useTranslation } from "react-i18next";
import SettingContext from '@/context/settingContext';

const DeliverySection = ({ values, setFieldValue }) => {
    const { t } = useTranslation( 'common');
    const { settingData } = useContext(SettingContext);
    const [defaultDe, setDefaultDe] = useState(0);
    useEffect(() => {
        if (settingData?.delivery?.default?.title && settingData?.delivery?.default?.description) {
            setFieldValue('delivery_description', `${settingData?.delivery?.same_day?.title} | ${settingData?.delivery?.same_day?.description}`);
            setDefaultDe(1);
        }
    }, [settingData]);

    return (
        <div className="checkbox-main-box">
            <div className="checkout-title1">
                <h2>{'Delivery Details'}</h2>
            </div>
            <Row className='g-4'>
                <Col xxl={6}>
                    <div className='delivery-option'>
                        <div className='delivery-category'>
                            <div className='shipment-detail w-100'>
                                <div className='form-check custom-form-check hide-check-box'>
                                    <Input
                                        className='form-check-input'
                                        type='radio'
                                        name='standard'
                                        checked={defaultDe == 1}
                                        id='standard1'
                                        onChange={() => {
                                            setFieldValue('delivery_description', `${settingData?.delivery?.default?.title} | ${settingData?.delivery?.default?.description}`);
                                            setFieldValue('isTimeSlot', false);
                                            setFieldValue('delivery_interval', null);
                                            setDefaultDe(1);
                                        }}
                                    />
                                    <Label className='form-check-label' htmlFor='standard1'>
                                        {settingData?.delivery?.default?.title} | {settingData?.delivery?.default?.description}
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                {settingData?.delivery?.same_day_delivery && (
                    <>
                        <Col xxl={6}>
                            <div className='delivery-option'>
                                <div className='delivery-category'>
                                    <div className='shipment-detail w-100'>
                                        <div className='form-check custom-form-check hide-check-box'>
                                            <Input
                                                className='form-check-input'
                                                type='radio'
                                                name='standard'
                                                id='standard2'
                                                checked={defaultDe == 2}
                                                onChange={() => {
                                                    setFieldValue('delivery_description', `${settingData?.delivery?.same_day?.title} | ${settingData?.delivery?.same_day?.description}`);
                                                    setFieldValue('isTimeSlot', true);
                                                    setFieldValue('delivery_interval', null);
                                                    setDefaultDe(2);
                                                }}
                                            />
                                            <Label className='form-check-label' htmlFor='standard2'>
                                                {settingData?.delivery?.same_day?.title} | {settingData?.delivery?.same_day?.description}
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs='12' className={`future-box ${values['isTimeSlot'] ? 'show' : ''}`}>
                            <div className='future-option'>
                                <div className='delivery-items'>
                                    <div>
                                        <h4>{t('Selecttimingslot')}:</h4>
                                        <ul>
                                            {settingData?.delivery?.same_day_intervals.length > 0 &&
                                                settingData?.delivery?.same_day_intervals.map((elem, i) => (
                                                    <li
                                                        className={`${values['delivery_interval'] == elem?.description ? 'active' : ''}`}
                                                        onClick={() => {
                                                            setFieldValue('delivery_interval', elem?.description);
                                                        }}
                                                        key={i}>
                                                        <a>{elem?.description}</a>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </>
                )}
            </Row>
        </div>
    )
};

export default DeliverySection;
