import HomeCarausel from "components/carausel/carausel.comp";
import Product from "components/workspace/product.comp";
import Head from "next/head";

export default function Explore() {
  return (
    <>
      <Head>
        <title>Explore Workspace</title>
      </Head>
      <HomeCarausel />
      <Product />
    </>
  );
}
