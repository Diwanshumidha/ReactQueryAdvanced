import { useQuery } from "@tanstack/react-query";
import { GetFunction } from "./lib/api";
import { ProductsType } from "./lib/zod";

export default function Products() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: GetFunction,
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {isError ? <div>{error.message}</div> : null}
          {!!isLoading &&
            !isError &&
            [...Array(10)].map((_, index) => (
              <Loader key={`Skeleton${index}`} />
            ))}
          {!isLoading &&
            products?.products?.map((product) => (
              <Card product={product} key={product.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export function Loader() {
  return (
    <a className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <div className="h-[300px] bg-gray-500 w-full object-cover object-center group-hover:opacity-75" />
      </div>
      <div className="mt-4 bg-gray-400 h-3 w-1/2"></div>
      <div className="mt-1 bg-gray-300 h-2 w-2/3"></div>
    </a>
  );
}

export function Card({ product }: { product: ProductsType }) {
  return (
    <a key={product?.id} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={product?.thumbnail}
          alt={product?.thumbnail}
          className="h-[300px] w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product?.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        ${product?.price}
      </p>
    </a>
  );
}
