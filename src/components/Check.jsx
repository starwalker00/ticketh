import React, { useState } from 'react';
import QrReader from 'react-qr-reader'
import { ethers } from 'ethers'

function Check() {
  // const defaultResult = '0x0561BCf470ea1837fB3c867b11fAd8E6749F35af;test;0x1bd6133900f4d1ade6281e99e73be30e6442104479f5c01e8bb8873adb6531235ac45df506dd283b92ada2538bd868f8762eb78e9de243e23b965f28f886c10d1c'
  const defaultResult = 'No result'
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
      <ul className="list-group text-break">
        <li className="list-group-item">{address}</li>
        <li className="list-group-item">{message}</li>
        <li className="list-group-item">{signature}</li>
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
    <div className="check" style={{marginBottom: "70px"}}>
      <div className="container" >
        <div className="d-flex flex-column">
        <div className="qrreader col-lg-12">
            <QrReader
              delay={300}
              onError={(err) => handleError(err)}
              onScan={(data) => handleScan(data)}
              style={{ width: '100%' }}
            />
        </div>
        <div className="results text-break">
            <p>{result}</p>
            {resultHasExpectedSize
              ? <div>{listItems}</div>
              : <div>'Badly formatted QR code content'</div>
            }
            { isSignatureVerified 
                ? isSignatureValid 
                  ? <div className="text-center p-3 mb-2 bg-success text-white">SignatureValid : YES</div>
                  : <div className="text-center p-3 mb-2 bg-danger text-white">SignatureValid : NO</div>
                : <div className="text-center p-3 mb-2 bg-secondary text-white">Signature not verified</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Check;