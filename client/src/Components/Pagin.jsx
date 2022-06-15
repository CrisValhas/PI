import React from "react";

export default function Pagin({
    videogamesPerPage,
    videogames,
    paginado,
    handlePrevNext,
}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(videogames / videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="Filters">
            <div className="stick">
                <button
                    className="pnumber"
                    name="prev"
                    onClick={(e) => handlePrevNext(e)}
                >
                    {"<"}
                </button>
            </div>
            {pageNumbers &&
                pageNumbers.map((number) => {
                    return (
                        <div className="stick" key={number}>
                            <button
                                className="pnumber"
                                onClick={() => paginado(number)}
                                key={number}
                            >
                                {number}
                            </button>
                        </div>
                    );
                })}
            <div className="stick">
                <button
                    className="pnumber"
                    name="next"
                    onClick={(e) => handlePrevNext(e)}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}
