"use client";
import ReactPDF, { PDFViewer, pdf, PDFDownloadLink } from "@react-pdf/renderer";
import PDFTest from "./components/PDFTest";
import dynamic from "next/dynamic";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [_ownName, set_OwnName] = useState("Steve HammerSmith");
  const [_company, set_Company] = useState("Company");
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNameChange = (e: any) => {
    e.preventDefault();
    set_OwnName((prev) => {
      console.log({ prev, CockName: e.target.value });
      return e.target.value;
    });
  };
  const handleCompanyChange = (e: any) => {
    e.preventDefault();
    set_Company((prev) => {
      console.log({ prev, CockCompany: e.target.value });
      return e.target.value;
    });
  };

  const handleClick = () => {
    setClicked(true);
    set_Company(_company);
    set_OwnName(_ownName);
  };
  const handleDownload = (loading: boolean) => {
    set_Company(_company);
    set_OwnName(_ownName);
    return loading ? "Loading document..." : "Download now!";
  };

  return (
    <>
      {isClient ? (
        // <PDFViewer>
        <div className="mb-20">
          <div className="flex flex-col gap-5 border border-gray-400 rounded-lg p-4 mb-32 m-3">
            <h1 className="text-3xl text-center">Edit PDF</h1>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex gap-3 justify-center items-center">
                <label className="text-center " htmlFor="name">
                  Name
                </label>
                <input
                  className="border-2 border-gray-500 rounded-md p-2"
                  type="text"
                  name="name"
                  placeholder={"Enter Name on PDF"}
                  onChange={(e) => handleNameChange(e)}
                />
              </div>
              <div className="flex gap-3 justify-center items-center">
                <label className="text-center " htmlFor="companyName">
                  Company Name
                </label>
                <input
                  className="border-2  border-gray-500 rounded-md p-2"
                  type="text"
                  name="companyName"
                  placeholder={"Edit Company Name on PDF"}
                  onChange={(e) => handleCompanyChange(e)}
                />
              </div>
              {!clicked && (
                <button
                  onClick={() => handleClick()}
                  className="bg-black rounded-md border border-white text-white max-w-sm p-4 mt-3"
                >
                  Generate Pdf
                </button>
              )}

              {clicked && (
                <div className="flex flex-col">
                  <button className="bg-white rounded-md border border-black text-black max-w-sm p-4 mt-3">
                    <PDFDownloadLink
                      document={
                        <PDFTest companyName={_company} name={_ownName} />
                      }
                      fileName={`${_company}_report__example.pdf`}
                    >
                      {({ blob, url, loading, error }) =>
                        handleDownload(loading)
                      }
                    </PDFDownloadLink>
                  </button>
                  <button
                    className="bg-gray-500 rounded-md border border-black text-white max-w-sm p-4 mt-3"
                    onClick={() => window.location.reload()}
                  >
                    Restart
                  </button>
                </div>
              )}
            </div>
          </div>

          <PDFTest companyName={_company} name={_ownName} />
        </div>
      ) : // </PDFViewer>
      null}
    </>
  );
}
