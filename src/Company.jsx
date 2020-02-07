import React, { useContext } from "react"
import { Table, Divider, Spin } from 'antd';
import { FirebaseContext } from './utils/firebase'

import { useCollection } from 'react-firebase-hooks/firestore';
import 'firebase/firestore'

const columns = [
  {
    title: 'Tender',
    dataIndex: 'tender',
    key: 'tender',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Quality Comparisons',
    dataIndex: 'qualityComparisons',
    key: 'qualityComparisons',
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
    onGoingProject: "Nil",
    phone: "0715261496",
    qualityComparisons: "Same quality ",
    tender: "Mtwara Namis"
  },
  {
    key: '2',
    onGoingProject: "Nil",
    phone: "0715261496",
    qualityComparisons: "Same quality ",
    tender: "Mtwara Namis"
  }
];

export default function () {

  const firebase = useContext(FirebaseContext)
  console.log("forebase", firebase)

  const [value, loading, error] = useCollection(
    firebase.firestore().collection('companies'),
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

    </div>)

  if (value) {

    var data = value.docs.map(doc => doc.data())
    console.log("Company data", data)
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