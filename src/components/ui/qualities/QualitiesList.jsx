import React from "react";
import PropTypes from "prop-types";
import Quality from "./Quality";
import { useQialities } from "../../../hooks/useQialities";

const QualitiesList = ({ qualities }) => {
    const { getQuality, isLoading } = useQialities();
    if (!isLoading) {
        return (
            <>
                {qualities.map((qual) => (
                    <Quality key={qual} quality={getQuality(qual)} />
                ))}
            </>
        );
    } else {
    return (
        <>
            Загрузка
        </>
        );
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
