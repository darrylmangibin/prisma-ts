import prisma from "@main/client";
import { Prisma } from "@prisma/client";

async function dataPagination<T = {}, U = any>(
  model: Prisma.ModelName,
  pageNumber: number,
  pageSize: number,
  query?: U
) {
  const skip = (pageNumber - 1) * pageSize;
  const take = pageSize;

  // @ts-ignore
  const data: T[] = await prisma[model.toLowerCase()].findMany({
    skip,
    take,
    ...query,
  });

  // @ts-ignore
  const totalCount = await prisma[model.toLowerCase()].count({
    // @ts-ignore
    where: query?.where,
  });

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasNextPage = pageNumber < totalPages;
  const hasPreviousPage = pageNumber > 1;

  const prevPage = hasPreviousPage
    ? `/data?pageNumber=${pageNumber - 1}&pageSize=${pageSize}`
    : null;
  const nextPage = hasNextPage
    ? `/data?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`
    : null;

  return {
    data,
    totalCount,
    currentPage: pageNumber,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    prevPage,
    nextPage,
  };
}

export default dataPagination;
