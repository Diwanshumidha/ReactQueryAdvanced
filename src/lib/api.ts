import { responseSchema } from "./zod";

export const GetFunction = async () => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    console.log(
      "Got a Status Code of " + response.status + " While Fetching the Data "
    );
    throw new Error("There was an Error While Fetching The Data");
  }
  const result = await response.json();

  const parsedResult = responseSchema.safeParse(result);

  if (!parsedResult.success) {
    console.log(parsedResult.error);
    throw new Error("There was an Error While Fetching The Data");
  }
  return parsedResult.data;
};
