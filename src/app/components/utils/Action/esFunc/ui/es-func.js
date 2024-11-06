export const getPrintPagingByStatus = (
  status = false,
  totalPageSize = 10,
  minSize = 10
) => {
  if (status) {
    return {
      total: totalPageSize,
      pageSizeOptions: [10, 15, 20, 30, 50],
      showSizeChanger: true,
      pageSize: status ? minSize : totalPageSize,
    };
  }
  return status;
};
