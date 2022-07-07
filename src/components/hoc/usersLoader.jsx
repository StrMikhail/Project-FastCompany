import { useEffect }from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { getUsersLoadingStatus, loadUsersList } from "../../store/users";

const UsersLoader = ({ children }) => {
    const dispatch = useDispatch();
    const userDataLoading = useSelector(getUsersLoadingStatus())
    useEffect(() => {
        if (!userDataLoading) dispatch(loadUsersList());
    }, [])
    return children;
};
UsersLoader.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}
export default UsersLoader;