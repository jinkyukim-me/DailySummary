import React, { Component } from 'react';
import { Form, Input, Select, Checkbox, Button, AutoComplete } from 'antd';
import axios from 'axios';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class SignUpForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    let values;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values = values;
      }
    });

    axios.post('http://localhost:9000/signup', {
      email: '',
    })
    .then((response) => {
      console.log('success');
    })
    .catch((error) => {
      console.error(error);
    });
  };

  
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  // handleWebsiteChange = value => {
  //   let autoCompleteResult;
  //   if (!value) {
  //     autoCompleteResult = [];
  //   } else {
  //     autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
  //   }
  //   this.setState({ autoCompleteResult });
  // };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} className="one-signup flex flex-center">
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '잘못된 형식의 이메일입니다.',
              },
              {
                required: true,
                message: '이메일을 입력해주세요.',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '개인정보 제공에 동의해주세요.',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '비밀번호가 다릅니다. 다시 확인해주세요.',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} className="one-checkbox-wrap">
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              개인정보 제공에 동의합니다.
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} className="btn-wrap">
          <Button type="primary" htmlType="submit" className="btn btn-signup">
            가입
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedSignUpForm = Form.create({ name: 'register' })(SignUpForm);

export default WrappedSignUpForm;