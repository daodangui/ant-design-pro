import React, { Component, Fragment } from 'react';
import { Form, Input, Select, Button } from 'antd';
import styles from './Userinfo.less';
import GeographicView from './GeographicView';
import PhoneView from './PhoneView';

const FormItem = Form.Item;
const { Option } = Select;

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <div className={styles.button_view}>
      <Button icon="upload">更换头像</Button>
    </div>
  </Fragment>
);

const validatorGeographic = (rule, value, callback) => {
  const { province, city } = value;
  if (!province.key) {
    callback('Please input your province!');
  }
  if (!city.key) {
    callback('Please input your city!');
  }
  callback();
};

const validatorPhone = (rule, value, callback) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

@Form.create()
export default class Userinfo extends Component {
  componentDidMount() {
    this.setUserInfo();
  }
  setUserInfo = () => {
    const { currentUser } = this.props;
    Object.keys(this.props.form.getFieldsValue()).forEach((key) => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      this.props.form.setFieldsValue(obj);
    });
  };
  getAvatarURL() {
    if (this.props.currentUser.avatar) {
      return this.props.currentUser.avatar;
    }
    const url =
      'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.userinfo}>
        <div className={styles.left}>
          <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark>
            <FormItem label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Please input your email!' },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="昵称">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please input your nick name!' },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="个人简介">
              {getFieldDecorator('profile', {
                rules: [
                  { required: true, message: 'Please input personal profile!' },
                ],
              })(<Input.TextArea rows={4} />)}
            </FormItem>
            <FormItem label="国家/地区">
              {getFieldDecorator('country', {
                rules: [
                  { required: true, message: 'Please input your country!' },
                ],
              })(
                <Select style={{ width: 220 }}>
                  <Option value="China">中国</Option>
                  <Option value="USA">美国</Option>
                  <Option value="France">法国</Option>
                  <Option value="Russian">俄罗斯</Option>
                  <Option value="UK">英国</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem label="所在省市">
              {getFieldDecorator('geographic', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your geographic info!',
                  },
                  {
                    validator: validatorGeographic,
                  },
                ],
              })(<GeographicView />)}
            </FormItem>
            <FormItem label="街道地址">
              {getFieldDecorator('address', {
                rules: [
                  { required: true, message: 'Please input your address!' },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="联系电话">
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: 'Please input your phone!' },
                  { validator: validatorPhone },
                ],
              })(<PhoneView />)}
            </FormItem>
            <Button type="primary">更新信息</Button>
          </Form>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
      </div>
    );
  }
}
