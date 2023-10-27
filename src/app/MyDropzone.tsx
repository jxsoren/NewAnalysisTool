"use client";

import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Papa from "papaparse";

const MyDropzone = () => {
  // This state is used to store the parsed data in a format that can be rendered by the component.
  const [parsedData, setParsedData] = useState<any[] | null>(null);

  // This function is called when a file is dropped on the dropzone component.
  const handleFiles = (files: File[]) => {
    const file = files[0]; // assuming only one file is uploaded
    parseCSV(file);
  };

  // This function parses the CSV file and updates the state with the parsed data.
  const parseCSV = (file: File) => {
    Papa.parse(file, {
      complete: (result: any) => {
        console.log("Parsed Result:", result);
        setParsedData(result.data);
      },
      header: true, // indicates the first row contains column headers
    });
  };

  const renderParsedData = () => {
    if (!parsedData) {
      return null;
    }

    const headers = Object.keys(parsedData[0]);
    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {parsedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Dropzone onDrop={(acceptedFiles) => handleFiles(acceptedFiles)}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
          {renderParsedData()}
        </section>
      )}
    </Dropzone>
  );
};

export default MyDropzone;
