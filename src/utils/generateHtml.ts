import { IAccordionContent } from "@/app/myDay/types";

export function generateHtml(content: IAccordionContent[]) {
  let html = "";

  for (let i = 0; i < content.length; i++) {
    switch(content[i].type){
        case "paragraph":
            html+=`<p>${generateHtml(content[i].children)}</p>`;
            break;
        case "link":
            html+=`<a href="${content[i].url}">${generateHtml(content[i].children)}</a>`;
            break;
        case "list":
            html+= content[i].format === "ordered" ? 
            `<ol>${generateHtml(content[i].children)}</ol>` :
            `<ul>${generateHtml(content[i].children)}</ul>`
            break;
        case "list-item":
            html+=`<li>${generateHtml(content[i].children)}</li>`;
            break;
        case "text":
            html+=content[i].text;
    }
  }

  return html;
}
