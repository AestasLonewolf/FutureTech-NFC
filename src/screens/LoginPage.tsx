import { useState } from "react";
import Button from "../components/Button";

declare global {
  interface Window {
    NDEFReader: NDEFReader;
  }
}

export default function LoginPage({
  onLogin,
}: {
  onLogin: (id: string) => void;
}) {
  const [scanStatus, setScanStatus] = useState<string>("Scan card");

  const scan = async () => {
    console.log("Initializing NFC reader...", window.NDEFReader);

    if ("NDEFReader" in window) {
      try {
        // @ts-ignore
        const ndef = new window.NDEFReader() as NDEFReader;
        setScanStatus("Scanning...");
        await ndef.scan();

        console.log("Scan started successfully.");
        ndef.onreadingerror = () => {
          console.log("Cannot read data from the NFC tag. Try another one?");
        };

        ndef.onreading = ({ serialNumber }) => {
          setScanStatus("Card scanned");
          console.log("NDEF message read.", serialNumber);
          onLogin(serialNumber);
        };
      } catch (error) {
        setScanStatus("Scan failed");
        console.log(`Error! Scan failed to start: ${error}.`);
      }
    } else {
      setScanStatus("Scan unsupported");
      console.log("Web NFC is not supported.");
    }
  };

  return (
    <div className="w-2/3 mx-auto my-10">
      <div className="flex flex-col">
        <label htmlFor="email" className="text-lg font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="border-2 border-secondary rounded-md px-1"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-lg font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border-2 border-secondary rounded-md px-1"
        />
      </div>
      <div className="flex flex-col gap-3 my-5">
        <Button text="Login" onClick={() => {}} />
        <Button text={scanStatus} onClick={() => scan()} />
      </div>
    </div>
  );
}
