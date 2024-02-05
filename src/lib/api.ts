import { ProductsSchema, responseSchema } from "./zod";

function generate6DigitNumericUUID() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    // Use crypto API in modern browsers
    const randomBytes = new Uint8Array(3); // 3 bytes to get 6 digits
    crypto.getRandomValues(randomBytes);

    // Convert to decimal format
    const uuid = Array.from(randomBytes)
      .map((byte) => byte.toString(10).padStart(2, "0"))
      .join("");

    return uuid;
  } else {
    // Fallback for environments without crypto API
    console.error("Crypto API not available for UUID generation");
    return null;
  }
}

export const GetFunction = async () => {
  const response = await fetch(`https://dummyjson.com/products`);
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

export const GetProduct = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) {
    console.log(
      "Got a Status Code of " + response.status + " While Fetching the Data "
    );
    throw new Error("There was an Error While Fetching The Data");
  }
  const result = await response.json();

  const parsedResult = ProductsSchema.safeParse(result);

  if (!parsedResult.success) {
    console.log(parsedResult.error);
    throw new Error("There was an Error While Fetching The Data");
  }
  return parsedResult.data;
};

// TODOS
export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  category: string;
};

export type Category = { id: number; name: string };

export const GetTodos = async () => {
  const response = await fetch(`http://localhost:3000/todos?_sort=-completed`);
  if (!response.ok) {
    console.log(
      "Got a Status Code of " + response.status + " While Fetching the Data "
    );
    throw new Error("There was an Error While Fetching The Data");
  }
  const result = await response.json();
  return result as Todo[];
};

export const GetCategories = async () => {
  const response = await fetch(`http://localhost:3000/category`);
  if (!response.ok) {
    console.log(
      "Got a Status Code of " + response.status + " While Fetching the Data "
    );
    throw new Error("There was an Error While Fetching The Data");
  }
  const result = await response.json();
  return result as Category[];
};

export const AddTodo = async ({
  todo,
  category,
}: {
  todo: string;
  category: string;
}) => {
  const id = generate6DigitNumericUUID();
  if (!category) {
    throw new Error("Select An Category");
  }
  if (!todo) {
    throw new Error("Enter A Todo");
  }

  const data = JSON.stringify({ todo, category, id, completed: false });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };

  const response = await fetch(`http://localhost:3000/todos`, requestOptions);

  if (!response.ok) {
    console.log(
      "Got a Status Code of " + response.status + " While Posting the Data "
    );
    throw new Error(`${response.status}-${response.statusText}`);
  }

  const result = await response.json();
  return result;
};

export const updateTodos = async (id: number, setIsCompletedTo: boolean) => {
  const url = `http://localhost:3000/todos/${id}`;

  const data = JSON.stringify({
    completed: setIsCompletedTo,
  });
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  };
  const response = await fetch(url, requestOptions).then((res) => res.json());
  return response;
};

export const DeleteTodo = async (id: number) => {
  const url = `http://localhost:3000/todos/${id}`;

  const response = await fetch(url, { method: "DELETE" }).then((res) =>
    res.json()
  );
  return response;
};
