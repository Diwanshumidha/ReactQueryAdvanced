import { useState } from "react";

export function ErrorComponent({
  errorMessageUser,
  isError,
  error,
}: {
  errorMessageUser: string;
  isError: boolean;
  error: Error | null;
}) {
  const [isErrorExpanded, setisErrorExpanded] = useState(false);

  return (
    <>
      {isError ? (
        <div
          className=" bg-red-600 w-full text-white py-2 px-3 cursor-pointer "
          onClick={() => setisErrorExpanded((prev) => !prev)}
        >
          <div className="flex justify-between">
            <p>{errorMessageUser}</p>
            <p>View More Details</p>
          </div>
          {isErrorExpanded && error ? <p>Error:- {error?.message}</p> : null}
        </div>
      ) : null}
    </>
  );
}
