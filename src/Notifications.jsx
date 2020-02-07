import React, { useContext, useState } from 'react'
import { Form, Icon, Input, Button, notification } from 'antd';
import { FirebaseContext } from './utils/firebase';


const NormalLoginForm = (props) => {
    const [loading, setLoading] = useState(false)
    const firebase = useContext(FirebaseContext)

    const enterLoading = () => {
        setLoading(true)
    };

    const exitLoading = () => {
        setLoading(false)
    };

    const clearInputs = () => {
        props.form.setFields({
            values: {
                description: "",
                title: ""
            }
        });
    }
    const openSucessNotification = (title) => {
        notification.open({
            message: 'Sucess',
            description:
                `Title : ${title},
            Notification sucessfully sent to all devices`,
            icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    };

    const openErrorNotification = () => {
        notification.open({
            message: 'Error',
            description:
                `Error sending the notication`,
            icon: <Icon type="smile" style={{ color: '#ff0000' }} />,
        });
    }
    const handleSubmit = e => {
        console.log("Code reached ", props)
        props.form.validateFields((err, values) => {
            if (!err) {
                enterLoading()
                firebase.firestore().collection("notifications").add({
                    ...values,
                    time: new Date()
                })
                    .then(function () {
                        console.log("Document successfully written!");
                        exitLoading()
                        clearInputs()
                        openSucessNotification(values.title)
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);

                        exitLoading()
                        openErrorNotification()
                    });


            }
        });
    };


    const { getFieldDecorator } = props.form;
    return (
        <Form className="login-form">
            <Form.Item label="Title" >
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input the Notification title' }],
                })(
                    <Input
                        placeholder="Notification Title"
                    />,
                )}
            </Form.Item>
            <Form.Item label="Description" >
                {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Please input the Notification description!' }],
                })(
                    <Input
                        placeholder="Notification Description"
                    />,
                )}
            </Form.Item>
            <Form.Item>

                <Button
                    htmlType="submit" type="primary" shape="round" size="large"
                    loading={loading}
                    onClick={handleSubmit}
                >
                    Send notifaction
          </Button>
            </Form.Item>
        </Form>
    );
}


const Notifications = Form.create({ name: 'normal_notification' })(NormalLoginForm);

export default Notifications