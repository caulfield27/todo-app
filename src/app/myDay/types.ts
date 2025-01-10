export interface IResponseType {
  data: IAccordionData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface IAccordionData {
  id: number;
  documentId: string;
  title: string;
  content: IAccordionContent[];
}

export type IAccordionContent = {
  type: "paragraph" | "list" | "text" | "link" | "list-item"
  format?: "unordered" | "ordered";
  text?: string,
  url?: string,
  children: IAccordionContent[];
};
