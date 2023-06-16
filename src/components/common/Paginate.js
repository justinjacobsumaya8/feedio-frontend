import ReactPaginate from 'react-paginate';

export default function Pagination({
    data,
    isLoading,
    handlePageClick
}) {
    return (
        <>
            {data.meta.lastPage >= 1 &&
                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    breakLabel="..."
                    breakClassName="page-item disabled"
                    breakLinkClassName="page-link"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={data.meta.lastPage}
                    renderOnZeroPageCount={null}
                    containerClassName="flex pl-0 list-none justify-end"
                    pageClassName={`page-item ${isLoading && "disabled"}`}
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    forcePage={data.meta.currentPage - 1}
                />
            }
        </>
    );
};