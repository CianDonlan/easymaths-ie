import bookPaper2017p1 from "./book2017p1.json";
import bookPaper2017p2 from "./book2017p2.json";
import { realPaper2017p1 } from "./realPaper2017p1";
import { realPaper2017p2 } from "./realPaper2017p2";
import bookPaper2018p1 from "./book2018p1.json";
import bookPaper2018p2 from "./book2018p2.json";
import { realPaper2018p1 } from "./realPaper2018p1";
import { realPaper2018p2 } from "./realPaper2018p2";
import bookPaper2019p1 from "./book2019p1.json";
import bookPaper2019p2 from "./book2019p2.json";
import { realPaper2019p1 } from "./realPaper2019p1";
import { realPaper2019p2 } from "./realPaper2019p2";
import bookPaper2020p2 from "./book2020p2.json";
import { realPaper2020p2 } from "./realPaper2020p2";
import bookPaper2020p1 from "./book2020p1.json";
import { realPaper2020p1 } from "./realPaper2020p1";
import bookPaper2021p2 from "./book2021p2.json";
import { realPaper2021p2 } from "./realPaper2021p2";
import bookPaper2021p1 from "./book2021p1.json";
import { realPaper2021p1 } from "./realPaper2021p1";
import bookPaper2022p2 from "./book2022p2.json";
import { realPaper2022p2 } from "./realPaper2022p2";
import bookPaper2022p1 from "./book2022p1.json";
import { realPaper2022p1 } from "./realPaper2022p1";
import bookPaper1 from "./book2025p1.json";
import bookPaper2 from "./book2025p2.json";
import bookPaper2024p1 from "./book2024p1.json";
import bookPaper2024p2 from "./book2024p2.json";
import bookPaper2023p1 from "./book2023p1.json";
import bookPaper2023p2 from "./book2023p2.json";
import { realPaper } from "./realPaper";
import { realPaper2 } from "./realPaper2";
import { realPaper2024p1 } from "./realPaper2024p1";
import { realPaper2024p2 } from "./realPaper2024p2";
import { realPaper2023p1 } from "./realPaper2023p1";
import { realPaper2023p2 } from "./realPaper2023p2";

export const bookPapers = [bookPaper1, bookPaper2, bookPaper2024p1, bookPaper2024p2, bookPaper2023p1, bookPaper2023p2, bookPaper2022p1, bookPaper2022p2, bookPaper2021p1, bookPaper2021p2, bookPaper2020p1, bookPaper2020p2, bookPaper2019p1, bookPaper2019p2, bookPaper2018p1, bookPaper2018p2, bookPaper2017p1, bookPaper2017p2];
export const realPapers = [realPaper, realPaper2, realPaper2024p1, realPaper2024p2, realPaper2023p1, realPaper2023p2, realPaper2022p1, realPaper2022p2, realPaper2021p1, realPaper2021p2, realPaper2020p1, realPaper2020p2, realPaper2019p1, realPaper2019p2, realPaper2018p1, realPaper2018p2, realPaper2017p1, realPaper2017p2];

export function findBookPaper(paperId: string) {
  return bookPapers.find((paper) => paper.id === paperId);
}

export function findRealPaper(paperId: string) {
  return realPapers.find((paper) => paper.id === paperId);
}
