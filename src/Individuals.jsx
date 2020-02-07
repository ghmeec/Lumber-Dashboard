import React, { useContext } from "react"
import { FirebaseContext } from './utils/firebase'

import { useCollection } from 'react-firebase-hooks/firestore';
import { Table, Divider, Spin } from 'antd';
import 'firebase/firestore'
const columns = [
    {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Site',
        dataIndex: 'site',
        key: 'site',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <span>
                  <a href={`https://maps.google.com/?ll=${record.location.latitude },${record.location.longitude}`} target="_blank">Open Location</a>
                <Divider type="vertical" />
                <a>Delete</a>
            </span>
        ),
    },
];

const data = [
    {
        key: '1',
        owner: 'John Brown',
        phone: 32,
        site: 'Makongo',
    },
    {
        key: '2',
        owner: 'Jim Green',
        phone: 42,
        site: 'Unknown location',
    }
];

export default function () {
    const firebase = useContext(FirebaseContext)
    console.log("forebase", firebase)
    // return(
    //     // <Table columns={columns} dataSource={data} />
    // )

    const [value, loading, error] = useCollection(
        firebase.firestore().collection('individuals'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    if (error) return (
        <strong>Error: {JSON.stringify(error)}</strong>
    )
    if (loading) return (
        <div style={{
            textAlign: "center",
            borderRadius: "4px",
            marginBottom: 20,
            padding: "30px 50px",
            margin: "20px 0"
        }}>
            <Spin size="large" tip="Loading data..." />
         
        </div>
    )

    if (value) {

        var data = value.docs.map(doc => doc.data())
        console.log("Individual data", data)
        return (
            <div>
                <p>
                    {value && (
                        <span>
                            <Table columns={columns} dataSource={data} />
                        </span>
                    )}
                </p>
            </div>
        );

    }

}