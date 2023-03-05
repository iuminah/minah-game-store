import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React from "react";

function ChangePasswordPage() {
  return <div>ChangePasswordPage</div>;
}

export default ChangePasswordPage;

export const getStaticProps = async ({locale}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en-US", ["common"], null, [
        "en-US",
        "vi-VN",
      ])),
    },
    revalidate: true,
  };
};
