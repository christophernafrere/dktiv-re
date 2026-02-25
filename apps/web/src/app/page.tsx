import OnBoardingPage from "@/components/on-boarding";
import { cookies } from "next/headers";

export default async function Home() {
    const isConnected = (await cookies()).has("access_token");

    return !isConnected ? <OnBoardingPage /> : <></>;
}
