import React from "react";
import PropTypes from "prop-types";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ onSort, selectedSort, columns, data }) => {
    return (
        <table className="table table-striped">
            <TableHeader {...{ onSort, selectedSort, columns }}/>
            <TableBody {...{ columns, data }}/>
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array
};

export default Table;
