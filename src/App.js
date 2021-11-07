import React, { useState } from 'react';
import QrReader from 'react-qr-reader'

function App() {
  const defaultResult = '0x0561BCf470ea1837fB3c867b11fAd8E6749F35af;test;0x1bd6133900f4d1ade6281e99e73be30e6442104479f5c01e8bb8873adb6531235ac45df506dd283b92ada2538bd868f8762eb78e9de243e23b965f28f886c10d1c'
  // const defaultResult = 'No result'
  const [result, setResult] = useState(defaultResult)

  // manage displayed elements from result
  const resultHasExpectedSize = result.split(';').length === 3
  let listItems = null
  if (resultHasExpectedSize) {
    listItems = result.split(';').map((result) =>
      <li>{result}</li>
      );
  }

  // QR code reader handlers
  function handleScan(data) {
    if (data) {
      setResult(data)
    }
  }
  function handleError(err) {
    console.error(err)
  }

  return (
    <div>
    <QrReader
      delay={300}
      onError={(err) => handleError(err)}
      onScan={(data) => handleScan(data)}
      style={{ width: '100%' }}
    />
    <p>{result}</p>
    {resultHasExpectedSize
        ? <p><ul>{listItems}</ul></p>
        : <p>'Badly formatted QR code content'</p>
    }
    </div>
  );
}

export default App;