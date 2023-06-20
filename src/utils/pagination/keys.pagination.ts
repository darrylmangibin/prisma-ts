import dataPagination from "./data.pagination";

const keysPagination: (keyof Awaited<ReturnType<typeof dataPagination>>)[] = [
  "currentPage",
  "data",
  "hasNextPage",
  "hasPreviousPage",
  "nextPage",
  "prevPage",
  "totalCount",
  "totalPages",
];

export default keysPagination;
