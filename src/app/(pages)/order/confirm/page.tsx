import { ConfirmOrderClient } from "./ConfirmOrderClient";

type Props = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const token = params?.token || "";

  return <ConfirmOrderClient token={token} />;
}
