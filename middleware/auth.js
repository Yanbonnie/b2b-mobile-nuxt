export default function ({ store, redirect, route, app }) {
    // console.log(process.server)

    //ssr
    if (!store.state.userToken) {
        return redirect(`/login?to=${route.fullPath}`);
    }
    // If the user is not authenticated
    // if (!store.state.userToken) {
    //     store.commit('setToken', null);
    //     store.commit('proFile/setUserInfo', null);

    //     if (route.fullPath) {
    //         return redirect(`/entry/login?refer=${route.fullPath}`);
    //     } else {
    //         return redirect(`/entry/login`);
    //     }
    // }
}
