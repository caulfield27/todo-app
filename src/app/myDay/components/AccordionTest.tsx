"use client";
import { useEffect, useState } from "react";
import styles from "./AccordionTest.module.css";
import { IResponseType } from "../types";
import axios from "axios";
import Loader from "@/e_shared/loader/Loader";
import { generateHtml } from "@/utils/generateHtml";

const AccordionTest = () => {
  const [data, setData] = useState<IResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:1337/api/faqs?populate=*&sort[createdAt]=asc")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <Loader size="l" />
  ) : (
    data?.data.map((elem) => {
        const htmlContent = generateHtml(elem.content); 
      return <div key={elem.id} dangerouslySetInnerHTML={{__html: htmlContent}}/>;
    })
  );
};

export default AccordionTest;
