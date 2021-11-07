import React, { useState } from 'react';
import QrReader from 'react-qr-reader'
import { ethers } from 'ethers'

function Check() {
  const defaultResult = '0x0561BCf470ea1837fB3c867b11fAd8E6749F35af;test;0x1bd6133900f4d1ade6281e99e73be30e6442104479f5c01e8bb8873adb6531235ac45df506dd283b92ada2538bd868f8762eb78e9de243e23b965f28f886c10d1c'
  // const defaultResult = 'No result'
  const [result, setResult] = useState(defaultResult)

  // manage displayed elements from result
  const resultHasExpectedSize = result.split(';').length === 3
  console.log(`resultHasExpectedSize: ${resultHasExpectedSize}`)

  let listItems = null
  let isSignatureVerified = false
  let isSignatureValid = null
  if (resultHasExpectedSize) {
    console.log(`result: ${result}`)
    let resultArray = result.split(';')
    console.dir(`resultArray: ${resultArray}`)
    let address = resultArray[0]
    console.dir(`address: ${address}`)
    let message = resultArray[1]
    console.dir(`message: ${message}`)
    let signature = resultArray[2]
    console.dir(`signature: ${signature}`)
    listItems = [
      <ul>
        <li>{address}</li>
        <li>{message}</li>
        <li>{signature}</li>
      </ul>
    ];
      let signerAddress = ethers.utils.verifyMessage(message , signature)
      console.log(signerAddress)
      isSignatureValid = signerAddress === address
      isSignatureVerified = true
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
    <div className="check">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-12">
            <QrReader
              delay={300}
              onError={(err) => handleError(err)}
              onScan={(data) => handleScan(data)}
              style={{ width: '100%' }}
            />
            <p>{result}</p>
            {resultHasExpectedSize
              ? <div>{listItems}</div>
              : <div>'Badly formatted QR code content'</div>
            }
            { isSignatureVerified 
                ? isSignatureValid 
                  ? <div>SignatureValid : YES</div>
                  : <div>SignatureValid : NO</div>
                : <div>Signature not verified</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Check;