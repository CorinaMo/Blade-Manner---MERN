import { createContext, useContext, useState } from 'react';
import { deleteListItem, getList, putList } from '../api/userlist';

const UserListContext = createContext();

export const UserListProvider = ({ children }) => {
    const tmdbImageUrl = process.env.REACT_APP_TMDB_IMAGE_URL;
    const [userList, setUserList] = useState([]);

    const updateUserList = (list) => {
        const newList = list;
        setUserList(newList);
    };

    const updateGetList = async () => {
        const newList = await getList();
        setUserList(newList);
    };

    const getIsSaved = (id) => {
        const ids = userList?.map(v => { return v?.api_id });
        const isInList = ids?.filter((item) => item?.toString() === id?.toString())?.length > 0 ?? false;
        return isInList;
    };

    const filterItemByType =  (item, type) => {
        let newItem = {};
        if (type === 'movie') {
            newItem = {
                api: 'tmdb',
                api_id: item?.id ?? '',
                extra_info: { data: null },
                image: tmdbImageUrl + item?.poster_path ?? '',
                title: item?.title ?? '',
                type: type ?? '',
                overview: item?.overview?.slice(0, 100),
            }
        }
        if (type === 'tv') {
            newItem = {
                api: 'tmdb',
                api_id: item?.id ?? '',
                extra_info: { data: null },
                image: tmdbImageUrl + item?.poster_path ?? '',
                title: item?.name ?? '',
                type: type ?? '',
                overview: item?.overview?.slice(0, 100),
            }
        }
        return newItem;
    };

    const addToListByType = async (item, type) => {
		const isInList = getIsSaved(item?.id);
		if (isInList) return;
        let newItem = {};
		if (type === 'movie') {
			newItem = filterItemByType(item, 'movie') ?? {};
		} 
		if (type === 'tv')  {
			newItem = filterItemByType(item, 'tv') ?? {};
		}
		// console.log('newItem: ', newItem);
		const ok = await putList(newItem);
		if (ok) await updateGetList();
    };

    const addToListByTypeFiltered = async (newItem) => {
        const ok = await putList(newItem);
		if (ok) await updateGetList();
    };


    const deleteItemUserList = async (id) => {
		const ok = await deleteListItem(id ?? '');
		if (ok) updateGetList();
    };

    const userListContextValue = {
        userList,
        updateUserList,
        updateGetList,
        getIsSaved,
        filterItemByType,
        addToListByType,
        addToListByTypeFiltered,
        deleteItemUserList,
    };

    return (
        <UserListContext.Provider value={userListContextValue}>
            {children}
        </UserListContext.Provider>
    );
};

export const useList = () => {
    const context = useContext(UserListContext);
    if (!context) {
        throw new Error('useList must be used within an AuthProvider');
    }
    return context;
};
