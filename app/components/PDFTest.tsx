"use client";

import React, { useEffect, useState } from "react";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Svg,
} from "@react-pdf/renderer";

import { createTw } from "react-pdf-tailwind";
import Apple from "../../public/apple.svg";
import Tesla from "../../public/tesla.png";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

type Props = {
  name: string;
  companyName: string;
};
const PDFTest = ({ name, companyName }: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [ownName, setOwnName] = useState(name);
  const [company, setCompanyName] = useState(companyName);
  const [ownLogo, settOwnLogo] = useState("Your Logo Goes Here");
  const [documentTitle, setDocumentTitle] = useState("Document Title");

  const today = new Date();

  console.log({ name, company });
  useEffect(() => {
    setIsClient(true);
  }, [ownName, company]);
  return (
    <>
      {isClient ? (
        <Document>
          <Page size="A4">
            <View style={tw("flex flex-col  text-black min-h-screen bg-white")}>
              <View
                style={tw("flex flex-col mb-12 justify-center items-center")}
              >
                <Text style={tw("text-4xl ")}>{documentTitle}</Text>
                <Text
                  style={tw("italic")}
                >{`${company}'s Calculation Reports for: ${today.toLocaleString(
                  "default",
                  {
                    month: "long",
                    day: "2-digit",
                    year: "2-digit",
                  }
                )}`}</Text>
              </View>
              <View style={tw("flex flex-row justify-between")}>
                <View style={tw("flex flex-col text-base p-2")}>
                  <Text style={tw("text-bold text-red-500")}>
                    Name: {ownName}
                  </Text>
                  <Text>1500 N. Priest Dr. Suite 102 Tempe, AZ 85281</Text>
                  <Text>{`${ownName
                    .toLowerCase()
                    .replace(" ", "")}@gmail.com`}</Text>
                </View>

                <View style={tw("flex flex-col text-base p-2")}>
                  <Text style={tw("text-bold text-red-500")}>
                    Company Name: {company}
                  </Text>
                  <Text>
                    6381 Hollywood Blvd STE 601, Los Angeles, CA, 90059
                  </Text>
                  <Text>{`${company
                    .toLowerCase()
                    .replace(" ", "")}@gmail.com`}</Text>
                </View>
              </View>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>

              <View>
                <Text style={tw("text-base p-4")}>
                  This presentation includes “forward-looking statements” which
                  are statements that are not historical facts, including
                  statements that relate to our future performance, statements
                  relating to the continued impact of the COVID-19 global
                  pandemic, capital deployment including the amount and timing
                  of our dividends, our share repurchase program including the
                  amount of shares to be repurchased and the timing of such
                  repurchases and our capital allocation strategy including
                  acquisitions (if any); our projected free cash flow and usage
                  of such cash; our available liquidity; performance of the
                  markets in which we operate; restructuring activity and cost
                  savings associated with such activity; our projected financial
                  performance and targets including assumptions regarding our
                  effective tax rate.
                </Text>
              </View>

              <View></View>
            </View>
          </Page>
        </Document>
      ) : null}
    </>
  );
};
// ReactPDF.render(<PDFTest />, "example.pdf");
export default PDFTest;
