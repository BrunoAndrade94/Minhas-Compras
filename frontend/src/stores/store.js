import { createStore } from "vuex";

const store = createStore({
	state() {
		return {
			is_menu_visible: false,
		};
	},
	mutations: {
		toggle_menu(state, is_visible) {
			is_visible === undefined
				? (state.is_menu_visible = !state.is_menu_visible)
				: (state.is_menu_visible = is_visible);
		},
	},
});

export default store;
