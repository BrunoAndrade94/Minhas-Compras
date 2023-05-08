<template>
	<aside class="menu" v-show="is_menu_visible">
		<h1>MENU</h1>
	</aside>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "Menu",
	computed: mapState(["is_menu_visible"]),
};
</script>

<style>
.menu {
	grid-area: menu;
	background: linear-gradient(to right, #232526, #414345);
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
}
h1 {
	color: #fff;
	text-align: center;
}
</style>
