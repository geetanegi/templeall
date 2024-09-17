import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthed } from '../redux/slice/login/loginSlice';

export const useAuth = (): any => {
    const loginData = useSelector((state: any) => state.login);
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('access_token') || '';
        if (token) {
            dispatch(
                setAuthed({
                    authed: true,
                    token,
                })
            );
        }
    }, []);

    return {
        authed: loginData.authed,
        value: loginData.value,
        login(data: any) {
            return new Promise((res) => {
                dispatch(
                    setAuthed({
                        authed: true,
                        token: data,
                    })
                );
                res(true);
            });
        },
        logout() {
            return new Promise((res) => {
                dispatch(
                    setAuthed({
                        authed: false,
                        token: null,
                    })
                );
                localStorage.removeItem('access_token');
                res(true);
            });
        },
    };
};
